import {Button, Popconfirm, Space, Table, Tooltip} from 'antd'
import {CloseOutlined, EditOutlined} from '@ant-design/icons'
import {action} from 'mobx'

export const expandedRowRender = (store) => {
    console.log('expandedRowRender', store)
    const columns = [
        {title: 'Атрибут', dataIndex: 'name', key: 'name'},
        {title: 'Значение', dataIndex: 'value', key: 'value'},
        {title: 'Тип атрибута', dataIndex: 'type', key: 'type'},
        {
            title: 'Действия',
            dataIndex: 'operation',
            key: 'operation',
            render: (_, item) => {
                console.log('id:', item.id)
                return (
                    <Space key={item.id}>
                        <Tooltip placement="topLeft" title="Редактировать">
                            <Button
                                shape="round"
                                size="small"
                                icon={<EditOutlined/>}
                                onClick={action((item) => {
                                    console.log('id:', item.id)
                                    store.showModal("edit", item)
                                    // console.log('edit attributes')
                                })}
                            >
                            </Button>
                        </Tooltip>
                        <Tooltip placement="topLeft" title="Удалить">
                            <Popconfirm
                                placement="topLeft"
                                title={() => {
                                    const surname = 'test'
                                    return `Вы уверены что хотите удалить ${surname}?`
                                }}
                                onConfirm={action(
                                    async () => {
                                        console.log('confirm delete')
                                        // store.deleteEmployee(employee.id)
                                        //     .then(message.info(`Пользователь ${employee.surname} был удален`))
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
            },
        },
    ]

    return (
        <Table
            columns={columns}
            dataSource={store.attributes}
            rowKey={columns.keys()}
            pagination={false}
        />
    )
}
