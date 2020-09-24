import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const CreateDealRuleForm = (props) => {
  const { modalVisible, onCancel, handleAdd } = props;
  if (!modalVisible) return null;
  return (
    <Modal
      destroyOnClose
      title="添加交易规则"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={600}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleAdd}
      >
        <Form.Item
          name="MarketName"
          label="名称"
          rules={[
            {
              required: true,
              message: '请输入市场名称!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="市场"
          name="LimitMarket"
          rules={[
            {
              required: true,
              message: '请选择限制市场代码!',
            },
          ]}
        >
          <Select>
            <Select.Option value={-1}>全部市场</Select.Option>
            <Select.Option value={0}>深圳</Select.Option>
            <Select.Option value={1}>上海</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="LimitKey"
          label="股票关键字"
          rules={[
            {
              required: true,
              message: '请输入股票关键字!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="优先级"
          name="Priority"
          rules={[
            {
              required: true,
              message: '请输入优先级!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="涨跌幅(1/万)"
          name="Range"
          rules={[
            {
              required: true,
              message: '请输入涨跌幅!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="杠杆倍数"
          name="FundMultiple"
          rules={[
            {
              required: true,
              message: '请输入杠杆倍数!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ justifyContent: 'center' }}>
          <Button type="primary" block htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateDealRuleForm;
