import {action, computed, makeObservable, observable} from 'mobx'
import {DEFAULT_EMP} from '../components/EmployeeTable/constant/constant'

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

        this.currentEmp = emp ? emp : DEFAULT_EMP
        // this.currentEmp = emp ?? emp
    }

    changeHandler(event) {
        if (!event) {
            return
        }

        const key = event.target.name
        this.currentEmp[key] = event.target.value
    }

    selectChangeHandler(value, event, key) {
        this.currentEmp[key] = value
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

    clear() {
        this.currentEmp = DEFAULT_EMP
    }

    get employee() {
        return this.currentEmp
    }

    confirmForm() {
        console.log('confirmForm')
    }
}

export default new ModalStore()
