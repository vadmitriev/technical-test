import {ModalStore} from '../../stores/ModalStore'
import {observer} from 'mobx-react'
import {Button, Form, message, Modal, Select} from 'antd'
import {action} from 'mobx'


const CoworkersModalForm = observer(({store}) => {
    const modalStore = new ModalStore(store.employee)

    const coworkers = store.coworkersShortNames.map(name => {
        return <Select.Option value={name}>{name}</Select.Option>
    })

    return (
        <Modal
            destroyOnClose={true}
            visible={store.visibleCoworkersModal}
            title={store.modalTitle}
            okText="Сохранить"
            cancelText="Отмена"
            onCancel={() => store.setVisibleCoworkers(false)}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => store.setVisibleCoworkers(false)}
                >
                    Отмена
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={action(
                        async () => {
                            store.setCoworkers(modalStore)
                                .then(message.info(`Коллеги были изменены`))
                        }
                    )}
                >
                    Сохранить
                </Button>
            ]}
        >
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
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
                        defaultValue={modalStore.employee
                            ? action(() => modalStore.employee.coworkersById)
                            : ''
                        }
                        onChange={(value) => modalStore.selectChangeHandler(value, "coworkers")}
                    >
                        {coworkers}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})


export default CoworkersModalForm