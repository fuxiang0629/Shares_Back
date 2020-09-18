import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, DatePicker, Menu, message, Input, Card } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { money_unit } from '@/utils/config';
import ProTable from '@ant-design/pro-table';
import { queryDealRankList, queryTodayStatistics } from './service';
const { RangePicker } = DatePicker;
const gridStyle = {
  height: 72,
  background: '#FFFFFF',
  borderRadius: 6,
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  marginRight: 20,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 15,
  paddingRight: 15,
};

const gridBoxStyle = {
  marginBottom: 10,
  backgroundColor: '#fff',
  paddingTop: 40,
  paddingBottom: 40,
  paddingLeft: 20,
  paddingRight: 20,
  display: 'flex',
  flexDirection: 'row',
};

const gridTitleStyle = {
  marginBottom: 0,
  padding: '0 !important',
  fontSize: 14,
  color: '#444444',
  fontWeight: 'bold',
  color: '#444444',
};

const gridValueStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#444444',
};

const TableList = () => {
  const [todayDealInfo, setTodayDealInfo] = useState({});

  const [timeTypeIndex, setTimeTypeIndex] = useState(1);
  const [customTimeSearch, setCustomTimeSearch] = useState([]);
  const actionRef = useRef();

  useEffect(() => {
    queryTodayStatistics().then((res) => {
      setTodayDealInfo(res.Data);
    });
  }, []);

  const handleSelectTimeType = (event) => {
    const timeTypeIndex = event.currentTarget.getAttribute('dataindex');

    if (timeTypeIndex != 5) {
      setCustomTimeSearch([]);
    }

    setTimeTypeIndex(timeTypeIndex);
  };

  const dpOnChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);

    setCustomTimeSearch(dateString);
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'AccountName',
      hideInSearch: true,
      render: (_, record) => (
        <>
          <span>{`${record.AccountName}(${record.AccountMobile})`}</span>
        </>
      ),
    },

    {
      title: '交易金额',
      sorter: true,
      hideInSearch: true,
      dataIndex: 'TradeAmount',
      render: (_, record) => (
        <>
          <span>{record.TradeAmount / money_unit}</span>
        </>
      ),
    },
    {
      title: '买入金额',
      sorter: true,
      hideInSearch: true,
      dataIndex: 'BuyAmount',
      render: (_, record) => (
        <>
          <span>{record.BuyAmount / money_unit}</span>
        </>
      ),
    },
    {
      title: '卖出金额',
      sorter: true,
      hideInSearch: true,
      dataIndex: 'SellAmount',
      render: (_, record) => (
        <>
          <span>{record.SellAmount / money_unit}</span>
        </>
      ),
    },
    {
      title: '交易支数',
      dataIndex: 'TradeCount',
      hideInSearch: true,
    },

    {
      title: (_, type) => (type === 'table' ? <span>交易时间</span> : ''),
      dataIndex: 'LastTradeTime',
      valueType: 'dateTimeRange',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        return (
          <Space>
            <Button
              onClick={(event) => handleSelectTimeType(event)}
              dataindex={1}
              type={timeTypeIndex == 1 ? 'primary' : 'default'}
            >
              最近一天
            </Button>
            <Button
              onClick={(event) => handleSelectTimeType(event)}
              dataindex={2}
              type={timeTypeIndex == 2 ? 'primary' : 'default'}
            >
              一周
            </Button>
            <Button
              onClick={(event) => handleSelectTimeType(event)}
              dataindex={3}
              type={timeTypeIndex == 3 ? 'primary' : 'default'}
            >
              一个月
            </Button>
            <Button
              onClick={(event) => handleSelectTimeType(event)}
              dataindex={4}
              type={timeTypeIndex == 4 ? 'primary' : 'default'}
            >
              三个月
            </Button>
            <Button
              onClick={(event) => handleSelectTimeType(event)}
              dataindex={5}
              type={timeTypeIndex == 5 ? 'primary' : 'default'}
            >
              自定义日期
            </Button>
            {timeTypeIndex == 5 && (
              <RangePicker
                showTime 
                style={{
                  width: 300,
                }}
                onChange={dpOnChange}
              />
            )}
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <div style={gridBoxStyle}>
        <div style={gridStyle}>
          <p style={gridTitleStyle}>今日完成笔数</p>
          <p style={gridValueStyle}>{todayDealInfo.TradeFinishCount}</p>
        </div>
        <div style={gridStyle}>
          <p style={gridTitleStyle}>交易金额</p>
          <p style={gridValueStyle}>￥{todayDealInfo.TradeAmount / money_unit}</p>
        </div>
        <div style={gridStyle}>
          <p style={gridTitleStyle}>买入金额</p>
          <p style={gridValueStyle}>￥{todayDealInfo.TradeBuyAmount / money_unit}</p>
        </div>
        <div style={gridStyle}>
          <p style={gridTitleStyle}>卖出金额</p>
          <p style={gridValueStyle}>￥{todayDealInfo.TradeSoldAmount / money_unit}</p>
        </div>
        <div style={gridStyle}>
          <p style={gridTitleStyle}>交易股票数量</p>
          <p style={gridValueStyle}>{todayDealInfo.TradeSharesCount}</p>
        </div>
        <div style={gridStyle}>
          <p style={gridTitleStyle}>买入股票数量</p>
          <p style={gridValueStyle}>{todayDealInfo.TradeBuySharesCount}</p>
        </div>
        <div style={gridStyle}>
          <p style={gridTitleStyle}>卖出股票数量</p>
          <p style={gridValueStyle}>{todayDealInfo.TradeSoldSharesCount}</p>
        </div>
      </div>

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
        rowKey="AccountMobile"
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
          queryDealRankList({ ...params, sorter, filter, timeTypeIndex, customTimeSearch }).then(
            (res) => {
              const result = {
                data: res.Data.List,
                total: res.Data.TotalCount,
              };
              return result;
            },
          )
        }
        columns={columns}
      />
    </>
  );
};

export default TableList;
