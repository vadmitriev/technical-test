import {Button, Popconfirm, Space, Tooltip} from 'antd'
import {action} from 'mobx'
import {CloseOutlined} from '@ant-design/icons'

export const ColsForExtendedRows = (store) => {
    return [
        {title: 'Атрибут', dataIndex: 'name', key: 'name'},
        {title: 'Значение', dataIndex: 'value', key: 'value'},
        {title: 'Тип атрибута', dataIndex: 'type', key: 'type'},
        {
            title: 'Действия',
            dataIndex: 'operation',
            key: 'operation',
            render: (_, item) => {
                return (
                    <Space key={item.id}>
                        <Tooltip placement="topLeft" title="Удалить">
                            <Popconfirm
                                placement="topLeft"
                                title={() => {
                                    const attrName = store.attributes[item.id].name
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
}