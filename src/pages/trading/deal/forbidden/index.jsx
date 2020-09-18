import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {
  queryForbidStockList,
  addForbidStock,
  updateForbidStock,
  removeForbidStock,
} from './service';

/**
 * 添加禁止股票名单
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addForbidStock({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 编辑禁止股票名单
 * @param values
 */

const handleUpdate = async (values) => {
  const hide = message.loading('正在更新');

  try {
    await updateForbidStock({ ...values });
    hide();
    message.success('更新成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除禁止股票名单
 * @param row
 */

const handleRemove = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeForbidStock({ Id: row.Id });
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
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '限制关键字',
      dataIndex: 'LimitKey',
      rules: [
        {
          required: true,
          message: '限制关键字为必填项',
        },
      ],
    },
    {
      title: '限制类型',
      dataIndex: 'LimitType',
      valueEnum: {
        0: {
          text: '全部',
        },
        1: {
          text: '股票名称',
        },
        2: {
          text: '股票代码',
        },
      },
      renderText: (val) => `股票${val === 1 ? '代码' : '名称'}`,
    },
    {
      title: '限制市场代码',
      dataIndex: 'LimitMarket',
      valueEnum: {
        '-2': {
          text: '全部',
        },
        '-1': {
          text: '深圳,上海',
        },
        '0': {
          text: '深圳',
        },
        '1': {
          text: '上海',
        },
      },
    },
    {
      title: '禁止类型',
      dataIndex: 'ForbidType',
      valueEnum: {
        0: {
          text: '全部',
        },
        1: {
          text: '禁止买入',
        },
        2: {
          text: '禁止卖出',
        },
        3: {
          text: '禁止交易',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      valueType: 'dateTimeRange',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setFormValues(record);
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
          queryForbidStockList({ ...params, sorter, filter }).then((res) => {
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
