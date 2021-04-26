import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Button, Col, Row} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {action} from 'mobx'
import {MODALS_TITLES} from './constant/constant'

export const AddEmployeeButton = observer(class extends Component {
    render() {
        const {store} = this.props
        return (
            <Row type="flex">
                <Col span={22}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape="round"
                        icon={<PlusOutlined/>}
                        onClick={action(() => {
                                store.showModal(MODALS_TITLES.create)
                            })
                        }
                    >
                        Добавить работника
                    </Button>
                </Col>
            </Row>
        )
    }
})
