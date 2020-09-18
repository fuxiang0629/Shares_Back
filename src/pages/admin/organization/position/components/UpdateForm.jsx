import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

const { TextArea } = Input;

const ModifyPwdFrom = (props) => {
  const { updateModalVisible, onCancel, values, handleUpdate } = props;
  
  return (
    <Modal
      destroyOnClose
      title="编辑职位"
      visible={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        initialValues={{
          ...values,
        }}
        onFinish={handleUpdate}
      >
        <Form.Item
          label="Id"
          name="Id"
          hidden={true}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="职位名称"
          name="Name"
          rules={[
            {
              required: true,
              message: '请输入职位名称!',
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item label="职位描述" name="Description">
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

export default ModifyPwdFrom;
