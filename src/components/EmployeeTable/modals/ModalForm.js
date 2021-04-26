import React from "react"
import {observer} from 'mobx-react'
import EmployeeModal from './EmployeeModal'
import {MODALS_TITLES} from '../constant/constant'
import AttrModal from './AttrModal'
import CoworkersModal from './CoworkersModal'

const ModalForm = observer(({store}) => {
    switch (store.modalTitle) {
        case MODALS_TITLES.create.title:
            return <EmployeeModal store={store}/>
        case MODALS_TITLES.edit.title:
            return <EmployeeModal store={store}/>
        case MODALS_TITLES.attr.title:
            return <AttrModal store={store}/>
        case MODALS_TITLES.coworkers.title:
            return <CoworkersModal store={store}/>
        default:
            return <div/>
    }
})

export default ModalForm
