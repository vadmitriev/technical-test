import {action, computed, makeObservable, observable} from 'mobx'
import {defaultEmp} from '../components/EmployeeTable/constant/constant'

export class ModalStore {
    isLoading = false
    currentEmp = defaultEmp
    isFormValid = false

    constructor(emp) {
        makeObservable(this, {
            currentEmp: observable,
            changeHandler: action,
            dateChangeHandler: action,
            selectChangeHandler: action,
            checkBoxChangeHandler: action,
            clear: action,
            employee: computed,
            isChecked: action,
            isFormValid: observable,
            confirmForm: action
        })

        console.log('emp:', emp)
        this.currentEmp = emp ? emp : defaultEmp
    }

    changeHandler(event) {
        if (!event) {
            return
        }
        console.log('event:', event)
        const key = event.target.name
        const value = event.target.value
        console.log('this.currentEmp', {...this.currentEmp})
        this.currentEmp[key] = value

    }

    dateChangeHandler(date, dateString, key) {
        console.log('dateChangeHandler', date, dateString, key)
        this.currentEmp[key] = dateString
        console.log('this.currentEmp', {...this.currentEmp})
    }

    isChecked(key) {
        console.log('isChecked:', key, this.currentEmp[key])
        return this.currentEmp[key]
    }

    checkBoxChangeHandler(value, key) {
        console.log('checkBoxChangeHandler', value.target.checked, key)
        this.currentEmp[key] = value.target.checked
        console.log('this.currentEmp', {...this.currentEmp})
    }

    selectChangeHandler(value, event, key) {
        console.log('selectChangeHandler', value, event, key)
        this.currentEmp[key] = value
        console.log('this.currentEmp', {...this.currentEmp})
    }

    clear() {
        this.currentEmp = defaultEmp
    }

    get employee() {
        console.log('currentEmp:', {...this.currentEmp})
        return this.currentEmp
    }

    confirmForm() {
        console.log('confirmForm')
    }
}

export default new ModalStore()
