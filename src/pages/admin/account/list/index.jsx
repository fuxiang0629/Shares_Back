import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';

import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Switch, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import CreateAccountFrom from './components/CreateAccountFrom';
import UpdateAccountFrom from './components/UpdateAccountFrom';
import ModifyPwdFrom from './components/ModifyPwdFrom';
import UpdateRoleFrom from './components/UpdateRoleFrom';
import {
  queryAccountList,
  addAccount,
  updateAccountStatus,
  updateAccountIsAdminStatus,
  removeAdmin,
  updataAccountPwd,
  updataAccount,
} from './service';

import { updateRole } from '../role/service';

import md5 from 'js-md5';

/**
 * 添加账户
 * @param values
 */

const handleAddAccount = async (values) => {
  const hide = message.loading('正在添加');
  try {
    await addAccount({ ...values, Password: md5(values.confirm) });
    hide();
    message.success('添加成功');
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
 * 更新用户是否为超级管理员
 * @param {*} state
 * @param {*} row
 */
const handleUpdateAccountIsAdminStatus = async (state, row) => {
  await updateAccountIsAdminStatus({
    AccountId: row.AccountId,
    IsAdministrator: state,
  });
};

/**
 * 更新用户信息
 * @param fields
 */

const handleUpdate = async (values) => {
  console.log('更新用户信息');
  console.log(values);

  const hide = message.loading('正在更新');
  try {
    await updataAccount({ ...values, Password: md5(values.confirm) });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 修改密码
 * @param {*} values
 */
const handleUpdatePwd = async (values) => {
  const hide = message.loading('正在更新');
  try {
    await updataAccountPwd({
      AccountId: values.AccountId,
      NewPassword: md5(values.confirm),
    });
    hide();
    message.success('更新成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新角色列表
 * @param {*} values
 */
const handleUpdateRole = async (values) => {
  console.log('更新角色列表');
  console.log(values);

  const hide = message.loading('正在更新');
  try {
    await updateRole({
      AccountId: values.AccountId,
      RoleIdList: values.role,
    });
    hide();
    message.success('更新成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除用户
 * @param row
 */
const handleRemove = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeAdmin({ Id: row.AccountId });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList = () => {
  // 添加用户
  const [createAccountModalVisible, handleCreateAccountModalVisible] = useState(false);
  // 编辑用户
  const [updateAccountModalVisible, handleUpdateAccountModalVisible] = useState(false);
  // 修改密码
  const [modifyPwdModalVisible, handleModifyPwdModalVisible] = useState(false);

  // 角色列表
  const [roleModalVisible, handleRoleModalVisible] = useState(false);

  const [accountFormValues, setAccountFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'AccountId',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'UserName',
      rules: [
        {
          required: true,
          message: '用户名为必填项',
        },
      ],
    },
    {
      title: '手机号',
      dataIndex: 'Mobile',
      rules: [
        {
          required: true,
          message: '手机号为必填项',
        },
      ],
    },

    {
      title: '邮箱',
      dataIndex: 'Email',
      hideInSearch: true,
    },
    {
      title: '职位',
      dataIndex: 'PositionName',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'DepartmentName',
      hideInSearch: true,
    },
    {
      title: '账户状态',
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
              handleUpdateAccountStatus(state, record);
            }}
          />
        </>
      ),
    },
    {
      title: '超级管理',
      dataIndex: 'IsAdministrator',
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            defaultChecked={record.IsAdministrator}
            onChange={(state) => {
              handleUpdateAccountIsAdminStatus(state, record);
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
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleRoleModalVisible(true);
              setAccountFormValues(record);
            }}
          >
            角色列表
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateAccountModalVisible(true);
              setAccountFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleModifyPwdModalVisible(true);
              setAccountFormValues(record);
            }}
          >
            修改密码
          </a>

          <Divider type="vertical" />

          <Popconfirm
            title="确认删除这条记录吗？"
            okText="确认"
            cancelText="取消"
            onConfirm={async () => {
              const success = await handleRemove(record);
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
        rowKey="AccountId"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateAccountModalVisible(true)}>
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
          queryAccountList({ ...params, sorter, filter }).then((res) => {
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
        onCancel={() => handleCreateAccountModalVisible(false)}
        modalVisible={createAccountModalVisible}
        handleAddAccount={async (values) => {
          const success = await handleAddAccount(values);
          if (success) {
            handleCreateAccountModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
      <UpdateAccountFrom
        onCancel={() => handleUpdateAccountModalVisible(false)}
        modalVisible={updateAccountModalVisible}
        values={accountFormValues}
        handleUpdate={async (values) => {
          const success = await handleUpdate(values);
          if (success) {
            handleUpdateAccountModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
      <ModifyPwdFrom
        onCancel={() => handleModifyPwdModalVisible(false)}
        modalVisible={modifyPwdModalVisible}
        values={accountFormValues}
        handleUpdatePwd={async (values) => {
          const success = await handleUpdatePwd(values);
          if (success) {
            handleModifyPwdModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <UpdateRoleFrom
        onCancel={() => handleRoleModalVisible(false)}
        modalVisible={roleModalVisible}
        values={accountFormValues}
        handleUpdateRole={async (values) => {
          const success = await handleUpdateRole(values);
          if (success) {
            handleRoleModalVisible(false);
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
