import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

const { TextArea } = Input;
const UpdateForm = (props) => {
  const { updateModalVisible, onCancel, handleUpdate, values } = props;
  if (!updateModalVisible) return null;

  return (
    <Modal
      destroyOnClose
      title="更新服务器"
      visible={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
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
        <Form.Item label="服务器代号" name="ServerId" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item label="服务器描述" name="ServerDes">
          <TextArea rows={4} />
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

export default UpdateForm;
