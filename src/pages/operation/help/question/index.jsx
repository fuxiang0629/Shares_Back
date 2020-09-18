import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm, Switch, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import CreateQuestionForm from './components/CreateQuestionForm';
import UpdateQuestionForm from './components/UpdateQuestionForm';
import UpdateTypeForm from './components/UpdateTypeForm';
import {
  addQuestion, queryQuestionList,
  removeQuestion,
  updateQuestion,
  updateQuestionCategory, updateQuestionIsCommon, updateQuestionIsTop,
  updateQuestionStatus
} from './service';


/**
 * 添加问题
 * @param fields
 */

const handleAdd = async (values) => {
  const hide = message.loading('正在添加');
  try {
    await addQuestion({ ...values });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新问题
 * @param values
 */

const handleUpdate = async (values) => {
  const hide = message.loading('正在更新');
  try {
    await updateQuestion({ ...values });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新问题分类
 * @param {*} values
 */
const handleUpdateType = async (values) => {
  const hide = message.loading('正在更新');
  try {
    await updateQuestionCategory({ QuestionId: values.Id, TypeId: values.type });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除问题
 * @param row
 */
const handleRemove = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeQuestion({ Id: row.Id });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 问题是否置顶
 * @param {*} state
 * @param {*} row
 */
const handleUpdateQuestionIsTop = async (state, row) => {
  await updateQuestionIsTop({
    Id: row.Id,
    IsTop: state,
  });
};

/**
 * 是否常见问题
 * @param {*} state
 * @param {*} row
 */
const handleUpdateQuestionIsCommon = async (state, row) => {
  await updateQuestionIsCommon({
    Id: row.Id,
    IsCommon: state,
  });
};

/**
 * 是否有效
 * @param {*} state
 * @param {*} row
 */
const handleUpdateQuestionStatus = async (state, row) => {
  await updateQuestionStatus({
    Id: row.Id,
    Status: state ? 1 : 2,
  });
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateTypeModalVisible, handleUpdateTypeModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'Id',
      hideInForm: false,
      hideInSearch: true,
    },
    {
      title: '问题名称',
      dataIndex: 'Name',
      rules: [
        {
          required: true,
          message: '问题名称为必填项',
        },
      ],
    },
    {
      title: '问题答案',
      dataIndex: 'Answer',
      valueType: 'textarea',
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Tooltip placement="topLeft" title={record.Answer}>{`${record.Answer.substring(
            0,
            20,
          )}...`}</Tooltip>
        </>
      ),
    },

    {
      title: '所属分类',
      dataIndex: 'Type',
      valueType: 'textarea',
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setFormValues(record);
              handleUpdateTypeModalVisible(true);
            }}
          >
            {record.Type}
          </a>
        </>
      ),
    },

    {
      title: '排序',
      dataIndex: 'OrderIndex',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
    },

    {
      title: '是否常见问题',
      dataIndex: 'IsCommon',
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            defaultChecked={record.IsCommon}
            onChange={(state) => {
              handleUpdateQuestionIsCommon(state, record);
            }}
          />
        </>
      ),
    },
    {
      title: '是否置顶',
      dataIndex: 'IsTop',
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            defaultChecked={record.IsTop}
            onChange={(state) => {
              handleUpdateQuestionIsTop(state, record);
            }}
          />
        </>
      ),
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
              handleUpdateQuestionStatus(state, record);
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
        actionRef={actionRef}
        rowKey="Id"
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
          queryQuestionList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />
      <CreateQuestionForm
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
      <UpdateQuestionForm
        onCancel={() => handleUpdateModalVisible(false)}
        modalVisible={updateModalVisible}
        values={formValues}
        handleUpdate={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
      <UpdateTypeForm
        onCancel={() => handleUpdateTypeModalVisible(false)}
        modalVisible={updateTypeModalVisible}
        values={formValues}
        handleUpdateType={async (value) => {
          const success = await handleUpdateType(value);
          if (success) {
            handleUpdateTypeModalVisible(false);

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
