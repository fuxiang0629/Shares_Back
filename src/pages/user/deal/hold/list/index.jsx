import { money_unit } from '@/utils/config';
import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import { queryAccountHoldList, updateStockSell } from '../service';
import { useParams } from 'umi';
import SellForm from '../components/SellForm';

/**
 * 卖出
 * @param {*} values
 */

const handleUpdateSell = async (values) => {
  console.log(values);
  const hide = message.loading('正在更新');
  try {
    await updateStockSell({
      ...values,
      SellPrice: values.SellPrice * money_unit,
      HoldId: values.Id,
    });
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
  const queryParams = useParams();
  console.log(queryParams);

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
          <span>{record.Market === 0 ? '深圳' : record.Market === 1 ? '上海' : '未知'}</span>
        </>
      ),
    },
    {
      title: '股票代码',
      dataIndex: 'SharesCode',
    },
    {
      title: '股票名称',
      dataIndex: 'SharesName',
    },
    {
      title: '持仓数',
      dataIndex: 'RemainCount',
    },
    {
      title: '可卖数量',
      dataIndex: 'CanSoldCount',
    },
    {
      title: '市值',
      dataIndex: 'MarketValue',
      hideInForm: true,
      hideInSearch: true,
      renderText: (val) => `${val / money_unit} 元`,
    },
    {
      title: '成本价',
      dataIndex: 'CostPrice',
      hideInForm: true,
      hideInSearch: true,
      renderText: (val) => `${val / money_unit} 元`,
    },
    {
      title: '盈亏数额',
      dataIndex: 'ProfitAmount',
      hideInForm: true,
      hideInSearch: true,
      renderText: (val) => `${val / money_unit} 元`,
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
              setFormValues(record);
            }}
          >
            卖出
          </a>
        </>
      ),
    },
  ];
  return (
    <>
      <ProTable
        search={false}
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
          queryAccountHoldList({ ...params, sorter, filter, Id: queryParams.id }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />

      <SellForm
        handleUpdate={async (value) => {
          const success = await handleUpdateSell(value);
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
