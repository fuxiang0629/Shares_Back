import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import CreateRoleForm from './components/CreateRoleForm';
import UpdateRoleFrom from './components/UpdateRoleFrom';
import { addRole, queryRoleList, removeRole, updataRole, updateRoleStatus } from './service';


/**
 * 添加角色
 * @param values
 */
const handleAddRole = async (values) => {
  console.log(values);
  const hide = message.loading('正在添加');
  try {
    await addRole({ ...values });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新角色状态
 * @param {*} row
 */
const handleUpdateRoleStatus = async (state, row) => {
  await updateRoleStatus({
    Id: row.RoleId,
    Status: state ? 1 : 2,
  });
};

/**
 * 更新角色信息
 * @param fields
 */

const handleUpdate = async (values) => {
  console.log('更新角色信息');
  console.log(values);

  const hide = message.loading('正在更新');
  try {
    await updataRole({ ...values });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除角色
 * @param row
 */
const handleRemove = async (row) => {
  console.log(row);
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeRole({ Id: row.RoleId });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList = () => {
  const [createRoleModalVisible, handleRoleModalVisible] = useState(false);

  const [updateRoleModalVisible, handleUpdateRoleModalVisible] = useState(false);

  const [roleFormValues, setRoleFormValues] = useState({});

  const actionRef = useRef();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'RoleId',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '角色名称',
      dataIndex: 'RoleName',
      rules: [
        {
          required: true,
          message: '角色名称为必填项',
        },
      ],
    },

    {
      title: '角色描述',
      dataIndex: 'RoleDescription',
      hideInSearch: true,
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'Status',
      hideInSearch: true,
      hideInForm: true,
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
              handleUpdateRoleStatus(state, record);
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
              history.push({
                pathname: '/admin/account/role/list',
                query: {
                  Id: record.RoleId,
                },
              });
            }}
          >
            权限列表
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateRoleModalVisible(true);
              setRoleFormValues(record);
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
        rowKey="RoleId"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleRoleModalVisible(true)}>
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
          queryRoleList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />

      <CreateRoleForm
        onCancel={() => handleRoleModalVisible(false)}
        modalVisible={createRoleModalVisible}
      >
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAddRole(value);
            if (success) {
              handleRoleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="RoleId"
          type="form"
          columns={columns}
        />
      </CreateRoleForm>

      <UpdateRoleFrom
        onCancel={() => handleUpdateRoleModalVisible(false)}
        modalVisible={updateRoleModalVisible}
        values={roleFormValues}
        handleUpdate={async (values) => {
          const success = await handleUpdate(values);
          if (success) {
            handleUpdateRoleModalVisible(false);
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
