import { Button, Input, Modal, Space, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { queryFinanceCasheDetail } from '../service';
import { money_unit } from '@/utils/config';
const WithdrawDetailForm = (props) => {
  const { modalVisible, onCancel, values } = props;
  if (!modalVisible) return null;
  const [withdrawDetail, setWithdrawDetail] = useState({});
  useEffect(() => {
    queryFinanceCasheDetail({
      Id: values.Id,
    }).then((res) => {
      console.log(res.Data.CashDetailsList);
      if (res) {
        if (res.Data.CashDetailsList) {
          res.Data.CashDetailsList.map((item) => {
            item.ApplyAmount = (item.ApplyAmount / money_unit).toFixed(2);
            item.CashedAmount = (item.CashedAmount / money_unit).toFixed(2);
            item.ServiceFee = (item.ServiceFee / money_unit).toFixed(2);
          });
        }
        setWithdrawDetail({ ...res.Data });
      }
    });
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: '打款方式',
      dataIndex: 'Type',
      key: 'Type',
    },
    {
      title: '提现金额',
      dataIndex: 'ApplyAmount',
      key: 'ApplyAmount',
    },
    {
      title: '实转金额',
      dataIndex: 'CashedAmount',
      key: 'CashedAmount',
    },
    {
      title: '服务费',
      dataIndex: 'ServiceFee',
      key: 'ServiceFee',
    },
    {
      title: '打款账户',
      dataIndex: 'PaymentAccountName',
      key: 'PaymentAccountName',
    },
    {
      title: '退款单号',
      dataIndex: 'RefundSn',
      key: 'RefundSn',
    },
    {
      title: '状态',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: '状态描述',
      dataIndex: 'StatusDes',
      key: 'StatusDes',
    },
    {
      title: '操作人',
      dataIndex: 'AdminAccountName',
      key: 'AdminAccountName',
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      key: 'CreateTime',
    },
    {
      title: '完成时间',
      dataIndex: 'FinishTime',
      key: 'FinishTime',
    },
  ];

  return (
    <Modal
      destroyOnClose
      title="提现详情"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={1200}
    >
      <Space style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '20px' }}>
        <span>提现金额:{withdrawDetail.ApplyAmount / money_unit}</span>
        <span>实转金额:{withdrawDetail.CashedAmount / money_unit}</span>
      </Space>

      {withdrawDetail.CashDetailsList && withdrawDetail.CashDetailsList.length > 0 && (
        <Table dataSource={withdrawDetail.CashDetailsList} columns={columns} pagination={false} />
      )}

      {withdrawDetail.FinishInfo && (
        <>
          <p style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '20px' }}>完成详情</p>
          <Space>
            <span>
              操作人：{withdrawDetail.FinishInfo && withdrawDetail.FinishInfo.AdminAccountName}
            </span>
            <span>
              完成时间：{withdrawDetail.FinishInfo && withdrawDetail.FinishInfo.FinishTime}
            </span>
          </Space>

          <div style={{ marginTop: '10px' }}>
            <Space>
              <span>备注</span>
              <Input
                style={{ width: '400px' }}
                value={withdrawDetail.FinishInfo && withdrawDetail.FinishInfo.Remark}
                disabled={false}
              />
            </Space>
          </div>
        </>
      )}

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => onCancel()} type="primary">
          关闭
        </Button>
      </div>
    </Modal>
  );
};

export default WithdrawDetailForm;
