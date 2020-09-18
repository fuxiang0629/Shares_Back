
import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, message, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateAccountForm from './components/UpdateAccountForm';
import {
  queryPaymentChannelList,

  updatePaymentChannelRefundAccount, updatePaymentChannelStatus,

  updatePaymentChannelTransferAccount
} from './service';

/**
 * 更新账户
 * @param values
 */
const handleUpdateAccount = async (type, values) => {
  const hide = message.loading('正在更新');
  try {
    !type ? await updatePaymentChannelRefundAccount({ ...values }) : await updatePaymentChannelTransferAccount({ ...values });
    hide();
    message.success('更新成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新状态
 * @param {*} row
 */
const handleUpdatStatus = async (state, row) => {
  await updatePaymentChannelStatus({
    ChannelCode: row.ChannelCode,
    BusinessCode: row.BusinessCode,
    Status: state ? 1 : 2,
  });
};

const TableList = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [type, setType] = useState(0);
  const actionRef = useRef();
  const columns = [
    {
      title: '渠道Code',
      dataIndex: 'ChannelCode',
    },
    {
      title: '渠道名称',
      dataIndex: 'ChannelName',
      hideInSearch: true,
    },
    {
      title: '退款账户数量',
      dataIndex: 'PaymentCashRefundAccountCount',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setType(0);
              setFormValues(record);
              handleUpdateModalVisible(true);
            }}
          >
            {record.PaymentCashRefundAccountCount}
          </a>
        </>
      ),
    },
    {
      title: '转账账户数量',
      dataIndex: 'PaymentCashTransferAccountCount',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setType(1);
              setFormValues(record);
              handleUpdateModalVisible(true);
            }}
          >
            {record.PaymentCashTransferAccountCount}
          </a>
        </>
      ),
    },
    {
      title: '状态',
      dataIndex: 'Status',
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '开启',
        },
        2: {
          text: '关闭',
        },
      },
      render: (_, record) => (
        <>
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            defaultChecked={record.Status === 1 ? true : false}
            onChange={(state) => {
              handleUpdatStatus(state, record);
            }}
          />
        </>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      sorter: true,
      valueType: 'dateTime',
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
        rowKey="ChannelCode"
        request={(params, sorter, filter) =>
          queryPaymentChannelList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />

      <UpdateAccountForm
        handleUpdateAccount={async (value) => {
          const success = await handleUpdateAccount(type, value);
          if (success) {
            handleUpdateModalVisible(false);
            setFormValues({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        type={type}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setFormValues({});
        }}
        modalVisible={updateModalVisible}
        values={formValues}
      />
    </>
  );
};

export default TableList;
