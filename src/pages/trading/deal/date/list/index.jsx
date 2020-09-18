import { getPageQuery } from '@/utils/utils';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import moment from 'moment';
import {
  queryForbidDateList,
  addForbidDate,
  updateForbidDateStatus,
  removeForbidDate,
  updateForbidDate,
} from './service';
const queryParams = getPageQuery();

/**
 * 添加禁止日期
 * @param fields
 */

const handleAdd = async (values) => {
  const hide = message.loading('正在添加');
  const BeginDate = moment(values.BeginDate._d).format('YYYY-MM-DD');
  const EndDate = moment(values.EndDate._d).format('YYYY-MM-DD');
  try {
    await addForbidDate({ BeginDate, EndDate, GroupId: queryParams.Id });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 编辑禁止日期
 * @param values
 */

const handleUpdate = async (values) => {
  const hide = message.loading('正在更新');
  const BeginDate = moment(values.BeginDate._d).format('YYYY-MM-DD');
  const EndDate = moment(values.EndDate._d).format('YYYY-MM-DD');
  console.log(values)
  try {
    await updateForbidDate({ ...values, BeginDate, EndDate });
    hide();
    message.success('更新成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 删除禁止日期
 * @param row
 */

const handleRemove = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeForbidDate({
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
 * 修改禁止日期分组状态
 * @param {*} row
 */
const handleUpdateStatus = async (state, row) => {
  await updateForbidDateStatus({
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
      title: '起始时间',
      dataIndex: 'BeginDate',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '截止时间',
      dataIndex: 'EndDate',
      hideInForm: true,
      hideInSearch: true,
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
          queryForbidDateList({ ...params, sorter, filter, ...queryParams }).then((res) => {
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
