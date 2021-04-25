import {action, computed, makeObservable, observable, runInAction} from 'mobx'
import {promise} from '../util'
import {initialEmployees} from '../components/EmployeeTable/constant/initialData'
import {modalsTitles} from '../components/EmployeeTable/constant/constant'

const listNameInLC = 'store'

class TableStore {
    isLoading = false
    appLoaded = false
    token = null
    visibleModal = false
    visibleAttrModal = false
    visibleCoworkersModal = false
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
            visibleCoworkersModal: observable,
            employeeList: observable,
            employee: observable,
            actionName: observable,
            setAppLoaded: action,
            clearList: action,
            clearCurrent: action,
            deleteEmployee: action,
            setVisible: action,
            setVisibleCoworkers: action,
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
            setCoworkers: action,
            coworkersById: computed
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

    clearCurrent() {
        this.employee = undefined
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

    setVisibleCoworkers(flag) {
        this.visibleCoworkersModal = flag
    }

    setVisibleAttrs(flag) {
        this.visibleAttrModal = flag
    }

    showModal(actionName, emp) {
        this.actionName = actionName
        if (emp) {
            this.employee = emp
        }
        switch (this.actionName) {
            case modalsTitles.attr:
                this.setVisibleAttrs(true)
                break
            case modalsTitles.coworkers:
                this.setVisibleCoworkers(true)
                break
            case modalsTitles.create:
                this.clearCurrent()
                this.setVisible(true)
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
            case modalsTitles.coworkers:
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

    get coworkersById() {
        if (!this.employee || !this.employee.coworkers) {
            return false
        }

        return this.employee.coworkers.map(idx => {
            return this.calcShortName(this.employeeList[idx])
        })
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
            console.log('old attr', this.employee.attributes)

            // this.employee.attributes.push(newAttr)

            this.setVisibleAttrs(false)
            this.saveInLC()
            this.isLoading = false
        }, 700)
    }

    setCoworkers(coworkers) {
        if (!this.employee) {
            return
        }
        this.isLoading = true
        return promise(() => {
            // this.employee.coworkers.push(coworkers)

            this.saveInLC()
            this.setVisibleCoworkers(false)
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