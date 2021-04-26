import React from 'react'
import {
    Checkbox,
    DatePicker,
    Form,
    Input,
    Modal,
    Radio,
    Select,
    message,
    Button
} from 'antd'
import {DATE_FORMAT, DEFAULT_EMP, GENDERS, POSITION_TYPES} from '../constant/constant'
import moment from 'moment'
import {observer} from 'mobx-react'
import {ModalStore} from '../../../stores/ModalStore'

export const EmployeeModal = observer(({store}) => {
    const modalStore = new ModalStore(store.employee)


    const positions = Object.values(POSITION_TYPES).map(pos => {
        return <Select.Option value={pos} key={pos}>{pos}</Select.Option>
    })

    const grs = Object.values(GENDERS).map(g => {
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
                    disabled={modalStore.confirmForm}
                    onClick={
                        async () => {
                            store.setValues(modalStore.employee)
                                .catch((errMsg) => {
                                    if (errMsg) {
                                        message.warn(`${errMsg}`)
                                    } else {
                                        modalStore.clear()
                                        message.info(`Работник был добавлен`)
                                    }
                                })
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
                    name={DEFAULT_EMP.surname}
                    label="Фамилия"
                    rules={[{required: true, message: 'Необходимо ввести фамилию'}]}
                    style={{width: 1100}}
                >
                    <Input
                        name={DEFAULT_EMP.surname}
                        placeholder="Фамилия"
                        defaultValue={store.employee && store.employee.surname
                            ? store.employee.surname
                            : ""
                        }
                        style={{width: 200}}
                        onChange={(e) => modalStore.changeHandler(e)}
                    />
                </Form.Item>
                <Form.Item
                    name={DEFAULT_EMP.name}
                    label="Имя"
                    rules={[{required: true, message: 'Необходимо ввести имя'}]}
                    style={{width: 1100}}
                >
                    <Input
                        name={DEFAULT_EMP.name}
                        placeholder="Имя"
                        defaultValue={store.employee && store.employee.name
                            ? store.employee.name
                            : ""
                        }
                        style={{width: 200}}
                        onChange={(e) => modalStore.changeHandler(e)}
                    />
                </Form.Item>
                <Form.Item
                    name={DEFAULT_EMP.fatherName}
                    label="Отчество"
                    style={{width: 1100}}
                >
                    <Input
                        name={DEFAULT_EMP.fatherName}
                        placeholder="Отчество"
                        defaultValue={store.employee && store.employee.fatherName
                            ? store.employee.fatherName
                            : ""
                        }
                        style={{width: 200}}
                        onChange={(e) => modalStore.changeHandler(e)}
                    />
                </Form.Item>
                <Form.Item
                    name={DEFAULT_EMP.position}
                    label="Должность"
                    rules={[{required: true, message: 'Необходимо указать должность'}]}
                    style={{width: 1100}}
                    onChange={(value) => modalStore.selectChangeHandler(value, DEFAULT_EMP.position)}
                >
                    <Select
                        name={DEFAULT_EMP.position}
                        placeholder="Выберите должность"
                        defaultValue={store.employee && store.employee.position
                            ? store.employee.position
                            : ''
                        }
                        style={{width: 200}}
                        onChange={(value, event) => {
                            modalStore.selectChangeHandler(value, event, DEFAULT_EMP.position)
                        }}
                    >
                        {positions}
                    </Select>
                </Form.Item>
                <Form.Item
                    name={DEFAULT_EMP.birthday}
                    label="Дата рождения"
                    rules={[{required: true, message: 'Необходимо указать дату'}]}
                    style={{width: 1100}}
                >
                    <DatePicker
                        name={DEFAULT_EMP.birthday}
                        format={DATE_FORMAT}
                        placeholder="Выберите дату"
                        defaultValue={store.employee && store.employee.birthday
                            ? moment(store.employee.birthday, DATE_FORMAT)
                            : undefined
                        }
                        style={{width: 200}}
                        onChange={(date, dateString) => {
                            modalStore.dateChangeHandler(date, dateString, DEFAULT_EMP.birthday)
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={DEFAULT_EMP.gender}
                    label="Пол"
                    rules={[{required: true, message: 'Необходимо выбрать пол'}]}
                    defaultValue={store.employee && store.employee.gender
                        ? store.employee.gender
                        : GENDERS[0]
                    }
                    style={{width: 1100}}
                >
                    <Radio.Group
                        name={DEFAULT_EMP.gender}
                        onChange={(event, value) => {
                            modalStore.selectChangeHandler(value, event, DEFAULT_EMP.gender)
                        }}
                    >
                        {grs}
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name={DEFAULT_EMP.inDate}
                    label="Дата приема на работу"
                    rules={[{required: true, message: 'Необходимо указать дату'}]}
                    style={{width: 1100}}
                >
                    <DatePicker
                        format={DATE_FORMAT}
                        placeholder="Выберите дату"
                        defaultValue={store.employee && store.employee.inDate
                            ? moment(store.employee.inDate, DATE_FORMAT)
                            : undefined
                        }
                        style={{width: 200}}
                        onChange={(date, dateString) => {
                            modalStore.dateChangeHandler(date, dateString, DEFAULT_EMP.inDate)
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={DEFAULT_EMP.outDate}
                    label="Дата увольнения"
                    style={{width: 1100}}
                >
                    <DatePicker
                        format={DATE_FORMAT}
                        placeholder="Выберите дату"
                        style={{width: 200}}
                        defaultValue={store.employee && store.employee.outDate
                            ? moment(store.employee.outDate, DATE_FORMAT)
                            : undefined
                        }
                        onChange={(date, dateString) => {
                            modalStore.dateChangeHandler(date, dateString, DEFAULT_EMP.outDate)
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={DEFAULT_EMP.hasAccess}
                    label="Наличие прав"
                    style={{width: 1100}}
                >
                    <Checkbox
                        onChange={(checked) => modalStore.checkBoxChangeHandler(checked, DEFAULT_EMP.hasAccess)}
                    />
                </Form.Item>
                <Form.Item
                    name={DEFAULT_EMP.coworkers}
                    label="Коллеги"
                    style={{width: 1100}}
                    onChange={(value) => modalStore.selectChangeHandler(value, DEFAULT_EMP.coworkers)}
                >
                    <Select
                        mode="multiple"
                        style={{width: 200}}
                        placeholder="Выберите коллег"
                        optionLabelProp="label"
                        allowClear="true"
                        defaultValue={store.employee && store.employee.coworkers
                            ? store.coworkersById
                            : undefined
                        }
                        onChange={(value) => modalStore.selectChangeHandler(value, DEFAULT_EMP.coworkers)}
                    >
                        {coworkers}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default EmployeeModal
