import {observer} from 'mobx-react'
import {ModalStore} from '../../../stores/ModalStore'
import {Button, Form, message, Modal, Select} from 'antd'
import {action} from 'mobx'
import React from 'react'

export const CoworkersModal = observer(({store}) => {
    const modalStore = new ModalStore(store.employee)

    const coworkers = store.coworkersShortNames.map(name => {
        return <Select.Option value={name}>{name}</Select.Option>
    })

    return (
        <Modal
            destroyOnClose={true}
            visible={store.visibleModal}
            title={store.modalTitle}
            okText="Сохранить"
            cancelText="Отмена"
            onCancel={() => store.setVisible(false)}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => store.setVisible(false)}
                >
                    Отмена
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={action(
                        async () => {
                            store.setCoworkers(modalStore.employee.coworkers)
                                .then(message.info(`Коллеги были изменены`))
                        }
                    )}
                >
                    Сохранить
                </Button>
            ]}
        >
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                size="small"
            >
                <Form.Item
                    name="coworkers"
                    label="Коллеги"
                    style={{width: 1100}}
                    onChange={(value) => modalStore.selectChangeHandler(value, "coworkers")}
                >
                    <Select
                        mode="multiple"
                        style={{width: 200}}
                        placeholder="Выберите коллег"
                        optionLabelProp="label"
                        allowClear="true"
                        defaultValue={store.employee && store.employee.coworkers
                            ? store.coworkersById
                            : undefined}
                        onChange={(value, event) => {
                            modalStore.selectChangeHandler(value, event, "coworkers")
                        }}
                    >
                        {coworkers}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default CoworkersModal