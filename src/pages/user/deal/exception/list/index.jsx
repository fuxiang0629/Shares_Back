import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm, Tooltip } from 'antd';
import React, { useRef } from 'react';
import { useParams } from 'umi';
import {
  queryAccountDealExDetailList,
  updateTradeExRecordCancel,
  updateTradeExRecordSync
} from '../service';

const handleRevoke = async (selectedRows) => {
  const hide = message.loading('正在撤销');
  if (!selectedRows) return true;

  try {
    await updateTradeExRecordCancel({ Id: selectedRows.Id });
    hide();
    message.success('撤销成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};
const handleSync = async (selectedRows) => {
  const hide = message.loading('正在同步');
  if (!selectedRows) return true;

  try {
    await updateTradeExRecordSync({ Id: selectedRows.Id });
    hide();
    message.success('同步成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList = () => {
  const actionRef = useRef();
  const queryParams = useParams();
  console.log(queryParams);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '交易账户code',
      dataIndex: 'TradeAccountCode',
    },
    {
      title: '委托编号',
      dataIndex: 'EntrustId',
    },
    {
      title: '委托数量',
      dataIndex: 'EntrustCount',
    },
    {
      title: '成交数量',
      dataIndex: 'DealCount',
    },
    {
      title: '委托状态',
      dataIndex: 'Status',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '申报中',
        },
        2: {
          text: '交易中',
        },
        3: {
          text: '已完成',
        },
      },
    },
    {
      title: '状态描述',
      dataIndex: 'StatusDes',
      render: (_, record) => (
        <>
          {record.Remark && (
            <Tooltip placement="topLeft" title={record.Remark}>{`${record.Remark.substring(
              0,
              20,
            )}...`}</Tooltip>
          )}
        </>
      ),
      hideInForm: true,
      hideInSearch: true,
    },

    {
      title: '委托时间',
      dataIndex: 'EntrustTime',
      valueType: 'dateTimeRange',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Popconfirm
            title="确认要同步吗？"
            okText="确认"
            cancelText="取消"
            onConfirm={async () => {
              const success = await handleSync(record);
              if (success) {
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
          >
            <a>同步</a>
          </Popconfirm>
          <Divider type="vertical" />
          <Popconfirm
            title="确认要撤销吗？"
            okText="确认"
            cancelText="取消"
            onConfirm={async () => {
              const success = await handleRevoke(record);
              if (success) {
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
          >
            <a style={{ color: '#F42708' }}>撤单</a>
          </Popconfirm>
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
          queryAccountDealExDetailList({ ...params, sorter, filter, Id: queryParams.id }).then(
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
