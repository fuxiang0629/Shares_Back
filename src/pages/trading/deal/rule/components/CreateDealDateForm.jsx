import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const CreateDealDateForm = (props) => {
  const { modalVisible, onCancel, handleAdd } = props;
  if (!modalVisible) return null;
  return (
    <Modal
      destroyOnClose
      title="添加交易时间分组"
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
              message: '请输入名称!',
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
              message: '请选择市场!',
            },
          ]}
        >
          <Select>
            <Select.Option value={0}>深圳</Select.Option>
            <Select.Option value={1}>上海</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="股票关键字"
          name="LimitKey"
          rules={[
            {
              required: true,
              message: '请输入股票匹配关键字!',
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

export default CreateDealDateForm;
