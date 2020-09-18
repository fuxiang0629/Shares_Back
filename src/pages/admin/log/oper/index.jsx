import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { queryOperateLog } from './service';

const TableList = () => {
  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'LogId',
      hideInSearch: true,
    },
    {
      title: '登录记录Id',
      dataIndex: 'LoginLogId',
    },
    {
      title: '账户名称',
      dataIndex: 'UserName',
      order: 1,
    },
    {
      title: '操作描述',
      dataIndex: 'OperationDes',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '操作时间',
      dataIndex: 'CreateTime',
      sorter: true,
      valueType: 'dateTimeRange',
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
          queryOperateLog({ ...params, sorter, filter }).then((res) => {
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
