import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Row, Col, Card, message, Input } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryStockHotList, queryStockRt } from './service';
import styles from './index.less';

const TableList = () => {
  const actionRef = useRef();

  const [stockRtList, setStockRtList] = useState([]);

  useEffect(() => {
    queryStockRt({}).then((res) => {
      console.log(res);

      if (res) {
        setStockRtList(res.Data);
      }
    });
  }, []);

  const columns = [
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
      hideInSearch: true,
    },
    {
      title: '查询次数',
      dataIndex: 'SearchCount',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '当前价格',
      dataIndex: 'PresentPrice',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '昨日收盘价',
      dataIndex: 'ClosedPrice',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '涨幅',
      dataIndex: 'Rise',
      hideInForm: true,
      hideInSearch: true,
    },
  ];
  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <span>今日行情</span>
          <Button
            type="primary"
            onClick={() => {
              history.push({
                pathname: '/trading/market/today/add',
              });
            }}
          >
            编辑
          </Button>
        </div>

        <div className={styles.content}>
          <Card>
            {stockRtList.map((item, index) => {
              return (
                <Card.Grid key={index} className={styles.item}>
                  <p className={styles.stock_name}>{item.SharesName}</p>
                  <p
                    className={
                      item.PresentPrice > item.ClosedPrice ? styles.txt_green : styles.txt_red
                    }
                  >
                    {item.PresentPrice}
                  </p>
                  <p>
                    <span
                      className={
                        item.PresentPrice > item.ClosedPrice ? styles.txt_red : styles.txt_green
                      }
                    >
                      {item.ClosedPrice}
                    </span>
                    /
                    <span className={item.Rise >= 0 ? styles.txt_red : styles.txt_green}>
                      {item.Rise}
                    </span>
                  </p>
                </Card.Grid>
              );
            })}
          </Card>
        </div>
      </div>

      <ProTable
        headerTitle="热门搜索"
        actionRef={actionRef}
        tableAlertRender={false}
        search={false}
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
          density: false,
        }}
        rowKey="SharesCode"
        request={(params, sorter, filter) =>
          queryStockHotList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
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
