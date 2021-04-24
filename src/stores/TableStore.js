import {action, computed, makeObservable, observable, runInAction} from 'mobx'
import {promise} from '../util'
import {initialEmployees} from '../components/EmployeeTable/constant/initialData'

const listNameInLC = 'store'

class TableStore {
    isLoading = false
    appLoaded = false
    token = null
    visibleModal = false
    employeeList = []
    employee = undefined
    actionName = ''

    constructor() {
        makeObservable(this, {
            isLoading: observable,
            appLoaded: observable,
            token: observable,
            visibleModal: observable,
            employeeList: observable,
            employee: observable,
            actionName: observable,
            setAppLoaded: action,
            clearList: action,
            deleteEmployee: action,
            setVisible: action,
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
        })

    }

    findIndex(emp) {
        return this.employeeList.findIndex(e => e.id === emp.id)
    }

    setAppLoaded() {
        const stateInLC = localStorage.getItem(listNameInLC)
        this.employeeList = JSON.parse(stateInLC) ?? initialEmployees
        this.saveInLC()
        this.appLoaded = true
    }

    clearList() {
        this.isLoading = true
        this.employeeList = []
        this.isLoading = false
    }

    addEmployee(newEmp) {
        this.isLoading = true
        return promise(() => ({data: newEmp}), 1500)
            .then(action(data => {
                this.employee = data
                this.employeeList.push(data)
            }))
            .catch(action(err => this.setError(err)))
            .finally(action(() => {
                this.saveInLC()
                this.isLoading = false
            }))
        // this.employee = newEmp
        // this.employeeList.push(newEmp)
        // this.isLoading = false
    }

    editEmployee(emp) {
        const index = this.findIndex(emp)
        runInAction(() => {
            this.employeeList[index] = emp
        })
        this.saveInLC()
    }

    setValues(values) {
        console.log('setValues:', values)
        // this.setVisible(false)
        const emp = {...values, id: this.employee.id}
        if (this.actionName === 'create') {
            this.addEmployee(emp)
        } else {
            this.editEmployee(emp)
        }
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

    showModal(action, emp) {
        console.log('showModal:', action, emp)
        console.log('emp id:', emp)
        this.actionName = action
        this.employee = emp
        this.setVisible(true)
    }

    get modalTitle() {
        return this.actionName && this.actionName === "create"
            ? "Добавить работника"
            : "Изменить данные работника"
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

    setError({message}) {
        this.error = message
        alert(message)
    }

    saveInLC() {
        localStorage.setItem(listNameInLC, JSON.stringify(this.employeeList))
    }
}

export default new TableStore()