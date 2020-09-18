import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateRealNameForm from './components/UpdateRealNameForm';
import { queryAccountRealNameList, updateRealNameInfo } from './service';

/**
 * 更新实名认证信息
 * @param {*} values
 */

const handleUpdateRealName = async (values) => {
  console.log(values);
  const hide = message.loading('正在更新');
  try {
    await updateRealNameInfo({ ...values });
    hide();
    message.success('更新成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'AccountId',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '账户名',
      dataIndex: 'AccountMobile',
      order: 1,
      render: (_, record) => (
        <>
          <span>{`${record.AccountMobile}(${record.AccountName})`}</span>
        </>
      ),
    },
    {
      title: '认证信息',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setFormValues(record);
            }}
          >
            查看信息
          </a>
        </>
      ),
    },
    {
      title: '状态',
      dataIndex: 'ExamineStatus',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '全部',
        },
        1: {
          text: '审核中',
        },
        2: {
          text: '审核成功',
        },
        3: {
          text: '审核失败',
        },
      },
    },
    {
      title: '申请时间',
      dataIndex: 'CreateTime',
      valueType: 'dateTimeRange',
    },
    {
      title: '通过时间',
      dataIndex: 'ExamineFinishTime',
      valueType: 'dateTimeRange',
      hideInSearch: true,
      hideInForm: true,
    },
  ];

  return (
    <>
      <ProTable
        headerTitle={false}
        actionRef={actionRef}
        rowKey="AccountId"
        search={{
          collapsed: false,
          collapseRender: false,
        }}
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
        request={(params, sorter, filter) =>
          queryAccountRealNameList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
          density: false,
        }}
      />

      <UpdateRealNameForm
        handleUpdateRealName={async (value) => {
          const success = await handleUpdateRealName(value);
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
        modalVisible={updateModalVisible}
        values={formValues}
      />
    </>
  );
};

export default TableList;
