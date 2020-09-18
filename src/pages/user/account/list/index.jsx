import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Select, Switch } from 'antd';
import md5 from 'js-md5';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import UpdateAccountForm from './components/UpdateAccountForm';
import UpdatePwdForm from './components/UpdatePwdForm';
import UpdateWalletForm from './components/UpdateWalletForm';
import {
  queryAccountList,
  updateAccountDealPwd, updateAccountDealStatus, updateAccountInfo,
  updateAccountPwd, updateAccountStatus,
  updateAccountWallet, updateAccountWalletStatus
} from './service';


/**
 * 修改密码
 * @param {*} values
 */
const handleUpdatePwd = async (type, values) => {
  const hide = message.loading('正在更新');
  
  try {
    if (!type) {
      await updateAccountPwd({
        AccountId: values.AccountId,
        NewPassword: md5(values.confirm),
      });
    } else {
       await updateAccountDealPwd({
        AccountId: values.AccountId,
        TransactionPassword: md5(values.confirm),
      });
    }
    hide();
    message.success('更新成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新账户状态
 * @param {*} row
 */
const handleUpdateAccountStatus = async (state, row) => {
  await updateAccountStatus({
    Id: row.AccountId,
    Status: state ? 1 : 2,
  });
};

/**
 * 修改账户钱包状态
 * @param {*} state
 * @param {*} row
 */
const handleUpdateAccountWalletStatus = async (state, row) => {
  await updateAccountWalletStatus({
    Id: row.AccountId,
    Status: state ? 1 : 2,
  });
};

/**
 * 更新账户基础信息
 * @param {*} values
 */

const handleUpdateAccount = async (values) => {
  console.log(values);
  const hide = message.loading('正在更新');
  const tt = moment(values.BirthDay._d).format('YYYY-MM-DD');
  try {
    const res = await updateAccountInfo({ ...values, BirthDay: tt });
    if (!res.ErrorCode) {
      hide();
      message.success('更新成功，即将刷新');
      return true;
    } else {
      throw res.ErrorMessage;
    }
  } catch (error) {
    hide();
    message.error(error);
    return false;
  }
};

/**
 * 修改交易类型
 * @param {*} value
 */
const handleChangeDealType = async (record, value) => {
  console.log('修改交易类型');
  console.log(value);
  console.log(record);
  await updateAccountDealStatus({
    Id: record.AccountId,
    ForbidStatus: value,
  });
};

/**
 * 修改账户余额
 * @param {*} values
 */
const handleUpdateWallet = async (values) => {
  console.log('修改账户余额');
  console.log(values);

  const hide = message.loading('正在更新');
  try {
    const res = await updateAccountWallet({ ...values, AddDeposit: values.AddDeposit * 10000 });
    if (!res.ErrorCode) {
      hide();
      message.success('更新成功，即将刷新');
      return true;
    } else {
      throw res.ErrorMessage;
    }
  } catch (error) {
    hide();
    message.error(error);
    return false;
  }
};

const TableList = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [modifyPwdModalVisible, handleModifyPwdModalVisible] = useState(false);
  const [modifyWalletModalVisible, handleModifyWalletModalVisible] = useState(false);
  const [accountFormValues, setAccountFormValues] = useState({});
  const [formValues, setFormValues] = useState({});

  const [type, setType] = useState(0);

  const actionRef = useRef();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'AccountId',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '手机号码',
      dataIndex: 'Mobile',
    },
    {
      title: '昵称',
      dataIndex: 'NickName',
      order: 1,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setFormValues(record);
              handleUpdateModalVisible(true);
            }}
          >
            {record.NickName}{' '}
          </a>
        </>
      ),
    },
    {
      title: '头像',
      dataIndex: 'HeadUrlShow',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <img style={{ width: '50px', height: '50px' }} src={record.HeadUrlShow} alt="" />
        </>
      ),
    },
    {
      title: '性别',
      dataIndex: 'Sex',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <span>{record.Sex === 1 ? '男' : '女'}</span>
        </>
      ),
    },
    {
      title: '出生日期',
      dataIndex: 'BirthDay',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '分享码',
      dataIndex: 'RecommandCode',
    },
    {
      title: '推荐人',
      dataIndex: 'ReferNickName',
      render: (_, record) => (
        <>
          <span>{`${record.ReferNickName}(${record.ReferRecommandCode})`}</span>
        </>
      ),
    },

    {
      title: '是否有效',
      dataIndex: 'Status',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            defaultChecked={record.Status === 1 ? true : false}
            onChange={(state) => {
              handleUpdateAccountStatus(state, record);
            }}
          />
        </>
      ),
    },

    {
      title: '交易类型',
      dataIndex: 'ForbidStatus',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Select
            defaultValue={record.ForbidStatus}
            style={{ width: '100px' }}
            onChange={(value) => handleChangeDealType(record, value)}
          >
            <Select.Option value={0}>正常交易</Select.Option>
            <Select.Option value={1}>禁止买入</Select.Option>
            <Select.Option value={2}>禁止卖出</Select.Option>
            <Select.Option value={3}>禁止交易</Select.Option>
          </Select>
        </>
      ),
    },
    {
      title: '保证金余额',
      dataIndex: 'Deposit',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setAccountFormValues(record);
              handleModifyWalletModalVisible(true);
            }}
          >
            {(record.Deposit / 10000).toFixed(3)}
          </a>
        </>
      ),
    },
    {
      title: '钱包状态',
      dataIndex: 'WalletStatus',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            defaultChecked={record.WalletStatus === 1 ? true : false}
            onChange={(state) => {
              handleUpdateAccountWalletStatus(state, record);
            }}
          />
        </>
      ),
    },
    {
      title: '银行卡数量',
      dataIndex: 'BankCardCount',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              history.push({
                pathname: '/user/account/list/bankcard',
                query: {
                  AccountId: record.AccountId,
                },
              });
            }}
          >
            {record.BankCardCount}
          </a>
        </>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      valueType: 'dateTimeRange',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setAccountFormValues(record);
              setType(0);
              handleModifyPwdModalVisible(true);
            }}
          >
            修改登录密码
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setAccountFormValues(record);
              setType(1);
              handleModifyPwdModalVisible(true);
            }}
          >
            修改交易密码
          </a>
          {/* <Divider type="vertical" />
          <a href="">余额变更日志</a>
          <Divider type="vertical" />
          <a href="">操作日志</a>
          <Divider type="vertical" />
          <a href="">消息</a> */}
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable
        headerTitle={false}
        actionRef={actionRef}
        rowKey="AccountId"
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
        request={(params, sorter, filter) =>
          queryAccountList({ ...params, sorter, filter }).then((res) => {
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

      <UpdateAccountForm
        handleUpdateAccount={async (value) => {
          const success = await handleUpdateAccount(value);
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

      <UpdatePwdForm
        onCancel={() => handleModifyPwdModalVisible(false)}
        modalVisible={modifyPwdModalVisible}
        values={accountFormValues}
        type={type}
        handleUpdatePwd={async (values) => {
          const success = await handleUpdatePwd(type, values);
          if (success) {
            handleModifyPwdModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <UpdateWalletForm
        onCancel={() => handleModifyWalletModalVisible(false)}
        modalVisible={modifyWalletModalVisible}
        values={accountFormValues}
        handleUpdateWallet={async (values) => {
          const success = await handleUpdateWallet(values);
          if (success) {
            handleModifyWalletModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
    </>
  );
};

export default TableList;
