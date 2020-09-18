import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {
  addDepartment,
  queryDepartmentList,
  removeDepartment,
  updateDepartment,
  updateDepartmentStatus
} from './service';


/**
 * 添加部门
 * @param fields
 */
const handleAdd = async (fields) => {
  console.log(fields);
  const hide = message.loading('正在添加');
  try {
    await addDepartment({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新部门
 * @param values
 */
const handleUpdate = async (values) => {
  console.log(values);
  const hide = message.loading('正在更新');
  try {
    await updateDepartment({ ...values });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除部门
 * @param row
 */
const handleRemove = async (row) => {
  console.log(row);
  if (!row) return true;
  const hide = message.loading('正在删除');
  try {
    await removeDepartment({
      Id: row.Id,
    });
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide()
    return false;
  }
};

/**
 * 更新部门状态
 * @param {*} row
 */
const handleUpdateDepartmentStatus = async (state, row) => {
  console.log(state);
  console.log(row);
  await updateDepartmentStatus({
    Id: row.Id,
    Status: state ? 1 : 2,
  });
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});

  const actionRef = useRef();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'Id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '部门名称',
      dataIndex: 'Name',
      rules: [
        {
          required: true,
          message: '部门名称为必填项',
        },
      ],
    },
    {
      title: '部门描述',
      dataIndex: 'Description',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'Status',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => (
        <>
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            defaultChecked={record.Status === 1 ? true : false}
            onChange={(state) => {
              handleUpdateDepartmentStatus(state, record);
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
              handleUpdateModalVisible(true);
              setUpdateFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            style={{ color: '#FF1818' }}
            onClick={() => {
              handleRemove(record).then((res) => {
                if (res) {
                  actionRef.current.reload();
                }
              });
            }}
          >
            删除
          </a>
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
          queryDepartmentList({ ...params, sorter, filter }).then((res) => {
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
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      <UpdateForm
        handleUpdate={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setUpdateFormValues({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setUpdateFormValues({});
        }}
        updateModalVisible={updateModalVisible}
        values={updateFormValues}
      />
    </>
  );
};

export default TableList;
