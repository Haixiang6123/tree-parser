import React from 'react'
import {Select, Table} from "antd"
import columns from "./config"

const {Option} = Select

const App = () => {
  const onDateChange = () => {

  }
  const onStatusChange = () => {

  }
  const onTypeChange = () => {

  }

  return (
    <div className="App">
      <div>
        <Select
          showSearch
          style={{width: 200}}
          placeholder="选择"
          optionFilterProp="children"
          onChange={onDateChange}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </div>

      <div>
        <Table columns={columns} dataSource={data}/>
      </div>
    </div>
  )
}

export default App
