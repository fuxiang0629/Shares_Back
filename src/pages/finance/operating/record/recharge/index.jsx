import { money_unit } from '@/utils/config';
import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { queryRechargeRecord } from './service';
const TableList = () => {
  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      hideInSearch: true,
    },
    {
      title: '订单编号',
      dataIndex: 'OrderSN',
    },
    {
      title: '用户昵称',
      dataIndex: 'AccountName',
    },
    {
      title: '用户手机号',
      dataIndex: 'AccountMobile',
    },
    {
      title: '支付渠道',
      dataIndex: 'ChannelName',
      hideInSearch: true,
    },
    {
      title: '收款账户',
      dataIndex: 'PaymentAccountName',
      hideInSearch: true,
    },
    {
      title: '充值金额',
      dataIndex: 'RechargeAmount',
      hideInSearch: true,
      renderText: (val) => `${val / money_unit}元`,
    },
    {
      title: '支付金额',
      dataIndex: 'PayAmount',
      hideInSearch: true,
      renderText: (val) => `${val / money_unit}元`,
    },

    {
      title: '状态',
      dataIndex: 'PayStatus',
      hideInForm: true,
      valueEnum: {
        1: {
          text: '支付中',
          status: 'Processing',
        },
        2: {
          text: '支付关闭',
          status: 'Warning',
        },
        3: {
          text: '已支付',
          status: 'Success',
        },
        4: {
          text: '成功充值',
          status: 'Success',
        },
        5: {
          text: '支付关闭导致退款',
          status: 'Warning',
        },
        6: {
          text: '管理员后台退款',
          status: 'Warning',
        },
        7: {
          text: '退款中',
          status: 'Warning',
        },
        8: {
          text: '退款成功',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      valueType: 'dateTimeRange',
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
          queryRechargeRecord({ ...params, sorter, filter }).then((res) => {
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
