import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import CreateAccountFrom from './components/CreateAccountFrom';
import UpdateAccountForm from './components/UpdateAccountForm';
import {
  addPaymentAccount, queryPaymentAccountList,
  removePaymentAccount, updatePaymentAccount,
  updatePaymentAccountStatus
} from './service';

/**
 * 添加账户
 * @param values
 */

const handleAddAccount = async (values) => {
  const hide = message.loading('正在添加');
  try {
    await addPaymentAccount({ ...values });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新账户
 * @param {*} values
 */
const handleUpdatePaymentAccount = async (values) => {
  console.log('更新账户');
  console.log(values);
  const hide = message.loading('正在更新');
  try {
    await updatePaymentAccount({ ...values });
    hide();
    message.success('更新成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 删除账户
 * @param {*} row
 */
const handleRemovePaymentAccount = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removePaymentAccount({ Id: row.Id });
    hide();
    message.success('删除成功，即将刷新');
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
const handleUpdatePaymentAccountStatus = async (state, row) => {
  await updatePaymentAccountStatus({
    Id: row.Id,
    Status: state ? 1 : 2,
  });
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '支付渠道Code',
      dataIndex: 'ChannelCode',
      rules: [
        {
          required: true,
          message: '支付渠道Code为必填项',
        },
      ],
    },
    {
      title: '账户名称',
      dataIndex: 'Name',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '账户名称为必填项',
        },
      ],
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
              handleUpdatePaymentAccountStatus(state, record);
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
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              history.replace({
                pathname: `/system/pay/args/${record.Id}/支付参数-${record.Name}`,
              });
            }}
          >
            支付参数
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setFormValues(record);
              handleUpdateModalVisible(true);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除这条记录吗？"
            okText="确认"
            cancelText="取消"
            onConfirm={async () => {
              const success = await handleRemovePaymentAccount(record);
              if (success) {
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
          >
            <a style={{ color: '#F42708' }}>删除</a>
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
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 添加
          </Button>,
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
          queryPaymentAccountList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />
      <CreateAccountFrom
        handleAddAccount={async (value) => {
          const success = await handleAddAccount(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />

      <UpdateAccountForm
        handleUpdatePaymentAccount={async (value) => {
          const success = await handleUpdatePaymentAccount(value);
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
