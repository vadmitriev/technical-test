import {Table} from 'antd'

import {ColsForExtendedRows} from './ColsForExtendedRows'

export const expandedRowRender = ((store) => {
        const columns = ColsForExtendedRows(store)

        return (
            <Table
                columns={columns}
                dataSource={store.attributes}
                rowKey={columns.keys()}
                pagination={false}
            />
        )
})
