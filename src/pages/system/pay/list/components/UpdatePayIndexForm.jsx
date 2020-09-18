import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

const UpdatePayIndexForm = (props) => {
  const { modalVisible, onCancel, handleUpdatePayIndex, values } = props;
  if (!modalVisible) return null;
  return (
    <Modal
      destroyOnClose
      title="排序值"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={600}
    >
      <Form
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdatePayIndex}
        initialValues={{
          ...values,
        }}
      >
        <Form.Item label="ChannelCode" name="ChannelCode" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item label="BusinessCode" name="BusinessCode" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item label="排序值" name="OrderIndex">
          <Input type="number"/>
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

export default UpdatePayIndexForm;
