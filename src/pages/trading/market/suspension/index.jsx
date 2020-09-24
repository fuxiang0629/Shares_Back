import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Select, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { getStockSuspensionList, updateStockSuspensionStatus } from './service';

import UploadSuspensionForm from './components/UploadSuspensionForm';

/**
 * 更新停牌配置状态
 * @param {*} row
 */
const handleUpdateStockSuspensionStatus = async (state, row) => {
  await updateStockSuspensionStatus({
    Id: row.Id,
    Status: state ? 1 : 2,
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
    },
    {
      title: '股票名称',
      dataIndex: 'SharesName',
      hideInForm: true,
    },
    {
      title: '停牌起始时间',
      dataIndex: 'SuspensionStartTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '停牌终止时间',
      dataIndex: 'SuspensionEndTime',
      hideInForm: true,
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
            // defaultChecked={record.Status === 1 ? true : false}
            checked={record.Status === 1 ? true : false}
            onChange={(state) => {
              handleUpdateStockSuspensionStatus(state, record);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          />
        </>
      ),
    },
    {
      title: '数据创建时间',
      dataIndex: 'CreateTime',
      hideInForm: true,
      hideInSearch: true,
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
          // <Dropdown.Button onClick={() => handleUploadModalVisible(true)}>
          //   导入停/复牌数据
          // </Dropdown.Button>,

          <Button type="primary" onClick={() => handleUploadModalVisible(true)}>
            <PlusOutlined /> 导入停/复牌数据
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
          getStockSuspensionList({ ...params, sorter, filter }).then((res) => {
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
