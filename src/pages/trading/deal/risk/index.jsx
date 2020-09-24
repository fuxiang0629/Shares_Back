import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Switch, message, Popconfirm } from 'antd';
import { history } from 'umi';
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import CreateDealRuleForm from './components/CreateDealRuleForm';
import CreateDealDateForm from './components/CreateDealDateForm';
import CreateDealTimeForm from './components/CreateDealTimeForm';
import UpdateDealRuleForm from './components/UpdateDealRuleForm';
import UpdateDealDateForm from './components/UpdateDealDateForm';

import {
  queryTraderulesList,
  addTraderules,
  modifyTraderules,
  modifyTraderulesStatus,
  deleteTraderules,
  queryPositionRulesList,
  addPositionRules,
  modifyPositionRules,
  modifyPositionRulesStatus,
  deletePositionRules,
  queryRiskRulesList,
  modifyRiskRules,
  modifyRiskRulesForbidStatus,
  modifyRiskRulesStatus,
} from './service';

/**
 * 添加
 * @param fields
 */

const handleAdd = async (type, values) => {
  const hide = message.loading('正在添加');
  try {
    type == 1 ? await addTraderules({ ...values }) : await addPositionRules({ ...values });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 编辑
 * @param values
 */

const handleUpdate = async (type, values) => {
  const hide = message.loading('正在更新');
  try {
    type == 1
      ? await modifyTraderules({ ...values })
      : type == 2
      ? await modifyPositionRules({ ...values })
      : await modifyRiskRules({ ...values });
    hide();
    message.success('正在更新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除
 * @param row
 */
const handleRemove = async (type, row) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    type == 1
      ? await deleteTraderules({
          Id: row.Id,
        })
      : await deletePositionRules({
          Id: row.Id,
        });

    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新状态
 * @param {*} row
 */
const handleUpdateStatus = async (state, row) => {
  type == 1
    ? await modifyTraderulesStatus({
        Id: row.Id,
        Status: state ? 1 : 2,
      })
    : type == 2
    ? await modifyPositionRulesStatus({
        Id: row.Id,
        Status: state ? 1 : 2,
      })
    : await modifyRiskRulesStatus({
        Id: row.Id,
        Status: state ? 1 : 2,
      });
};

/**
 * 更新风控禁止状态
 * @param {*} row
 */
const handleUpdateForbidStatus = async (state, row) => {
  await modifyRiskRulesForbidStatus({
    Id: row.Id,
    Status: state,
  });
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [createDealDateModalVisible, handleDealDateModalVisible] = useState(false);
  const [createDealTimeModalVisible, handleDealTimeModalVisible] = useState(false);

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateDealDateModalVisible, handleUpdateDealDateModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [type, setType] = useState(0);
  const [timeType, setTimeType] = useState(1);

  const actionRef = useRef();
  const actionRef1 = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '股票关键字',
      dataIndex: 'LimitKey',
      hideInForm: true,
    },
    {
      title: '股票类型',
      dataIndex: 'LimitType',
      valueEnum: {
        0: {
          text: '全部',
        },
        1: {
          text: '股票代码',
        },
        2: {
          text: '股票名称',
        },
      },
    },
    {
      title: '限制市场代码',
      dataIndex: 'LimitMarket',
      hideInSearch: true,
      valueEnum: {
        '-1': {
          text: '全部市场',
        },
        '0': {
          text: '深圳',
        },
        '1': {
          text: '上海',
        },
      },
    },
    {
      title: '优先级',
      dataIndex: 'Priority',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '涨跌幅(1/万)',
      dataIndex: 'Range',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '杠杆倍数',
      dataIndex: 'FundMultiple',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '警戒线（1/万）',
      dataIndex: 'Cordon',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '平仓线（1/万）',
      dataIndex: 'ClosingLine',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'Status',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '开启',
        },
        2: {
          text: '关闭',
        },
      },
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
              handleUpdateModalVisible(true);
              setFormValues(record);
              setType(0);
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
              const success = await handleRemove(0, record);
              if (success) {
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
          >
            <a style={{ color: '#F42708' }}>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a
            onClick={() => {
              history.push({
                pathname: `/trading/deal/liquidation/额外平仓线-${record.LimitKey}`,
                query: {
                  Id: record.Id,
                },
              });
            }}
          >
            额外平仓线
          </a>
        </>
      ),
    },
  ];
  const columns1 = [
    {
      title: 'Id',
      dataIndex: 'Id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '市场名称',
      dataIndex: 'MarketName',
      hideInForm: true,
    },
    {
      title: '限制市场代码',
      dataIndex: 'LimitMarket',
      hideInSearch: true,
      valueEnum: {
        '-1': {
          text: '全部市场',
        },
        '0': {
          text: '深圳',
        },
        '1': {
          text: '上海',
        },
      },
    },

    {
      title: '关键词',
      dataIndex: 'LimitKey',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '闭市时间',
      dataIndex: 'Time5',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleDealTimeModalVisible(true);
              setTimeType(5);
              setFormValues(record);
            }}
          >
            {record.Time5 ? record.Time5 : '暂未设置'}
          </a>
        </>
      ),
    },
    {
      title: '开市竞价时间',
      dataIndex: 'Time1',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleDealTimeModalVisible(true);
              setTimeType(1);
              setFormValues(record);
            }}
          >
            {record.Time1 ? record.Time1 : '暂未设置'}
          </a>
        </>
      ),
    },
    {
      title: '等待开市时间',
      dataIndex: 'Time2',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleDealTimeModalVisible(true);
              setTimeType(2);
              setFormValues(record);
            }}
          >
            {record.Time2 ? record.Time2 : '暂未设置'}
          </a>
        </>
      ),
    },
    {
      title: '开市时间',
      dataIndex: 'Time3',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleDealTimeModalVisible(true);
              setTimeType(3);
              setFormValues(record);
            }}
          >
            {record.Time3 ? record.Time3 : '暂未设置'}
          </a>
        </>
      ),
    },
    {
      title: '尾市竞价时间',
      dataIndex: 'Time4',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleDealTimeModalVisible(true);
              setTimeType(4);
              setFormValues(record);
            }}
          >
            {record.Time4 ? record.Time4 : '暂未设置'}
          </a>
        </>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateDealDateModalVisible(true);
              setFormValues(record);
              setType(1);
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
              const success = await handleRemove(1, record);
              if (success) {
                if (actionRef1.current) {
                  actionRef1.current.reload();
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
      <div style={{ marginBottom: '20px' }}>
        <ProTable
          search={false}
          options={{
            fullScreen: false,
            reload: false,
            setting: false,
            density: false,
          }}
          headerTitle="交易时间"
          actionRef={actionRef1}
          rowKey="Id"
          toolBarRender={() => [
            <Button
              type="primary"
              onClick={() => {
                setType(1);
                handleDealDateModalVisible(true);
              }}
            >
              <PlusOutlined /> 添加
            </Button>,
            <Button
              type="primary"
              onClick={() => {
                if (actionRef1.current) {
                  actionRef1.current.reload();
                }
              }}
            >
              <ReloadOutlined />
              刷新
            </Button>,
          ]}
          request={(params, sorter, filter) =>
            queryDealDateGroupList({ ...params, sorter, filter }).then((res) => {
              const result = {
                data: res.Data.List,
                total: res.Data.TotalCount,
              };
              return result;
            })
          }
          columns={columns1}
        />
      </div>

      <ProTable
        search={false}
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
          density: false,
        }}
        headerTitle="交易规则"
        actionRef={actionRef}
        rowKey="Id"
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              setType(0);
              handleModalVisible(true);
            }}
          >
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
          queryDealRuleList({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />
      <CreateDealRuleForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        handleAdd={async (value) => {
          const success = await handleAdd(type, value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <CreateDealDateForm
        onCancel={() => handleDealDateModalVisible(false)}
        modalVisible={createDealDateModalVisible}
        handleAdd={async (value) => {
          const success = await handleAdd(type, value);

          if (success) {
            handleDealDateModalVisible(false);

            if (actionRef1.current) {
              actionRef1.current.reload();
            }
          }
        }}
      />

      <CreateDealTimeForm
        onCancel={() => handleDealTimeModalVisible(false)}
        modalVisible={createDealTimeModalVisible}
        timeType={timeType}
        handleUpdateDealTime={async (value) => {
          const success = await handleUpdateDealTime(value);
          if (success) {
            handleDealTimeModalVisible(false);
            if (actionRef1.current) {
              actionRef1.current.reload();
            }
          }
        }}
        values={formValues}
      />

      <UpdateDealRuleForm
        handleUpdate={async (value) => {
          const success = await handleUpdate(type, value);

          if (success) {
            handleUpdateModalVisible(false);
            setFormValues({});

            if (actionRef1.current) {
              actionRef1.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setFormValues({});
        }}
        updateModalVisible={updateModalVisible}
        values={formValues}
      />

      <UpdateDealDateForm
        handleUpdate={async (value) => {
          const success = await handleUpdate(type, value);
          if (success) {
            handleUpdateDealDateModalVisible(false);
            setFormValues({});

            if (actionRef1.current) {
              actionRef1.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateDealDateModalVisible(false);
          setFormValues({});
        }}
        updateModalVisible={updateDealDateModalVisible}
        values={formValues}
      />
    </>
  );
};

export default TableList;
