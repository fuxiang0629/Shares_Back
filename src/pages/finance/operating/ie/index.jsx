import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { queryFinanceList } from './service';

const TableList = () => {
  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
    },
    {
      title: '类型Code',
      dataIndex: 'TypeCode',
    },
    {
      title: '类型描述',
      dataIndex: 'TypeDes',
    },
    {
      title: '确认金额',
      dataIndex: 'ConfirmDeposit',
    },
    {
      title: '总金额',
      dataIndex: 'TotalDeposit',
    },

    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
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
        search={false}
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
          queryFinanceList({ ...params, sorter, filter }).then((res) => {
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
