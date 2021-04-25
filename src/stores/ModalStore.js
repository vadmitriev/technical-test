import {action, computed, makeObservable, observable} from 'mobx'
import {defaultEmp} from '../components/EmployeeTable/constant/constant'

export class ModalStore {
    isLoading = false
    currentEmp = undefined
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

        const key = event.target.name
        this.currentEmp[key] = event.target.value

    }

    dateChangeHandler(date, dateString, key) {
        this.currentEmp[key] = dateString
    }

    isChecked(key) {
        return this.currentEmp[key]
    }

    checkBoxChangeHandler(value, key) {
        this.currentEmp[key] = value.target.checked
    }

    selectChangeHandler(value, event, key) {
        this.currentEmp[key] = value
    }

    clear() {
        this.currentEmp = defaultEmp
    }

    get employee() {
        return this.currentEmp
    }

    confirmForm() {
        console.log('confirmForm')
    }
}

export default new ModalStore()
