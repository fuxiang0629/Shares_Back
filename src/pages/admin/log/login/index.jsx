import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { queryLoginLog } from './service';

const TableList = () => {
  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'LogId',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'AccountName',
    },
    {
      title: '登录时间',
      dataIndex: 'LoginTime',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '登录错误码',
      dataIndex: 'LoginError',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '登出时间',
      dataIndex: 'LogoutTime',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '登出错误码',
      dataIndex: 'LoginoutError',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: 'IP',
      dataIndex: 'LoginIp',
      valueType: 'textarea',
    },
    {
      title: 'UA',
      dataIndex: 'DeviceUA',
      valueType: 'textarea',
      hideInSearch: true,
    },
  ];
  return (
    <>
      <ProTable
        search={{
          collapsed: false,
          collapseRender: false,
        }}
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
          density: false,
        }}
        headerTitle={false}
        actionRef={actionRef}
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

        rowKey="LogId"
        request={(params, sorter, filter) =>
          queryLoginLog({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />
    </>
  );
};

export default TableList;
