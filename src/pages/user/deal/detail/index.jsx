import { money_unit } from '@/utils/config';
import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { history, useParams } from 'umi';
import React, { useRef } from 'react';
import { queryAccountDealRecordList } from './service';

const TableList = () => {
  const queryParams = useParams();
  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '证券账号Code',
      dataIndex: 'TradeAccountCode',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '委托编号',
      dataIndex: 'EntrustId',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '持仓数量',
      dataIndex: 'EntrustCount',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '成交数量',
      dataIndex: 'DealCount',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '成交金额',
      dataIndex: 'DealAmount',
      hideInForm: true,
      hideInSearch: true,
      renderText: (val) => `${val / money_unit} 元`,
    },
    {
      title: '成交时间',
      dataIndex: 'DealTime',
      valueType: 'dateTimeRange',
      hideInForm: true,
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
          queryAccountDealRecordList({ ...params, sorter, filter, Id: queryParams.id }).then(
            (res) => {
              const result = {
                data: res.Data.List,
                total: res.Data.TotalCount,
              };
              return result;
            },
          )
        }
        columns={columns}
      />
    </>
  );
};

export default TableList;
