import React, {Component} from 'react'
import {observer} from 'mobx-react'
import '../../styles/App.css'
import store from '../../stores/TableStore'

import {TableEmployees} from '../../views/TableEmployyees'

export const App = observer(class extends Component {
    componentDidMount() {
        store.setAppLoaded()
    }

    render() {
        if (store.appLoaded) {
            return <TableEmployees store={store}/>
        }
        return <div>App Not Loaded</div>
    }
})

export default App
