import { money_unit } from '@/utils/config';
import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import DetailForm from './components/DetailForm';
import PayDetailForm from './components/PayDetailForm';
import { queryTransferRecord } from './service';

const TableList = () => {
  const [detailModalVisible, handleDetailModalVisible] = useState(false);
  const [payDetailModalVisible, handlePayDetailModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
    },
    {
      title: '打款金额',
      dataIndex: 'TotalAmount',
      renderText: (val) => `${val / money_unit}`,
    },
    {
      title: '实转金额',
      dataIndex: 'TotalServiceFee',
      render: (_, record) => (
        <>
          <span>
            {(record.TotalAmount / money_unit - record.TotalServiceFee / money_unit).toFixed(2)}
          </span>
        </>
      ),
    },
    {
      title: '打款类型',
      dataIndex: 'Type',
    },
    {
      title: '打款次数',
      dataIndex: 'Count',
      render: (_, record) => (
        <>
          <a onClick={()=>{
            handlePayDetailModalVisible(true)
            setFormValues(record);
          }}>{record.Count}</a>
        </>
      ),
    },

    {
      title: '最后打款日期',
      dataIndex: 'LastTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setFormValues(record);
              handleDetailModalVisible(true)
            }}
          >
            查看详情
          </a>
        </>
      ),
    },
  ];
  return (
    <>
      <ProTable
        search={false}
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
          density: false,
        }}
        headerTitle={false}
        actionRef={actionRef}
        rowKey="Id"
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          >
            <ReloadOutlined />
            刷新
          </Button>,
        ]}
        request={(params, sorter, filter) =>
          queryTransferRecord({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />
      

      <DetailForm
        onCancel={() => handleDetailModalVisible(false)}
        modalVisible={detailModalVisible}
        values={formValues}
      />

      <PayDetailForm
        onCancel={() => handlePayDetailModalVisible(false)}
        modalVisible={payDetailModalVisible}
        values={formValues}
      />

    </>
  );
};

export default TableList;
