import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import { querySystemArgsList, updateSystemArgs } from './service';

/**
 * 更新系统参数
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在更新');
  try {
    await updateSystemArgs({ ...fields });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList = () => {
  const [updateModalVisible, handleModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: '参数名',
      dataIndex: 'ParName',
    },
    {
      title: '参数值',
      dataIndex: 'ParValue',
      hideInSearch: true,
      valueType: 'textarea',
    },
    {
      title: '描述',
      dataIndex: 'ParDescription',
      hideInSearch: true,
      valueType: 'textarea',
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
      fixed: 'right',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setFormValues(record);
              handleModalVisible(true);
            }}
          >
            编辑
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

        toolBarRender={() => [
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
        rowKey="ParName"
        request={(params, sorter, filter) =>
          querySystemArgsList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />
      <UpdateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={updateModalVisible}
        handleUpdate={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        values={formValues}
      />
    </>
  );
};

export default TableList;
