import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Tooltip,Button } from 'antd';
import React, { useRef } from 'react';
import { queryRegisterLog } from './service';


const TableList = () => {

  const actionRef = useRef();
  const columns = [
    {
      title: '昵称',
      dataIndex: 'NickName',
    },
    {
      title: '手机号',
      dataIndex: 'Mobile',
    },
    {
      title: '注册手机号',
      dataIndex: 'RegisterMobile',
      hideInSearch: true,
    },
    {
      title: '注册IP',
      dataIndex: 'RegIp',
      hideInSearch: true,
    },
    {
      title: '注册设备',
      dataIndex: 'DeviceUA',
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Tooltip placement="topLeft" title={record.DeviceUA}>{`${record.DeviceUA.substring(
            0,
            20,
          )}...`}</Tooltip>
        </>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      sorter: true,
      valueType: 'dateTimeRange',
    },
  ];
  return (
    <>
      <ProTable
        headerTitle={false}
        actionRef={actionRef}
        rowKey="key"
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
          queryRegisterLog({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
        search={{
          collapsed: false,
          collapseRender:false
        }}


        options={{
          fullScreen: false,
          reload: false,
          setting: false,
          density: false,
        }}
      />
    </>
  );
};

export default TableList;
