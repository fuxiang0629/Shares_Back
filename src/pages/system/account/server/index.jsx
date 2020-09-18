import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import ShowAccountForm from './components/ShowAccountForm';
import UpdateForm from './components/UpdateForm';
import { addServer, queryServerList, removeServer, updateServer } from './service';



/**
 * 添加服务器
 * @param fields
 */

const handleAdd = async (fields) => {
  console.log(fields);
  const hide = message.loading('正在添加');
  try {
    await addServer({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新服务器
 * @param fields
 */

const handleUpdate = async (fields) => {
  console.log(fields);
  const hide = message.loading('正在更新');
  try {
    await updateServer({ ...fields });
    hide();
    message.success('更新成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 删除服务器
 * @param {*} row
 */
const handleRemove = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeServer({ ServerId: row.ServerId });
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
  const [showModalVisible, handleShowModalVisible] = useState(false);

  const [formValues, setFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: '服务器代号',
      dataIndex: 'ServerId',
      rules: [
        {
          required: true,
          message: '服务器代号为必填项',
        },
      ],
    },
    {
      title: '描述',
      dataIndex: 'ServerDes',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '账号数量',
      dataIndex: 'AccountCount',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setFormValues(record);
              handleShowModalVisible(true);
            }}
          >
            {record.AccountCount}
          </a>
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
            collapseRender:false
          }}
  
  
          options={{
            fullScreen: false,
            reload: false,
            setting: false,
            density: false,
          }}
  
  headerTitle={false}
        actionRef={actionRef}
        rowKey="ServerId"
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
          queryServerList({ ...params, sorter, filter }).then((res) => {
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
          rowKey="ServerId"
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

      <ShowAccountForm
        modalVisible={showModalVisible}
        values={formValues}
        onCancel={() => handleShowModalVisible(false)}
      />
    </>
  );
};

export default TableList;
