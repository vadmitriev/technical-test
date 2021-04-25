import {Button, Popconfirm, Space, Table, Tooltip} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import {action} from 'mobx'

export const expandedRowRender = ((store) => {
        const columns = [
            {title: 'Атрибут', dataIndex: 'name', key: 'name'},
            {title: 'Значение', dataIndex: 'value', key: 'value'},
            {title: 'Тип атрибута', dataIndex: 'type', key: 'type'},
            {
                title: 'Действия',
                dataIndex: 'operation',
                key: 'operation',
                render: (_, item) => {
                    console.log('extended item:', item, 'id:', item.id)
                    console.log('extended item store id:', store.id)
                    return (
                        <Space key={item.id}>
                            <Tooltip placement="topLeft" title="Удалить">
                                <Popconfirm
                                    placement="topLeft"
                                    title={() => {
                                        const attrName = store.attributes[item.id].name
                                        console.log('attrName', attrName)
                                        return `Удалить атрибут "${attrName}"?`
                                    }}
                                    onConfirm={action(() => {
                                            store.attributes.splice(item.id, 1)
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
})
