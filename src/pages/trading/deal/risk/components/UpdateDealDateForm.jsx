import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const CreateDealDateForm = (props) => {
  const { updateModalVisible, onCancel, handleUpdate, values } = props;
  if (!updateModalVisible) return null;
  return (
    <Modal
      destroyOnClose
      title="编辑交易时间分组"
      visible={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={600}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdate}
        initialValues={{
          ...values,
        }}
      >
        <Form.Item
          name="MarketName"
          label="市场名称"
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
          label="市场代码"
          name="LimitMarket"
          rules={[
            {
              required: true,
              message: '请选择市场代码!',
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

        <Form.Item label="Id" name="Id" hidden={true}>
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
