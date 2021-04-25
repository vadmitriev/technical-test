import {ModalStore} from '../../stores/ModalStore'
import {observer} from 'mobx-react'
import {dateFormat, genders, positionTypes} from '../../components/EmployeeTable/constant/constant'
import {Button, Checkbox, DatePicker, Form, Input, message, Modal, Radio, Select} from 'antd'
import {action} from 'mobx'

const modalStore = new ModalStore()

const CollegasModalForm = observer(({store}) => {
    const coworkers = store.coworkersShortNames.map(name => {
        return <Select.Option value={name}>{name}</Select.Option>
    })
    console.log('collegas store:', store)
    return (
        <Modal
            // form={form}
            visible={store.visibleCollegsModal}
            title={store.modalTitle}
            okText="Сохранить"
            cancelText="Отмена"
            footer={[
                <Button
                    key="cancel"
                    onClick={() => store.setVisibleCollegs(false)}
                >
                    Отмена
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={action(
                        async () => {
                            store.setCollegs(modalStore)
                                .then(message.info(`Коллеги были изменены`))
                        }
                    )}
                >
                    Сохранить
                </Button>
            ]}
        >
            <Form
                // form={form}
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
                    name="collegsIds"
                    label="Коллеги"
                    style={{width: 1100}}
                    onChange={(value) => modalStore.selectChangeHandler(value, "collegsIds")}
                >
                    <Select
                        mode="multiple"
                        style={{width: 200}}
                        placeholder="Выберите коллег"
                        // onChange={handleChange}
                        optionLabelProp="label"
                        allowClear="true"
                        onChange={(value) => modalStore.selectChangeHandler(value, "collegsIds")}
                    >
                        {coworkers}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})


export default CollegasModalForm