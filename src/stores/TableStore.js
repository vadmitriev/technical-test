import {action, computed, makeObservable, observable, runInAction} from 'mobx'
import {promise} from '../utils/util'
import {initialEmployees} from '../components/EmployeeTable/constant/initialData'
import {ATTR_FIELDS, DEFAULT_EMP, MODALS_TITLES, REQUIRED_FIELDS} from '../components/EmployeeTable/constant/constant'

const listNameInLS = 'store'

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
            employeeList: observable,
            employee: observable,
            actionName: observable,
            setAppLoaded: action,
            clearList: action,
            clearCurrent: action,
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
            saveInLS: action,
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
            const stateInLS = localStorage.getItem(listNameInLS)
            this.employeeList = JSON.parse(stateInLS) ?? initialEmployees
            this.saveInLS()
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
            this.saveInLS()
            this.isLoading = false
        }, 500)
    }

    editEmployee(emp) {
        runInAction(() => {
            this.employeeList[emp.id] = emp.data
        })
        this.saveInLS()
    }

    setValues(emp) {
        console.log('setValues:', {emp})
        const data = {...emp}
        const errors = Object.keys(emp).filter(key => {
            console.log('key:', key)
            console.log('data value:', data[key])
            console.log('default value:', DEFAULT_EMP[key])

            const dataKey = data[key]
            const defKey = DEFAULT_EMP[key]
            const compare = dataKey === defKey

            debugger
            return data[key] === DEFAULT_EMP[key] && REQUIRED_FIELDS.includes(key);

            // console.log('key:', key, 'includes?', REQUIRED_FIELDS.includes(key))
            // if ({...emp}[key] === DEFAULT_EMP[key] && REQUIRED_FIELDS.includes(key)) {
            //     return key
            // } else {
            //     console.log('emp key:', emp[key], 'default key:', DEFAULT_EMP[key])
            // }
        })
        console.log('errors:', errors)

        if (errors.length) {
            return Promise.reject(DEFAULT_EMP[errors[0]])
        }

        this.setVisible(false)

        return promise(() => ({data: {...emp}}), 500)
            .then(action(data => {
                console.log('data here:', data)
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
                this.saveInLS()
                this.isLoading = false
            }))
    }

    deleteEmployee(id) {
        this.isLoading = true
        return promise(() => {
            this.employeeList = this.employeeList.filter(emp => emp.id !== id)
            this.saveInLS()
            this.isLoading = false
        }, 700)
    }

    setVisible(flag) {
        this.visibleModal = flag
    }

    showModal({actionName}, emp) {
        this.actionName = actionName
        if (emp) {
            this.employee = emp
        }
        switch (this.actionName) {
            case MODALS_TITLES.create.actionName:
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
        return MODALS_TITLES[this.actionName].title
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
        if (!this.employee.coworkers.length) {
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
            const attrs = ATTR_FIELDS
            attrs.id = this.employee.attributes.length
            attrs.name= {...newAttr}[ATTR_FIELDS.name]
            attrs.type= {...newAttr}[ATTR_FIELDS.type]
            attrs.value= {...newAttr}[ATTR_FIELDS.value]

            this.employee.attributes.push(attrs)

            this.setVisible(false)
            this.saveInLS()
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

            this.saveInLS()
            this.setVisible(false)
            this.isLoading = false
        }, 700)
    }

    setError({message}) {
        this.error = message
        alert(message)
    }

    saveInLS() {
        localStorage.setItem(listNameInLS, JSON.stringify(this.employeeList))
    }
}

export default new TableStore()