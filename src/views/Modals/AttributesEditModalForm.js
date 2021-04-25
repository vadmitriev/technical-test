import {ModalStore} from '../../stores/ModalStore'
import {observer} from 'mobx-react'
import {empAttrTypes, genders, positionTypes} from '../../components/EmployeeTable/constant/constant'
import {Button, Form, Input, message, Modal, Radio, Select} from 'antd'
import {action} from 'mobx'
import React from 'react'

const modalStore = new ModalStore()

const AttributesEditModalForm = observer(({store}) => {
    console.log('attr store:', store)

    const attrTypes = Object.values(empAttrTypes).map(pos => {
        return <Select.Option value={pos} key={pos}>{pos}</Select.Option>
    })

    return (
        <Modal
            // form={form}
            visible={store.visibleAttrModal}
            title={store.modalTitle}
            okText="Сохранить"
            cancelText="Отмена"
            onCancel={() => {
                store.setVisibleAttrs(false)
            }}
            onOk={() => {
                // modalStore.clear()
                console.log('ok pressed')
            }}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => store.setVisibleAttrs(false)}
                >
                    Отмена
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    disabled={modalStore.isFormValid}
                    onClick={action(
                        async () => {
                            store.setAttrValues(modalStore.employee)
                                .then(message.info(`Атрибут был добавлен`))
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
                    name="attrName"
                    label="Название атрибута"
                    style={{width: 1100}}
                    rules={[{required: true, message: 'Необходимо указать название атрибута'}]}
                    onChange={(value) => modalStore.selectChangeHandler(value, "attributes:attrName")}
                >
                    <Input
                        name="attrName"
                        placeholder="Название атрибута"
                        style={{width: 200}}
                        onChange={(e) => modalStore.changeHandler(e)}
                    />
                </Form.Item>
                <Form.Item
                        name="empAttrTypes"
                        label="Тип атрибута"
                        style={{width: 1100}}
                        rules={[{required: true, message: 'Необходимо указать тип атрибута'}]}
                        onChange={(value) => modalStore.selectChangeHandler(value, "attributes:")}
                    >
                    <Select
                        style={{width: 200}}
                        placeholder="Выберите тип атрибута"
                        // onChange={handleChange}
                        optionLabelProp="label"
                        allowClear="true"
                        onChange={(value) => modalStore.selectChangeHandler(value, "collegsIds")}
                    >
                        {attrTypes}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="attrValue"
                    label="Значение атрибута"
                    style={{width: 1100}}
                    rules={[{required: true, message: 'Необходимо указать значение атрибута'}]}
                    onChange={(value) => modalStore.changeHandler(value, "attributes:attrName")}
                >
                    <Input
                        name="attrValue"
                        placeholder="Значение атрибута"
                        style={{width: 200}}
                        onChange={(e) => modalStore.changeHandler(e)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
})


export default AttributesEditModalForm