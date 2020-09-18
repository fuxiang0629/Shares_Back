import { getPageQuery } from '@/utils/utils';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import CreateBannerForm from './components/CreateBannerForm';
import UpdateBannerForm from './components/UpdateBannerForm';
import {
  addBanner, queryBannerList,
  removeBanner, updateBanner,
  updateBannerStatus
} from './service';

const queryParams = getPageQuery();

console.log(queryParams);

/**
 * 添加Banner
 * @param {*} values
 */
const handleAddBanner = async (values) => {
  const hide = message.loading('正在添加');
  try {
    await addBanner({ ...values, GroupId: queryParams.GroupId });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新Banner
 * @param values
 */
const handleUpdateBanner = async (values) => {
  const hide = message.loading('正在更新');
  try {
    await updateBanner({ ...values });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除Banner
 * @param selectedRows
 */
const handleRemove = async (row) => {
  console.log(row);
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeBanner({ Id: row.Id });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新Banner状态
 * @param {*} row
 */
const handleUpdateStatus = async (state, row) => {
  await updateBannerStatus({
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
      title: 'Name',
      dataIndex: 'Name',
      hideInForm: true,
    },
    {
      title: 'Banner图片',
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
      title: '跳转类型',
      dataIndex: 'ActionType',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '无跳转',
        },
        1: {
          text: '跳转外部页面',
        },
        2: {
          text: '跳转本地页面',
        },
      },
    },
    {
      title: '跳转地址',
      dataIndex: 'ActionPath',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '排序',
      dataIndex: 'OrderIndex',
      hideInForm: true,
      hideInSearch: true,
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
          <a
            onClick={() => {
              console.log(record);
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
          queryBannerList({ ...params, sorter, filter, ...queryParams }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />
      <CreateBannerForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        handleAddBanner={async (value) => {
          const success = await handleAddBanner(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <UpdateBannerForm
        handleUpdateBanner={async (value) => {
          const success = await handleUpdateBanner(value);
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
