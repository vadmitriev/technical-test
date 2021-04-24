import {makeObservable, observable} from 'mobx'

class ModalStore {
    isLoading = false

    constructor() {
        makeObservable(this, {
            isLoading: observable
        })
    }
}

export default new ModalStore()
