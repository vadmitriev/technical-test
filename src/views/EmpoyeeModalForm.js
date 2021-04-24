import React from "react"
import {
    Modal,
    Form,
    Input,
    Radio,
    Checkbox,
    DatePicker,
    Select,
} from 'antd'
import {observer} from 'mobx-react'
import {genders, positionTypes} from '../components/EmployeeTable/constant/types'
import moment from 'moment'

const EmployeeModalForm = observer(({store}) => {
    // const [form] = Form.useForm()

    const dateFormat = 'DD.MM.YYYY';

    const positions = Object.values(positionTypes).map(pos => {
        return <Select.Option value={pos} key={pos}>{pos}</Select.Option>
    })

    const grs = Object.values(genders).map(g => {
        return <Radio value={g} key={g}>{g}</Radio>
        // return <Select.Option value={g}>{g}</Select.Option>
    })

    const coworkers = store.coworkersShortNames.map(name => {
        return <Select.Option value={name}>{name}</Select.Option>
    })

    function updateProperty(key, value) {
        console.log('key:', key, 'value:', value)
    }

    function changeHandler(event) {
        console.log('event:', event, 'type:', typeof event)

        updateProperty(event.target.name, event.target.value)
    }

    function onChangeDate(date, dateString, id) {
        console.log('date:', date, 'dateString:', dateString, 'id:', id)
        // console.log('changeData key:', key)
        // console.log('changeDate value:', moment(value).toDate())

    }

    console.log('store:', store)

    return (
        <Modal
            // form={form}
            visible={store.visibleModal}
            title={store.modalTitle}
            okText="Сохранить"
            cancelText="Отмена"
            onCancel={() => store.setVisible(false)}
            onOk={() => {
                console.log('ok pressed')
                // form
                //     .validateFields()
                //     .then(async (values) => {
                //         // form.resetFields()
                //         console.log('onCreate values:', values)
                //         await onCreate(values)
                //     })
                //     .catch((info) => {
                //         console.log('Validate Failed:', info)
                //     });
            }}
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
                        defaultValue={store.employee ? store.employee.surname : "Фамилия"}
                        style={{width: 200}}
                        onChange={changeHandler}
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
                        defaultValue={store.employee ? store.employee.name : "Имя"}
                        onChange={changeHandler}
                        style={{width: 200}}
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
                        defaultValue={store.employee ? store.employee.fatherName : "Отчество"}
                        style={{width: 200}}
                        onChange={changeHandler}
                    />
                </Form.Item>
                <Form.Item
                    name="position"
                    label="Должность"
                    rules={[{required: true, message: 'Необходимо указать должность'}]}
                    style={{width: 1100}}
                    onChange={changeHandler}
                >
                    <Select
                        name="position"
                        placeholder="Выберите должность"
                        defaultValue={store.employee ? store.employee.position : positionTypes.developer}
                        style={{width: 200}}
                        onChange={changeHandler}
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
                        defaultValue={store.employee ? store.employee.birthday : moment('01.01.1990', dateFormat)}
                        style={{width: 200}}
                        onChange={(date, dateString) => onChangeDate(date, dateString, "birthday")}
                    />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Пол"
                    rules={[{required: true, message: 'Необходимо выбрать пол'}]}
                    style={{width: 1100}}
                    onChange={changeHandler}
                >
                    {/*<Select*/}
                    {/*    placeholder="Выберите пол"*/}
                    {/*    allowClear*/}
                    {/*>*/}
                    {/*    {grs}*/}
                    {/*</Select>*/}
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
                        defaultValue={store.employee ? store.employee.inDate : moment('01.01.2021', dateFormat)}
                        style={{width: 200}}
                        onChange={(date, dateString) => onChangeDate(date, dateString, "inDate")}
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
                        defaultValue={store.employee ? store.employee.outDate : moment()}
                        style={{width: 200}}
                        onChange={(date, dateString) => onChangeDate(date, dateString, "outDate")}
                    />
                </Form.Item>
                <Form.Item
                    name="hasAccess"
                    label="Наличие прав"
                    style={{width: 1100}}
                    onChange={changeHandler}
                >
                    <Checkbox
                        checked={store.employee && store.employee.hasAccess}
                    />
                </Form.Item>
                <Form.Item
                    name="collegsIds"
                    label="Коллеги"
                    style={{width: 1100}}
                    onChange={changeHandler}
                >
                    <Select
                        mode="multiple"
                        style={{width: 200}}
                        placeholder="Выберите коллег"
                        // onChange={handleChange}
                        optionLabelProp="label"
                        allowClear="true"
                        onChange={changeHandler}
                    >
                        {coworkers}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})


export default EmployeeModalForm
