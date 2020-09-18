import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Switch, Popconfirm, message } from 'antd';
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { getPageQuery } from '@/utils/utils';
const queryParams = getPageQuery();
import {
  queryDealRuleLiquidationList,
  addDealRuleLiquidation,
  updateDealRuleLiquidation,
  updateDealRuleLiquidationStatus,
  removeDealRuleLiquidation,
} from './service';

/**
 * 添加平仓线
 * @param values
 */
const handleAdd = async (values) => {
  const hide = message.loading('正在添加');
  try {
    await addDealRuleLiquidation({ ...values, RulesId: queryParams.Id });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新平仓线
 * @param values
 */

const handleUpdate = async (values) => {
  const hide = message.loading('正在更新');
  try {
    await updateDealRuleLiquidation({ ...values });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除交易规则额外平仓线
 * @param row
 */

const handleRemove = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;

  try {
    await removeDealRuleLiquidation({
      Id: row.Id,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 修改状态
 * @param {*} row
 */
const handleUpdateStatus = async (state, row) => {
  await updateDealRuleLiquidationStatus({
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
    },
    {
      title: '时间段',
      dataIndex: 'Times',
    },
    {
      title: '警戒线（1/万）',
      dataIndex: 'Cordon',
    },
    {
      title: '平仓线（1/万）',
      dataIndex: 'ClosingLine',
    },
    {
      title: '状态',
      dataIndex: 'Status',
      hideInForm: true,
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
        search={false}
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
          queryDealRuleLiquidationList({ ...params, sorter, filter, ...queryParams }).then(
            (res) => {
              const result = {
                data: res.Data.List,
                total: res.Data.TotalCount,
              };
              return result;
            },
          )
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
