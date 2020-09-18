import { PlusOutlined,ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import CreateServiceForm from './components/CreateServiceForm';
import UpdateServiceDetailForm from './components/UpdateServiceDetailForm';
import UpdateServiceForm from './components/UpdateServiceForm';
import {
  addServiceConfig,
  queryServiceList,
  removeServiceConfig,
  updateServiceConfig,
  updateServiceConfigDetail,
  updateServiceConfigStatus,
} from './service';

/**
 * 添加客服配置
 * @param values
 */
const handleAddServiceConfig = async (values) => {
  const hide = message.loading('正在添加');
  try {
    await addServiceConfig({ ...values });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新客服配置
 * @param fields
 */
const handleUpdateServiceConfig = async (values) => {
  const hide = message.loading('正在更新');
  try {
    await updateServiceConfig({ ...values });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新客服详情
 * @param {*} values
 */
const handleUpdateServiceConfigDetail = async (values) => {
  console.log(values);
  const hide = message.loading('正在更新');
  try {
    await updateServiceConfigDetail({ ...values });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除客服配置
 * @param selectedRows
 */
const handleRemoveServiceConfig = async (row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeServiceConfig({ Id: row.Id });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 客服配置状态
 * @param {*} state
 * @param {*} row
 */
const handleUpdateServiceConfigStatus = async (state, row) => {
  await updateServiceConfigStatus({
    Id: row.Id,
    Status: state ? 1 : 2,
  });
};

const TableList = () => {
  const [createServiceConfigModalVisible, handleServiceConfigModalVisible] = useState(false);
  const [updateServiceConfigModalVisible, handleUpdateServiceConfigModalVisible] = useState(false);
  const [
    updateServiceConfigDetailModalVisible,
    handleUpdateServiceConfigDetailModalVisible,
  ] = useState(false);

  const [serviceConfigFormValues, setServiceConfigFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '页面code',
      dataIndex: 'PageCode',
      rules: [
        {
          required: true,
          message: '页面code为必填项',
        },
      ],
    },
    {
      title: '页面名称',
      dataIndex: 'PageName',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '页面名称为必填项',
        },
      ],
    },
    {
      title: '图标',
      dataIndex: 'ImgUrlShow',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <img style={{ width: '50px', height: '50px' }} src={record.ImgUrlShow} alt="" />
        </>
      ),
    },
    {
      title: '微信号',
      dataIndex: 'WechatNumber',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '手机号码',
      dataIndex: 'Mobile',
      hideInSearch: true,
      hideInForm: true,
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
              handleUpdateServiceConfigStatus(state, record);
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
              handleUpdateServiceConfigDetailModalVisible(true);
              setServiceConfigFormValues(record);
            }}
          >
            客服详情
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateServiceConfigModalVisible(true);
              setServiceConfigFormValues(record);
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
              const success = await handleRemoveServiceConfig(record);
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
          <Button type="primary" onClick={() => handleServiceConfigModalVisible(true)}>
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
          queryServiceList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />
      <CreateServiceForm
        onCancel={() => handleServiceConfigModalVisible(false)}
        modalVisible={createServiceConfigModalVisible}
      >
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAddServiceConfig(value);

            if (success) {
              handleServiceConfigModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="Id"
          type="form"
          columns={columns}
        />
      </CreateServiceForm>

      <UpdateServiceForm
        handleUpdateServiceConfig={async (value) => {
          const success = await handleUpdateServiceConfig(value);
          if (success) {
            handleUpdateServiceConfigModalVisible(false);
            setServiceConfigFormValues({});

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateServiceConfigModalVisible(false);
          setServiceConfigFormValues({});
        }}
        modalVisible={updateServiceConfigModalVisible}
        values={serviceConfigFormValues}
      />

      <UpdateServiceDetailForm
        handleUpdateServiceConfigDetail={async (value) => {
          const success = await handleUpdateServiceConfigDetail(value);
          if (success) {
            handleUpdateServiceConfigDetailModalVisible(false);
            setServiceConfigFormValues({});

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateServiceConfigDetailModalVisible(false);
          setServiceConfigFormValues({});
        }}
        modalVisible={updateServiceConfigDetailModalVisible}
        values={serviceConfigFormValues}
      />
    </>
  );
};

export default TableList;
