import {ModalStore} from '../../../stores/ModalStore'
import {observer} from 'mobx-react'
import {ATTR_FIELDS, EMP_ATTR_TYPES} from '../constant/constant'
import {Button, Form, Input, message, Modal, Select} from 'antd'
import React from 'react'

const AttributesModal = observer(({store}) => {
    const modalStore = new ModalStore(store.employee)

    const attrTypes = Object.values(EMP_ATTR_TYPES).map(pos => {
        return <Select.Option value={pos} key={pos}>{pos}</Select.Option>
    })

    return (
        <Modal
            destroyOnClose={true}
            visible={store.visibleModal}
            title={store.modalTitle}
            okText="Сохранить"
            cancelText="Отмена"
            onCancel={() => {
                store.setVisible(false)
            }}
            onOk={() => {
                // modalStore.clear()
                console.log('ok pressed')
            }}
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
                    disabled={modalStore.isFormValid}
                    onClick={
                        async () => {
                            store.setAttrValues(modalStore.employee)
                                .then(message.info(`Атрибут был добавлен`))
                        }
                    }
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
                    label="Название атрибута"
                    style={{width: 1100}}
                    rules={[{required: true, message: 'Необходимо указать название атрибута'}]}
                >
                    <Input
                        name={ATTR_FIELDS.name}
                        placeholder="Название атрибута"
                        style={{width: 200}}
                        onChange={(e) => modalStore.changeHandler(e)}
                    />
                </Form.Item>
                <Form.Item
                    name={ATTR_FIELDS.type}
                    label="Тип атрибута"
                    style={{width: 1100}}
                    onChange={(value) => modalStore.selectChangeHandler(value, ATTR_FIELDS.type)}
                >
                    <Select
                        name={ATTR_FIELDS.type}
                        style={{width: 200}}
                        placeholder="Выберите тип атрибута"
                        optionLabelProp="label"
                        allowClear="true"
                        onChange={(value, event) => modalStore.selectChangeHandler(value, event, ATTR_FIELDS.type)}
                    >
                        {attrTypes}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Значение атрибута"
                    style={{width: 1100}}
                    rules={[{required: true, message: 'Необходимо указать значение атрибута'}]}
                >
                    <Input
                        name={ATTR_FIELDS.value}
                        placeholder="Значение атрибута"
                        style={{width: 200}}
                        onChange={(e) => modalStore.changeHandler(e)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default AttributesModal
