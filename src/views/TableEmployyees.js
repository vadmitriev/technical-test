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
import ModalForm from '../components/EmployeeTable/modals/ModalForm'

import {TableHeaderColumns} from '../components/EmployeeTable/TableHeaderColumn'
import {expandedRowRender} from '../components/EmployeeTable/ExtenderTableRow'
import {AddEmployeeButton} from '../components/EmployeeTable/AddEmployeeButton'

export const TableEmployees = observer(class extends Component {
    render() {
        const {store} = this.props

        const loadingIcon = <SyncOutlined style={{fontSize: 32}} spin/>

        const columns = TableHeaderColumns(store)

        return (
            <Space direction="vertical" style={{padding: 20}}>
                <AddEmployeeButton store={store}/>
                <ModalForm store={store}/>

                <Row type="flex" className="flex-item-grow">
                    <Col span={24}>
                        <Spin
                            tip="Загрузка..."
                            indicator={loadingIcon}
                            spinning={store.isLoading}
                        >
                            <Table
                                className="emp-table"
                                size="small"
                                columns={columns}
                                expandable={{expandedRowRender}}
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

