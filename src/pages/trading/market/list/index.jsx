import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Select, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import {
  queryStockList,
  updateStockForbidStatus,
  updateStockStatus,
  updateStockSuspensionStatus,
} from './service';

import UploadSuspensionForm from './components/UploadSuspensionForm';

/**
 * 更新股票状态
 * @param {*} row
 */
const handleUpdateStockStatus = async (state, row) => {
  await updateStockStatus({
    Id: row.Id,
    Status: state ? 1 : 2,
  });
};

/**
 * 修改股票停牌状态
 * @param {*} state
 * @param {*} row
 */
const handleUpdateStockSuspensionStatus = async (state, row) => {
  await updateStockSuspensionStatus({
    Id: row.Id,
    IsSuspension: state,
  });
};

/**
 * 修改交易类型
 * @param {*} value
 */
const handleChangeDealType = async (record, value) => {
  console.log('修改交易类型');
  console.log(value);
  console.log(record);
  await updateStockForbidStatus({
    Id: record.Id,
    ForbidStatus: value,
  });
};

const TableList = () => {
  const [UploadModalVisible, handleUploadModalVisible] = useState(false);

  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '市场代码',
      dataIndex: 'Market',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <span>{record.Market === 0 ? '深圳' : '上海'}</span>
        </>
      ),
    },
    {
      title: '股票代码',
      dataIndex: 'SharesCode',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '股票名称',
      dataIndex: 'SharesName',
      hideInForm: true,
    },
    {
      title: '上市时间',
      dataIndex: 'MarketTime',
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
              handleUpdateStockStatus(state, record);
            }}
          />
        </>
      ),
    },

    {
      title: '交易状态',
      dataIndex: 'ForbidStatus',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Select
            defaultValue={record.ForbidStatus}
            style={{ width: '100px' }}
            onChange={(value) => handleChangeDealType(record, value)}
          >
            <Select.Option value={0}>正常交易</Select.Option>
            <Select.Option value={1}>禁止买入</Select.Option>
            <Select.Option value={2}>禁止卖出</Select.Option>
            <Select.Option value={3}>禁止交易</Select.Option>
          </Select>
        </>
      ),
    },
    {
      title: '现价',
      dataIndex: 'SharesQuotes',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <span>{record.SharesQuotes ? record.SharesQuotes.PresentPrice : '-'}</span>
        </>
      ),
    },
    {
      title: '昨日收盘价',
      dataIndex: 'SharesQuotes',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <span>{record.SharesQuotes ? record.SharesQuotes.ClosedPrice : '-'}</span>
        </>
      ),
    },
    {
      title: '开盘价',
      dataIndex: 'SharesQuotes',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <span>{record.SharesQuotes ? record.SharesQuotes.OpenedPrice : '-'}</span>
        </>
      ),
    },
    {
      title: '最高价',
      dataIndex: 'SharesQuotes',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <span>{record.SharesQuotes ? record.SharesQuotes.MaxPrice : '-'}</span>
        </>
      ),
    },
    {
      title: '最低价',
      dataIndex: 'SharesQuotes',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <span>{record.SharesQuotes ? record.SharesQuotes.MinPrice : '-'}</span>
        </>
      ),
    },
    {
      title: '涨幅',
      dataIndex: 'SharesQuotes',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <span>{record.SharesQuotes ? record.SharesQuotes.Rise + '%' : '-'}</span>
        </>
      ),
    },
    {
      title: '总量',
      dataIndex: 'SharesQuotes',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <span>{record.SharesQuotes ? record.SharesQuotes.TotalCount : '-'}</span>
        </>
      ),
    },
    {
      title: '现价',
      dataIndex: 'SharesQuotes',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <span>{record.SharesQuotes ? record.SharesQuotes.PresentCount : '-'}</span>
        </>
      ),
    },
    {
      title: '总金额',
      dataIndex: 'SharesQuotes',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <span>{record.SharesQuotes ? record.SharesQuotes.TotalAmount : '-'}</span>
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
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              handleUploadModalVisible(true);
            }}
          >
            <PlusOutlined /> 导入上市时间数据
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
        actionRef={actionRef}
        rowKey="Id"
        request={(params, sorter, filter) =>
          queryStockList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />

      <UploadSuspensionForm
        modalVisible={UploadModalVisible}
        onCancel={() => handleUploadModalVisible(false)}
        handleRefresh={() => {
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
      />
    </>
  );
};

export default TableList;
