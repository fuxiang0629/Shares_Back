import { Button, Form, Input, Modal } from 'antd';
import React from 'react';


const { TextArea } = Input;

const UpdateRoleFrom = (props) => {
  const { modalVisible, onCancel, handleUpdate,values } = props;
  

  return (
    <Modal
      destroyOnClose
      title="编辑角色"
      visible={modalVisible}
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

      <Form.Item
          label="RoleId"
          name="RoleId"
          hidden={true}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="角色名称"
          name="RoleName"
          rules={[
            {
              required: true,
              message: '请输入您的角色名!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="角色描述" name="RoleDescription">
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

export default UpdateRoleFrom;
