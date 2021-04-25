import React from "react"
import {
    Modal,
    Form,
    Input,
    Radio,
    Checkbox,
    DatePicker,
    Select, Button, message,
} from 'antd'
import {observer} from 'mobx-react'
import {dateFormat, genders, positionTypes} from '../../components/EmployeeTable/constant/constant'
import moment from 'moment'
import {ModalStore} from '../../stores/ModalStore'
import {action} from 'mobx'


const EmployeeModalForm = observer(({store}) => {
    let modalStore = new ModalStore(store.employee)

    const positions = Object.values(positionTypes).map(pos => {
        return <Select.Option value={pos} key={pos}>{pos}</Select.Option>
    })

    const grs = Object.values(genders).map(g => {
        return <Radio value={g} key={g}>{g}</Radio>
    })

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
            onClose={() => {
                store.setVisible(false)
                modalStore.clear()
            }}
            onCancel={() => {
                store.setVisible(false)
                modalStore.clear()
            }}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => {
                        store.setVisible(false)
                        modalStore.clear()
                    }}
                >
                    Отмена
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    disabled={modalStore.isFormValid}
                    onClick={action(
                        async () => {
                            store.setValues(modalStore.employee)
                                .then(() => {
                                    modalStore.clear()
                                })
                                .then(message.info(`Работник был добавлен`))
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
                    name="surname"
                    label="Фамилия"
                    rules={[{required: true, message: 'Необходимо ввести фамилию'}]}
                    style={{width: 1100}}
                >
                    <Input
                        name="surname"
                        placeholder="Фамилия"
                        defaultValue={store.employee ? store.employee.surname : ""}
                        style={{width: 200}}
                        onChange={(e) => modalStore.changeHandler(e)}
                    />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[{required: true, message: 'Необходимо ввести имя'}]}
                    style={{width: 1100}}
                >
                    <Input
                        name="name"
                        placeholder="Имя"
                        defaultValue={store.employee ? store.employee.name : ""}
                        style={{width: 200}}
                        onChange={(e) => modalStore.changeHandler(e)}
                    />
                </Form.Item>
                <Form.Item
                    name="fatherName"
                    label="Отчество"
                    style={{width: 1100}}
                >
                    <Input
                        name="fatherName"
                        placeholder="Отчество"
                        defaultValue={store.employee ? store.employee.fatherName : ""}
                        style={{width: 200}}
                        onChange={(e) => modalStore.changeHandler(e)}
                    />
                </Form.Item>
                <Form.Item
                    name="position"
                    label="Должность"
                    rules={[{required: true, message: 'Необходимо указать должность'}]}
                    style={{width: 1100}}
                    onChange={(value) => modalStore.selectChangeHandler(value, "position")}
                >
                    <Select
                        name="position"
                        placeholder="Выберите должность"
                        defaultValue={store.employee ? store.employee.position : positionTypes.developer}
                        style={{width: 200}}
                        onChange={(value, event) => modalStore.selectChangeHandler(value, event, "position")}
                    >
                        {positions}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="birthday"
                    label="Дата рождения"
                    rules={[{required: true, message: 'Необходимо указать дату'}]}
                    style={{width: 1100}}
                >
                    <DatePicker
                        name="birthday"
                        format={dateFormat}
                        placeholder="Выберите дату"
                        defaultValue={modalStore.employee
                            ? moment(modalStore.employee.birthday, dateFormat)
                            : moment('01.01.1990', dateFormat)}
                        style={{width: 200}}
                        onChange={(date, dateString) => modalStore.dateChangeHandler(date, dateString, "birthday")}
                    />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Пол"
                    rules={[{required: true, message: 'Необходимо выбрать пол'}]}
                    defaultValue={store.employee ? store.employee.gender : genders[0]}
                    style={{width: 1100}}
                    onChange={(value) => modalStore.selectChangeHandler(value, "gender")}>
                    <Radio.Group>
                        {grs}
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="inDate"
                    label="Дата приема на работу"
                    rules={[{required: true, message: 'Необходимо указать дату'}]}
                    style={{width: 1100}}
                >
                    <DatePicker
                        format={dateFormat}
                        placeholder="Выберите дату"
                        defaultValue={modalStore.employee
                            ? moment(modalStore.employee.inDate, dateFormat)
                            : moment('01.01.2021', dateFormat)
                        }
                        style={{width: 200}}
                        onChange={(date, dateString) => modalStore.dateChangeHandler(date, dateString, "inDate")}
                    />
                </Form.Item>
                <Form.Item
                    name="outDate"
                    label="Дата увольнения"
                    style={{width: 1100}}
                >
                    <DatePicker
                        format={dateFormat}
                        placeholder="Выберите дату"
                        defaultValue={modalStore.employee
                            ? moment(modalStore.employee.outDate, dateFormat)
                            : moment('')
                        }
                        style={{width: 200}}
                        onChange={(date, dateString) => modalStore.dateChangeHandler(date, dateString, "outDate")}
                    />
                </Form.Item>
                <Form.Item
                    name="hasAccess"
                    label="Наличие прав"
                    style={{width: 1100}}
                >
                    <Checkbox
                        checked={modalStore.employee ? modalStore.employee.hasAccess: false}
                        onChange={(value) => modalStore.checkBoxChangeHandler(value, "hasAccess")}
                    />
                </Form.Item>
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
                        defaultValue={store.employee
                            ? store.coworkersById
                            : []}
                        onChange={(value) => modalStore.selectChangeHandler(value, "coworkers")}
                    >
                        {coworkers}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default EmployeeModalForm
