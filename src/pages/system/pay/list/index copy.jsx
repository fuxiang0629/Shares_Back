
import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, message, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import UpdatePayAccountForm from './components/UpdatePayAccountForm';
import UpdatePayIndexForm from './components/UpdatePayIndexForm';
import {
  queryPaymentChannelList,

  updatePaymentChannelAccount,
  updatePaymentChannelOrderIndex, updatePaymentChannelStatus
} from './service';


/**
 * 更新排序
 * @param values
 */
const handleUpdatePayIndex = async (values) => {
  const hide = message.loading('正在更新');
  try {
    await updatePaymentChannelOrderIndex({ ...values });
    hide();
    message.success('更新成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新账户
 * @param values
 */
const handleUpdatePayAccount = async (values) => {
  const hide = message.loading('正在更新');
  try {
    await updatePaymentChannelAccount({ ...values });
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
const handleUpdatePaymentChanneStatus = async (state, row) => {
  await updatePaymentChannelStatus({
    ChannelCode: row.ChannelCode,
    BusinessCode: row.BusinessCode,
    Status: state ? 1 : 2,
  });
};

const TableList = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateIndexModalVisible, handleUpdateIndexModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});

  const actionRef = useRef();
  const columns = [
    {
      title: '支付类型',
      dataIndex: 'ChannelName',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '账号数量',
      dataIndex: 'Type',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setFormValues(record);
            }}
          >
            {record.PaymentAccountCount}
          </a>
        </>
      ),
    },
    {
      title: '排序值',
      dataIndex: 'OrderIndex',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setFormValues(record);
              handleUpdateIndexModalVisible(true);
            }}
          >
            {record.OrderIndex}
          </a>
        </>
      ),
    },

    {
      title: '状态',
      dataIndex: 'Status',
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
              handleUpdatePaymentChanneStatus(state, record);
            }}
          />
        </>
      ),
    },
    {
      title: '更新时间',
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
        search={false}
        rowKey="OrderIndex"
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

      <UpdatePayIndexForm
        handleUpdatePayIndex={async (value) => {
          const success = await handleUpdatePayIndex(value);
          if (success) {
            handleUpdateIndexModalVisible(false);
            setFormValues({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateIndexModalVisible(false);
          setFormValues({});
        }}
        modalVisible={updateIndexModalVisible}
        values={formValues}
      />

      <UpdatePayAccountForm
        handleUpdatePayAccount={async (value) => {
          const success = await handleUpdatePayAccount(value);
          if (success) {
            handleUpdateModalVisible(false);
            setFormValues({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
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
