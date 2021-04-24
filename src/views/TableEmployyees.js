import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {
    Row,
    Col,
    Space,
    Spin,
    Table
} from 'antd'
import {SyncOutlined} from '@ant-design/icons'
import 'antd/dist/antd.css'
import '../styles/TableEmployyes.css'
import EmployeeModalForm from './EmpoyeeModalForm'

import {TableHeaderColumns} from '../components/EmployeeTable/TableHeaderColumn'
import {expandedRowRender} from '../components/EmployeeTable/ExtenderTableRow'
import {AddEmployeeButton} from '../components/EmployeeTable/AddEmployeeButton'

const loadingIcon = <SyncOutlined style={{fontSize: 32}} spin/>

export const TableEmployees = observer(class extends Component {
    render() {
        const {store} = this.props

        const pagination = store.employeeList && store.employeeList.length > 10
            ? {defaultPageSize: 10, showLessItems: true}
            : false

        const columns = TableHeaderColumns(store)

        return (
            <Space direction="vertical" style={{padding: 20}}>
                <AddEmployeeButton store={store}/>
                <EmployeeModalForm store={store}/>
                <Row type="flex" className="flex-item-grow">
                    <Col span={24}>
                        <Spin
                            tip="Загрузка..."
                            indicator={loadingIcon}
                            spinning={store.isLoading}
                        >
                            <Table
                                // style={{maxWidth: '80%'}}
                                className="emp-table"
                                size="small"
                                columns={columns}
                                expandable={{expandedRowRender}}
                                pagination={pagination}
                                // pagination={{ pageSize: 100 }}
                                // scroll={{ y: 750 }}
                                dataSource={[...store.employeeList]}
                                rowKey={(w) => `${w.id}`}
                            />
                        </Spin>
                    </Col>
                </Row>
            </Space>
        )
    }
})

