import { getPageQuery } from '@/utils/utils';
import { money_unit } from '@/utils/config';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Switch, Menu, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { history } from 'umi';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { getBrokerAccountPositionInfo, updateBrokerAccountPosition } from './service';
const queryParams = getPageQuery();

/**
 * 同步账户数据
 * @param fields
 */

const handleUpdateBrokerAccountPosition = async (fields) => {
  try {
    await updateBrokerAccountPosition({ ...fields });
    return true;
  } catch (error) {
    return false;
  }
};

const TableList = () => {
  const actionRef = useRef();
  const [positionInfo, setPositionInfo] = useState([]);
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      hideInSearch: true,
    },
    {
      title: '市场',
      dataIndex: 'Market',
      hideInSearch: true,
      renderText: (val) => `${val == 0 ? '深证' : '上海'}`,
    },
    {
      title: '股票代码',
      dataIndex: 'SharesCode',
      hideInSearch: true,
    },
    {
      title: '股票名称',
      dataIndex: 'SharesName',
      hideInSearch: true,
    },
    {
      title: '持仓数量',
      dataIndex: 'TotalSharesCount',
      hideInSearch: true,
    },
    {
      title: '可卖数量',
      dataIndex: 'CanSoldSharesCount',
      hideInSearch: true,
    },
    {
      title: '成本价',
      dataIndex: 'CostPrice',
      hideInSearch: true,
      renderText: (val) => `${val / money_unit}`,
    },
    {
      title: '今买数量',
      dataIndex: 'BuyCountToday',
      hideInSearch: true,
    },
    {
      title: '今卖数量',
      dataIndex: 'SellCountToday',
      hideInSearch: true,
    },
    {
      title: '市值',
      dataIndex: 'MarketValue',
      hideInSearch: true,
      renderText: (val) => `${val / money_unit}`,
    },
    {
      title: '盈亏',
      dataIndex: 'ProfitValue',
      hideInSearch: true,
      renderText: (val) => `${val / money_unit}`,
    },
    {
      title: '盈亏比例',
      dataIndex: 'ProfitRate',
      hideInSearch: true,
      renderText: (val) => `${val / 1000}`,
    },
    {
      title: '最后更新时间',
      dataIndex: 'LastModified',
      valueType: 'dateTime',
      hideInSearch: true,
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
        toolBarRender={() => [
          <div>
            <span style={{ 'margin-right': '30px' }}>
              余额：{positionInfo.TotalBalance / money_unit}
            </span>
            <span style={{ 'margin-right': '30px' }}>
              可用：{positionInfo.AvailableBalance / money_unit}
            </span>
            <span style={{ 'margin-right': '30px' }}>
              冻结：{positionInfo.FreezeBalance / money_unit}
            </span>
            <span style={{ 'margin-right': '30px' }}>
              可取：{positionInfo.WithdrawBalance / money_unit}
            </span>
            <span style={{ 'margin-right': '30px' }}>
              总资产：{positionInfo.TotalValue / money_unit}
            </span>
            <span style={{ 'margin-right': '30px' }}>
              市值：{positionInfo.MarketValue / money_unit}
            </span>
          </div>,
          <Button
            type="primary"
            onClick={() => {
              if (positionInfo.SynchronizationStatus == 1) {
                return false;
              }
              handleUpdateBrokerAccountPosition({ TradeAccountCode: queryParams.AccountCode });
              if (actionRef.current) {
                actionRef.current.reload().then(() => {
                  console.log(8888888888);
                });
              }
              var timer = setInterval(() => {
                if (positionInfo.SynchronizationStatus == 0) {
                  clearInterval(timer);
                } else if (actionRef.current) {
                  actionRef.current.reload();
                }
              }, 2000);
            }}
          >
            {positionInfo.SynchronizationStatus == 1 ? '同步中...' : '同步'}
          </Button>,
        ]}
        rowKey="Id"
        request={(params, sorter, filter) =>
          getBrokerAccountPositionInfo({
            ...params,
            sorter,
            filter,
            queryParams,
          }).then((res) => {
            console.log(9999999999);
            setPositionInfo(res.Data);
            const result = {
              data: res.Data.PositionList.List,
              total: res.Data.PositionList.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />
    </>
  );
};

export default TableList;
