import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

const UpdateForm = (props) => {
  const { updateModalVisible, onCancel, handleUpdate, values } = props;
  if (!updateModalVisible) return null;

  console.log(values)
  return (
    <Modal
      destroyOnClose
      title="编辑禁止股票名单"
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
          name="GroupName"
          label="分组名称"
          rules={[
            {
              required: true,
              message: '请输入分组名称!',
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

export default UpdateForm;
