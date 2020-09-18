import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Popconfirm, message, Switch } from 'antd';
import React, { useState, useRef } from 'react';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {
  queryBrokerList,
  addBroker,
  removeBroker,
  updateBroker,
  updateBrokerStatus,
} from './service';

/**
 * 添加券商
 * @param fields
 */

const handleAdd = async (fields) => {
  console.log(fields);
  const hide = message.loading('正在添加');
  try {
    await addBroker({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新券商
 * @param {*} values
 */
const handleUpdate = async (values) => {
  console.log(values);
  const hide = message.loading('正在更新');
  try {
    await updateBroker({ ...values });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 删除券商
 * @param {*} row
 */
const handleRemove = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeBroker({ Id: row.Id });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 修改券商状态
 * @param {*} state row
 */
const handleUpdateBrokerStatus = async (state, row) => {
  await updateBrokerStatus({
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
      title: '券商Code',
      dataIndex: 'BrokerCode',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '券商Code为必填项',
        },
      ],
    },
    {
      title: '券商名称',
      dataIndex: 'BrokerName',
    },
    {
      title: '客户端版本',
      dataIndex: 'Version',
      hideInSearch: true,
    },
    {
      title: '是否有效',
      dataIndex: 'Status',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => (
        <>
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            defaultChecked={record.Status === 1 ? true : false}
            onChange={(state) => {
              handleUpdateBrokerStatus(state, record);
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
              setFormValues(record);
              handleUpdateModalVisible(true);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              history.push({
                pathname: '/system/account/dealer/sd',
                query: {
                  BrokerCode: record.BrokerCode,
                },
              });
            }}
          >
            营业部列表
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              history.push({
                pathname: '/system/account/dealer/server',
                query: {
                  BrokerCode: record.BrokerCode,
                },
              });
            }}
          >
            交易服务器列表
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
          queryBrokerList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="Id"
          type="form"
          columns={columns}
        />
      </CreateForm>
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
