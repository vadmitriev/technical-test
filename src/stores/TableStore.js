import {action, computed, makeObservable, observable, runInAction} from 'mobx'
import {promise} from '../util'
import {initialEmployees} from '../components/EmployeeTable/constant/initialData'
import {defaultEmp, modalsTitles} from '../components/EmployeeTable/constant/constant'

const listNameInLC = 'store'

class TableStore {
    isLoading = false
    appLoaded = false
    token = null
    visibleModal = false
    visibleAttrModal = false
    visibleCollegsModal = false
    employeeList = []
    employee = undefined
    actionName = ''

    constructor() {
        makeObservable(this, {
            isLoading: observable,
            appLoaded: observable,
            token: observable,
            visibleModal: observable,
            visibleAttrModal: observable,
            visibleCollegsModal: observable,
            employeeList: observable,
            employee: observable,
            actionName: observable,
            setAppLoaded: action,
            clearList: action,
            deleteEmployee: action,
            setVisible: action,
            setVisibleCollegs: action,
            setVisibleAttrs: action,
            showModal: action,
            addEmployee: action,
            editEmployee: action,
            setValues: action,
            modalTitle: computed,
            shortName: computed,
            coworkersShortNames: computed,
            hasAccess: action,
            setError: action,
            saveInLC: action,
            wasFired: action,
            setAttrValues: action,
            setCollegs: action
        })

    }

    findIndex(emp) {
        return this.employeeList.findIndex(e => e.id === emp.id)
    }

    setAppLoaded() {
        this.isLoading = true
        this.setVisible(false)
        setTimeout(() => {
            const stateInLC = localStorage.getItem(listNameInLC)
            this.employeeList = JSON.parse(stateInLC) ?? initialEmployees
            this.saveInLC()
            this.isLoading = false
        }, 500)
        this.appLoaded = true
    }

    clearList() {
        this.isLoading = true
        this.employeeList = []
        this.isLoading = false
    }

    addEmployee({data}) {
        this.isLoading = true
        return promise(() => {
            data.id = this.employeeList.length

            this.employee = data
            this.employeeList.push(data)
            this.saveInLC()
            this.isLoading = false
        }, 500)
    }

    editEmployee(emp) {
        runInAction(() => {
            this.employeeList[emp.id] = emp.data
        })
        this.saveInLC()
    }

    setValues(emp) {
        console.log('setValues:', {emp})
        this.setVisible(false)

        return promise(() => ({data: {...emp}}), 500)
            .then(action(data => {
                console.log('emp aaa:', emp)
                console.log('data:', data)
                if (this.actionName === 'create') {
                    data.id = this.employeeList.length
                    this.addEmployee(data)
                } else {
                    data.id = this.employee.id
                    this.editEmployee(data)
                }
            }))
            .catch(action(err => this.setError(err)))
            .finally(action(() => {
                this.saveInLC()
                this.isLoading = false
            }))
    }

    deleteEmployee(id) {
        this.isLoading = true
        return promise(() => {
            this.employeeList = this.employeeList.filter(emp => emp.id !== id)
            this.saveInLC()
            this.isLoading = false
        }, 700)
    }

    setVisible(flag) {
        this.visibleModal = flag
    }

    setVisibleCollegs(flag) {
        this.visibleCollegsModal = flag
    }

    setVisibleAttrs(flag) {
        this.visibleAttrModal = flag
    }

    showModal(actionName, emp) {
        this.actionName = actionName
        if (emp) {
            this.employee = emp
            console.log('emp id:', emp.id)
        }
        switch (this.actionName) {
            case modalsTitles.attr:
                this.setVisibleAttrs(true)
                break
            case modalsTitles.collegs:
                this.setVisibleCollegs(true)
                break
            default:
                this.setVisible(true)
        }
    }

    get modalTitle() {
        if (!this.actionName) {
            return 'Редактировать данные'
        }
        switch (this.actionName) {
            case modalsTitles.create:
                return 'Добавить работника'
            case modalsTitles.edit:
                return 'Изменить данные работника'
            case modalsTitles.attr:
                return 'Добавить атрибут'
            case modalsTitles.collegs:
                return 'Коллеги работника'
            default:
                return 'Изменить данные'
        }
    }

    calcShortName(emp) {
        if (!emp) {
            return false
        }
        return `${emp.surname} ${emp.name[0]}.${emp.fatherName[0]}`
    }

    get shortName() {
        return this.calcShortName(this.employee)
    }

    get coworkersShortNames() {
        if (this.employee) {
            return this.employeeList
                .filter(emp => emp.id !== this.employee.id)
                .map(emp => this.calcShortName(emp))
        }
        return this.employeeList
            .map(emp => this.calcShortName(emp))
    }

    wasFired(emp) {
        const index = this.findIndex(emp)
        return this.employeeList[index].outDate
    }

    hasAccess(emp) {
        const index = this.findIndex(emp)
        return this.employeeList[index].hasAccess
    }

    setAttrValues(newAttr) {
        if (!this.employee) {
            return
        }
        this.isLoading = true
        return promise(() => {
            console.log('new attrs:', newAttr)
            console.log('old attr',this.employee.attributes)

            // this.employee.attributes.push(newAttr)

            this.setVisibleAttrs(false)
            this.saveInLC()
            this.isLoading = false
        }, 700)
    }

    setCollegs(collegs) {
        if (!this.employee) {
            return
        }
        this.isLoading = true
        return promise(() => {
            console.log('new collegs:', collegs)
            console.log('collegs ids:',this.employee.collegsIds)

            // this.employee.collegs.push(collegs)

            this.saveInLC()
            this.setVisibleCollegs(false)
            this.isLoading = false
        }, 700)
    }

    setError({message}) {
        this.error = message
        alert(message)
    }

    saveInLC() {
        localStorage.setItem(listNameInLC, JSON.stringify(this.employeeList))
    }
}

export default new TableStore()