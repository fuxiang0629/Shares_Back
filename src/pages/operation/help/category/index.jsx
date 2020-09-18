import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Tooltip, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import CreateCategoryFrom from './components/CreateCategoryFrom';
import UpdateCategoryForm from './components/UpdateCategoryForm';
import {
  queryQuestionCategoryList,
  addQuestionCategory,
  removeQuestionCategory,
  updateQuestionCategory,
} from './service';

/**
 * 添加分类
 * @param values
 */

const handleAddCategory = async (values) => {
  const hide = message.loading('正在添加');
  console.log(values);
  try {
    await addQuestionCategory({ ...values });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新分类信息
 * @param fields
 */

const handleUpdate = async (values) => {
  console.log(values);
  const hide = message.loading('正在更新');
  try {
    await updateQuestionCategory({ ...values });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除分类
 * @param row
 */
const handleRemove = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeQuestionCategory({ Id: row.Id });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList = () => {
  const [createCategoryModalVisible, handleCreateCategoryModalVisible] = useState(false);
  const [updateCategoryModalVisible, handleUpdateCategoryModalVisible] = useState(false);
  const [categoryFormValues, setCategoryFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'Id',
      hideInSearch: true,
    },
    {
      title: '分类名称',
      dataIndex: 'TypeName',
      order: 1,
      rules: [
        {
          required: true,
          message: '分类名称为必填项',
        },
      ],
    },
    {
      title: '分类图标',
      dataIndex: 'IconUrlShow',
      hideInSearch: true,
      render: (_, record) => (
        <>
          <img
            style={{ width: '50px', height: '50px', borderRadius: '50px' }}
            src={record.IconUrlShow}
            alt=""
          />
        </>
      ),
    },

    {
      title: '排序',
      dataIndex: 'OrderIndex',
      hideInSearch: true,
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
              handleUpdateCategoryModalVisible(true);
              setCategoryFormValues(record);
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
          <Button type="primary" onClick={() => handleCreateCategoryModalVisible(true)}>
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
          queryQuestionCategoryList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />

      <CreateCategoryFrom
        onCancel={() => handleCreateCategoryModalVisible(false)}
        modalVisible={createCategoryModalVisible}
        handleAddCategory={async (values) => {
          const success = await handleAddCategory(values);
          if (success) {
            handleCreateCategoryModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <UpdateCategoryForm
        onCancel={() => handleUpdateCategoryModalVisible(false)}
        modalVisible={updateCategoryModalVisible}
        values={categoryFormValues}
        handleUpdate={async (values) => {
          const success = await handleUpdate(values);
          if (success) {
            handleUpdateCategoryModalVisible(false);
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
