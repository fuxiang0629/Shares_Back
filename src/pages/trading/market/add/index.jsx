import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import {
  addTodayMarketStock,
  queryTodayMarketStockList,
  removeTodayMarketStock,
  updateTodayMarketStockStatus,
} from './service';

/**
 * 添加
 * @param {*} values
 */
const handleAdd = async (values) => {
  const hide = message.loading('正在添加');
  try {
    await addTodayMarketStock({ ...values });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除
 * @param row
 */
const handleRemove = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeTodayMarketStock({ Id: row.Id });
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
const handleUpdateStatus = async (state, row) => {
  await updateTodayMarketStockStatus({
    Id: row.Id,
    Status: state ? 1 : 2,
  });
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '市场代码',
      dataIndex: 'Market',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '市场代码为必填项',
        },
      ],
      valueEnum: {
        0: {
          text: '深圳',
        },
        1: {
          text: '上海',
        },
      },
      render: (_, record) => (
        <>
          <span>{record.Market === 0 ? '深圳' : '上海'}</span>
        </>
      ),
    },
    {
      title: '股票代码',
      dataIndex: 'SharesCode',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '股票代码为必填项',
        },
      ],
    },
    {
      title: '股票名称',
      dataIndex: 'SharesName',
      hideInForm: true,
    },
    {
      title: '排序值',
      dataIndex: 'OrderIndex',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '排序值为必填项',
        },
      ],
    },
    {
      title: '状态',
      dataIndex: 'Status',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            defaultChecked={record.Status === 1 ? true : false}
            onChange={(state) => {
              handleUpdateStatus(state, record);
            }}
          />
        </>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
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
          queryTodayMarketStockList({ ...params, sorter, filter }).then((res) => {
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
    </>
  );
};

export default TableList;
