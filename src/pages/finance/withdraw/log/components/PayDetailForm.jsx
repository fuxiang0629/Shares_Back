import { Button, Input, Modal, Form, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { queryTransferRecordDetail } from '../service';
import { money_unit } from '@/utils/config';
const WithdrawDetailForm = (props) => {
  const { modalVisible, onCancel, values } = props;
  if (!modalVisible) return null;
  const [payDetail, setPayDetail] = useState([]);
  useEffect(() => {
    queryTransferRecordDetail({
      Id: values.Id,
    }).then((res) => {
      console.log(res);
      if (res) {
        if (res.Data) {
          res.Data.map((item) => {
            item.ApplyAmount = (item.ApplyAmount / money_unit).toFixed(2);
            item.CashedAmount = (item.CashedAmount / money_unit).toFixed(2);
            item.ServiceFee = (item.ServiceFee / money_unit).toFixed(2);
          });
        }
        setPayDetail(res.Data);        
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
      title="打款详情"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={1200}
    >
      <Table dataSource={payDetail} columns={columns} pagination={false} />

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => onCancel()} type="primary">
          关闭
        </Button>
      </div>
    </Modal>
  );
};

export default WithdrawDetailForm;
