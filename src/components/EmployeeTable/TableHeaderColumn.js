import {sorterFields} from '../../util'
import {Button, Popconfirm, Space, Tag, message, Tooltip} from 'antd'
import {CloseOutlined, EditOutlined, PlusSquareOutlined, UnorderedListOutlined} from '@ant-design/icons'
import {action} from 'mobx'


export const TableHeaderColumns = (store) => {
    return [
        {
            title: "Фамилия",
            dataIndex: "surname",
            key: "surname",
            width: 120,
            fixed: 'left',
            sorter: sorterFields("surname")
        },
        {
            title: "Имя",
            dataIndex: "name",
            key: "name",
            width: 120,
            sorter: sorterFields("name")
        },
        {
            title: "Отчество",
            dataIndex: "fatherName",
            key: "fatherName",
            width: 120,
            sorter: sorterFields("fatherName")
        },
        {
            title: "Должность",
            dataIndex: "position",
            key: "position",
            width: 120,
            sorter: sorterFields("position")
        },
        {
            title: "Дата рождения",
            dataIndex: "birthday",
            key: "birthday",
            width: 150,
            sorter: sorterFields("birthday")
        },
        {
            title: "Пол",
            dataIndex: "gender",
            key: "gender",
            width: 100,
            sorter: sorterFields("gender")
        },
        {
            title: "Дата приема",
            dataIndex: "inDate",
            key: "inDate",
            width: 130,
            sorter: sorterFields("inDate")
        },
        {
            title: "Дата увольнения",
            dataIndex: "outDate",
            key: "outDate",
            width: 160,
            sorter: (a, b) => a.outDate.localeCompare(b.outDate),
            render: (_, employee) => {
                const outDate = store.wasFired(employee)
                if (outDate) {
                    const color = 'volcano'
                    return (
                        <Tag color={color}>
                            {outDate}
                        </Tag>
                    )
                }
            }
        },
        {
            title: "Права доступа",
            dataIndex: "hasAccess",
            key: "hasAccess",
            width: 150,
            sorter: (a, b) => (a.hasAccess ? 1 : 0 - b.hasAccess ? 1 : 0),
            render: (_, employee) => {
                const hasAccess = store.hasAccess(employee)
                const color = hasAccess ? 'green' : 'geekblue'
                const text = hasAccess ? 'Есть' : 'Нет'
                return (
                    <Tag color={color}>
                        {text}
                    </Tag>
                )
            }
        },
        {
            title: "Коллеги",
            dataIndex: "collegsIds",
            width: 150,
            render: (_, employee) => {
                return (
                    <Space>
                        <Tooltip placement="topLeft" title="Посмотреть коллег">
                            <Button
                                shape="round"
                                size="small"
                                icon={<UnorderedListOutlined />}
                                onClick={action(() =>
                                    store.showModal("edit", employee)
                                )}
                            >
                            </Button>
                        </Tooltip>
                    </Space>
                )
            }
        },
        {
            title: "Действия",
            dataIndex: "actions",
            width: 330,
            render: (_, employee) => {
                return (
                    <Space>
                        <Tooltip placement="topLeft" title="Редактировать">
                            <Button
                                shape="round"
                                size="small"
                                icon={<EditOutlined/>}
                                onClick={action(() =>
                                    store.showModal({action: "edit", employee})
                                )}
                            >
                            </Button>
                        </Tooltip>
                        <Tooltip placement="topLeft" title="Добавить атрибут">
                            <Button
                                shape="round"
                                size="small"
                                icon={<PlusSquareOutlined/>}
                                onClick={action(() =>
                                    store.showModal({action: "edit", employee})
                                )}
                            >
                            </Button>
                        </Tooltip>
                        <Tooltip placement="topLeft" title="Удалить">
                            <Popconfirm
                                placement="topLeft"
                                title={() => {
                                    // const shortName = `${employee.surname} ${employee.name[0]}.${employee.fatherName[0]}`
                                    return `Удалить работника ${store.shortName}?`
                                }}
                                onConfirm={action(
                                    async () => {
                                        store.deleteEmployee(employee.id)
                                            .then(message.info(`Работник ${employee.surname} был удален`))
                                    }
                                )}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Button shape="round" size="small" icon={<CloseOutlined/>}>
                                </Button>
                            </Popconfirm>
                        </Tooltip>
                    </Space>
                )
            }
        }
    ]
}