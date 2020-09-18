import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const UpdateDealRuleForm = (props) => {
  const { updateModalVisible, onCancel, handleUpdate,values } = props;
  if (!updateModalVisible) return null;
  return (
    <Modal
      destroyOnClose
      title="编辑交易规则"
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

        <Form.Item label="股票类型" name="LimitType">
          <Select>
            <Select.Option value={1}>股票代码</Select.Option>
            <Select.Option value={2}>股票名称</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="限制市场代码" name="LimitMarket">
          <Select>
            <Select.Option value={-1}>全部市场</Select.Option>
            <Select.Option value={0}>深圳</Select.Option>
            <Select.Option value={1}>上海</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="优先级" name="Priority">
          <Input />
        </Form.Item>
        <Form.Item label="涨跌幅(1/万)" name="Range">
          <Input />
        </Form.Item>
        <Form.Item label="杠杆倍数" name="FundMultiple">
          <Input />
        </Form.Item>
        <Form.Item label="警戒线（1/万）" name="Cordon">
          <Input />
        </Form.Item>
        <Form.Item label="平仓线（1/万）" name="ClosingLine">
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

export default UpdateDealRuleForm;
