import { getPageQuery } from '@/utils/utils';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {
  addBrokerServer, queryBrokerServerList,

  removeBrokerServer,
  updateBrokerServer,
  updateBrokerServerStatus
} from './service';
const queryParams = getPageQuery();

/**
 * 添加券商交易服务器
 * @param fields
 */

const handleAdd = async (fields) => {
  console.log(fields);
  const hide = message.loading('正在添加');
  try {
    await addBrokerServer({ ...fields, ...queryParams });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新券商交易服务器
 * @param {*} values
 */
const handleUpdate = async (values) => {
  console.log(values);
  const hide = message.loading('正在更新');
  try {
    await updateBrokerServer({ ...values });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 删除券商交易服务器
 * @param {*} row
 */
const handleRemove = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeBrokerServer({ Id: row.Id });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 修改券商交易服务器状态
 * @param {*} state row
 */
const handleUpdateBrokerSdStatus = async (state, row) => {
  await updateBrokerServerStatus({
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
      title: 'IP地址',
      dataIndex: 'Ip',
      rules: [
        {
          required: true,
          message: 'ip地址为必填项',
        },
      ],
    },
    {
      title: '端口',
      dataIndex: 'Port',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '端口为必填项',
        },
      ],
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
              handleUpdateBrokerSdStatus(state, record);
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
          queryBrokerServerList({ ...params, sorter, filter, ...queryParams }).then((res) => {
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
