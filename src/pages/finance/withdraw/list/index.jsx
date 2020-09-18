import { money_unit } from '@/utils/config';
import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import EndWithdrawForm from './components/EndWithdrawForm';
import StartWithdrawForm from './components/StartWithdrawForm';
import WithdrawDetailForm from './components/WithdrawDetailForm';
import {
  queryFinanceCasheRecord,
  updateFinanceCasheDispose,
  updateFinanceCasheEnd,
  updateFinanceCasheRevocation,
  updateFinanceCasheStart,
} from './service';

/**
 * 结束提现
 * @param {*} values
 */
const handleUpdateEndWithdraw = async (values) => {
  console.log('结束提现');
  console.log(values);
  const hide = message.loading('正在更新');
  try {
    await updateFinanceCasheEnd({ ...values });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 开始处理提现
 * @param {*} row
 */
const handleStartDisposeWithdraw = async (row) => {
  const hide = message.loading('正在处理');
  try {
    await updateFinanceCasheDispose({ Id: row.Id });
    hide();
    message.success('执行成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 开始提现
 * @param {*} row
 */
const handleStartWithdraw = async (row) => {
  console.log(row);
  const hide = message.loading('正在处理');
  try {
    await updateFinanceCasheStart(row);
    hide();
    message.success('执行成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 撤销提现
 * @param {*} row
 */
const handleCancelDisposeWithdraw = async (row) => {
  const hide = message.loading('正在处理');
  try {
    await updateFinanceCasheRevocation({ Id: row.Id });
    hide();
    message.success('执行成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList = () => {
  const [formValues, setFormValues] = useState({});
  const [endWithdrawModalVisible, handleEndWithdrawModalVisible] = useState(false);
  const [startWithdrawModalVisible, handleStartWithdrawModalVisible] = useState(false);
  const [withdrawDetailModalVisible, handleWithdrawDetailModalVisible] = useState(false);

  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      hideInSearch: true,
    },
    {
      title: '订单编号',
      dataIndex: 'OrderSn',
    },
    {
      title: '用户昵称',
      dataIndex: 'AccountName',
    },
    {
      title: '用户手机号',
      dataIndex: 'AccountMobile',
    },
    {
      title: '申请提现金额',
      dataIndex: 'ApplyAmount',
      hideInSearch: true,
      renderText: (val) => `${val / money_unit}元`,
    },
    {
      title: '已提现金额',
      dataIndex: 'CashedAmount',
      hideInSearch: true,
      renderText: (val) => `${val / money_unit}元`,
    },

    {
      title: '提现方式',
      dataIndex: 'CashType',
      hideInForm: true,
      valueEnum: {
        1: {
          text: '退款优先',
        },
        2: {
          text: '转账优先',
        },
        3: {
          text: '无要求',
        },
      },
    },
    {
      title: '服务费率',
      dataIndex: 'ServiceFeeRate',
      hideInSearch: true,
      renderText: (val) => `${val / 100}%`,
    },
    {
      title: '已收取服务费',
      dataIndex: 'ServiceFee',
      hideInSearch: true,
      renderText: (val) => `${val / money_unit}元`,
    },
    {
      title: '银行卡号',
      dataIndex: 'CardNumber',
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'RealName',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'Mobile',
      hideInSearch: true,
    },
    {
      title: '银行卡类型',
      dataIndex: 'CardBreed',
      hideInSearch: true,
    },
    {
      title: '银行名称',
      dataIndex: 'BankName',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'Status',
      hideInForm: true,
      valueEnum: {
        1: {
          text: '提交申请',
          status: 'Default',
        },
        2: {
          text: '申请处理中',
          status: 'Processing',
        },
        21: {
          text: '已开始提现',
          status: 'Processing',
        },
        3: {
          text: '提现失败',
          status: 'Error',
        },
        4: {
          text: '提现成功',
          status: 'Success',
        },
        5: {
          text: '部分提现成功',
          status: 'Success',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      valueType: 'dateTimeRange',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <>
          {record.Status === 1 && (
            <>
              <Popconfirm
                title="要处理这条记录吗？"
                okText="确认"
                cancelText="取消"
                onConfirm={async () => {
                  const success = await handleStartDisposeWithdraw(record);
                  if (success) {
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  }
                }}
              >
                <a>开始处理</a>
              </Popconfirm>

              <Divider type="vertical" />
              <a
                onClick={() => {
                  handleEndWithdrawModalVisible(true);
                  setFormValues(record);
                }}
              >
                结束提现
              </a>
            </>
          )}

          {record.Status === 2 && (
            <>
              <a
                onClick={() => {
                  handleStartWithdrawModalVisible(true);
                  setFormValues(record);
                }}
              >
                开始提现
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  handleEndWithdrawModalVisible(true);
                  setFormValues(record);
                }}
              >
                结束提现
              </a>
              <Divider type="vertical" />
              <Popconfirm
                title="要撤销这条记录吗？"
                okText="确认"
                cancelText="取消"
                onConfirm={async () => {
                  const success = await handleCancelDisposeWithdraw(record);
                  if (success) {
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  }
                }}
              >
                <a>撤销</a>
              </Popconfirm>
            </>
          )}
          {record.Status === 21 && (
            <>
              <a
                onClick={() => {
                  handleStartWithdrawModalVisible(true);
                  setFormValues(record);
                }}
              >
                继续提现
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  handleEndWithdrawModalVisible(true);
                  setFormValues(record);
                }}
              >
                结束提现
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  setFormValues(record);
                  handleWithdrawDetailModalVisible(true);
                }}
              >
                提现详情
              </a>
            </>
          )}
          {(record.Status === 3 || record.Status === 4 || record.Status === 5) && (
            <>
              <a
                onClick={() => {
                  setFormValues(record);
                  handleWithdrawDetailModalVisible(true);
                }}
              >
                查看详情
              </a>
            </>
          )}
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
          queryFinanceCasheRecord({ ...params, sorter, filter }).then((res) => {
            const result = {
              data: res.Data.List,
              total: res.Data.TotalCount,
            };
            return result;
          })
        }
        columns={columns}
      />

      <EndWithdrawForm
        onCancel={() => handleEndWithdrawModalVisible(false)}
        modalVisible={endWithdrawModalVisible}
        values={formValues}
        handleUpdateEndWithdraw={async (values) => {
          const success = await handleUpdateEndWithdraw(values);
          if (success) {
            handleEndWithdrawModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <StartWithdrawForm
        modalVisible={startWithdrawModalVisible}
        onCancel={() => handleStartWithdrawModalVisible(false)}
        values={formValues}
        handleStartWithdraw={async (values) => {
          const success = await handleStartWithdraw(values);
          if (success) {
            handleStartWithdrawModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <WithdrawDetailForm
        modalVisible={withdrawDetailModalVisible}
        onCancel={() => handleWithdrawDetailModalVisible(false)}
        values={formValues}
      />
    </>
  );
};

export default TableList;
