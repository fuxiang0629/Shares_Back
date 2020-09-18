import { money_unit } from '@/utils/config';
import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import {history} from 'umi';
import React, { useRef } from 'react';
import { queryAccountHoldTotalList } from './service';


const TableList = () => {
  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'AccountId',
      hideInForm: true,
      hideInSearch:true,
    },
    {
      title: (_, type) => (type === 'table' ? <span>用户昵称</span> : <span>用户昵称/手机号</span>),
      dataIndex: 'AccountName',
    },
    {
      title: '用户手机号',
      dataIndex: 'AccountMobile',
      hideInForm: true,
      hideInSearch:true,
    },
    {
      title: '持仓数量',
      dataIndex: 'HoldCount',
      hideInForm: true,
      hideInSearch:true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              history.push({
                pathname: `/user/deal/exception/${record.Id}/交易异常详情-${record.AccountName}`,
              });
            }}
          >
           {
             record.HoldCount
           }
          </a>
        </>
      ),
    },
    {
      title: '总市值',
      dataIndex: 'TotalMarketValue',
      hideInForm: true,
      hideInSearch:true,
      renderText: (val) => `${val/money_unit} 元`,
    },
    {
      title: '总盈亏',
      dataIndex: 'TotalProfit',
      hideInForm: true,
      hideInSearch:true,
      renderText: (val) => `${val/money_unit} 元`,
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
        rowKey="AccountId"
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
          queryAccountHoldTotalList({ ...params, sorter, filter }).then((res) => {
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
