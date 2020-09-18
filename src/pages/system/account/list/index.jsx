import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Switch, Menu, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {
  queryBrokerAccountList,
  addBrokerAccount,
  removeBrokerAccount,
  updateBrokerAccount,
  updateBrokerAccountStatus,
} from './service';

/**
 * 添加券商账户
 * @param fields
 */

const handleAdd = async (fields) => {
  console.log(fields);
  const hide = message.loading('正在添加');
  try {
    await addBrokerAccount({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新券商账户
 * @param fields
 */

const handleUpdate = async (fields) => {
  console.log(fields);
  const hide = message.loading('正在更新');
  try {
    await updateBrokerAccount({ ...fields });
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
  await updateBrokerAccountStatus({
    Id: row.Id,
    Status: state ? 1 : 2,
  });
};

/**
 * 删除券商账户
 * @param {*} row
 */
const handleRemove = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeBrokerAccount({ Id: row.Id });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
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
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '账户Code',
      dataIndex: 'AccountCode',
      hideInSearch: true,
    },
    {
      title: '账号类型',
      dataIndex: 'AccountType',
      hideInSearch: true,
    },
    {
      title: '账户号',
      dataIndex: 'AccountNo',
    },
    {
      title: '深市资金账户',
      dataIndex: 'TradeAccountNo0',
      hideInSearch: true,
    },
    {
      title: '沪市资金账户',
      dataIndex: 'TradeAccountNo1',
      hideInSearch: true,
    },
    {
      title: '交易密码',
      dataIndex: 'JyPassword',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '通讯密码',
      dataIndex: 'TxPassword',
      hideInSearch: true,
    },
    {
      title: '券商code',
      dataIndex: 'BrokerCode',
      hideInSearch: true,
    },
    {
      title: '券商名称',
      dataIndex: 'BrokerName',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '营业部code',
      dataIndex: 'DepartmentCode',
      hideInSearch: true,
    },
    {
      title: '营业部名称',
      dataIndex: 'DepartmentName',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '服务器Id',
      dataIndex: 'ServerId',
      hideInSearch: true,
    },

    {
      title: '是否有效',
      dataIndex: 'Status',
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
      fixed: 'right',
      render: (_, record) => (
        <>
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
          queryBrokerAccountList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        handleAdd={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <UpdateForm
        handleUpdate={async (value) => {
          const success = await handleUpdate(value);
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
        updateModalVisible={updateModalVisible}
        values={formValues}
      />
    </>
  );
};

export default TableList;
