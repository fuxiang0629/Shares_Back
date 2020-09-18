import { money_unit } from '@/utils/config';
import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
const DetailForm = (props) => {
  const { modalVisible, onCancel, values } = props;
  if (!modalVisible) return null;
  const [form] = Form.useForm();

  return (
    <Modal
      destroyOnClose
      title="打款详情"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        initialValues={{
          ...values,
          ApplyAmount: values.ApplyAmount / money_unit,
          AccountName:`${values.AccountMobile}(${values.AccountName})`
        }}
      >
        <Form.Item label="订单号" name="CashOrderSn">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label="提现金额" name="ApplyAmount">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label="账户名" name="AccountName">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label="银行类型" name="TransferType">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label="银行卡号" name="CardNumber">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label="银行卡姓名" name="RealName">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" block onClick={() => onCancel()}>
            关闭
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DetailForm;
