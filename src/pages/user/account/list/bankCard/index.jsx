import { ReloadOutlined } from '@ant-design/icons';
import { getPageQuery } from '@/utils/utils';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { queryAccountBankCardList } from './service';
const queryParams = getPageQuery();

const TableList = () => {
  const actionRef = useRef();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'Id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '持卡人',
      dataIndex: 'RealName',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '卡号',
      dataIndex: 'CardNumber',
    },
    {
      title: '银行名称',
      dataIndex: 'BankName',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '银行卡类型',
      dataIndex: 'CardBreed',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'Mobile',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      valueType: 'dateTimeRange',
      hideInForm: true,
      hideInSearch: true,
    },
    
  ];
  return (
    <>
      <ProTable
        headerTitle={false}
        search={{
          collapsed: false,
          collapseRender: false,
        }}
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
        actionRef={actionRef}
        rowKey="Id"
        request={(params, sorter, filter) =>
          queryAccountBankCardList({ ...params, sorter, filter, ...queryParams }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
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
