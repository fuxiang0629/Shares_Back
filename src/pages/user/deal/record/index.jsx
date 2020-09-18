import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, Popconfirm, Tooltip, message } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import { money_unit } from '@/utils/config';
import UpdateForm from './components/UpdateForm';
import { queryAccountDealRecordList, updateAccountDealRevoke } from './service';

/**
 * 撤单
 * @param {*} selectedRows
 */
const handleRevoke = async (selectedRows) => {
  const hide = message.loading('正在撤销');
  if (!selectedRows) return true;

  try {
    await updateAccountDealRevoke({ Id: selectedRows.Id });
    hide();
    message.success('撤销成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: (_, type) => (type === 'table' ? <span>用户昵称</span> : <span>用户昵称/手机号</span>),
      dataIndex: 'AccountName',
      render: (_, record) => (
        <>
          <span>{`${record.AccountMobile}(${record.AccountName})`}</span>
        </>
      ),
    },
    {
      title: (_, type) =>
        type === 'table' ? <span>股票名称</span> : <span>股票名称/股票代码</span>,
      dataIndex: 'SharesName',
      render: (_, record) => (
        <>
          <span>{`${record.SharesName}(${record.SharesCode})`}</span>
        </>
      ),
    },
    {
      title: '交易类型',
      dataIndex: 'TradeType',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '买入',
        },
        2: {
          text: '卖出',
        },
      },
    },
    {
      title: '委托数量',
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
      title: '成交均价',
      dataIndex: 'DealPriceAvg',
      render: (_, record) => (
        <>
          <span>{`${record.DealPriceAvg / money_unit}`}</span>
        </>
      ),
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '成交金额',
      dataIndex: 'DealAmount',
      render: (_, record) => (
        <>
          <span>{`${record.DealAmount / money_unit}`}</span>
        </>
      ),
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '委托状态',
      dataIndex: 'EntrustStatus',
      hideInForm: true,
      valueEnum: {
        1: {
          text: '申报中',
        },
        2: {
          text: '交易中',
        },
        21: {
          text: '部成',
        },
        3: {
          text: '已完成',
        },
        31: {
          text: '部撤',
        },
        32: {
          text: '已撤',
        },
      },
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'Remark',
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
      title: '申报日期',
      dataIndex: 'CreateTime',
      valueType: 'dateTimeRange',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              history.push({
                pathname: `/user/deal/detail/${record.Id}/交易详情——${record.Id}(${record.SharesName})`,
              });
            }}
          >
            交易详情
          </a>

          <Divider type="vertical" />
          <Popconfirm
            title="确认要撤单吗？"
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
          queryAccountDealRecordList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />

      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);

          if (success) {
            handleUpdateModalVisible(false);
            setStepFormValues({});

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setStepFormValues({});
        }}
        updateModalVisible={updateModalVisible}
        values={stepFormValues}
      />
    </>
  );
};

export default TableList;
