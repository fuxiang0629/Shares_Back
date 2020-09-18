import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
const { TextArea } = Input;
const UpdateForm = (props) => {
  const { modalVisible, onCancel, handleUpdate, values } = props;
  return (
    <Modal
      destroyOnClose
      title="编辑系统参数"
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
        <Form.Item label="参数名" name="ParName" >
           <Input disabled={true}/>
        </Form.Item>

        <Form.Item
          label="参数值"
          name="ParValue"
          rules={[
            {
              required: true,
              message: '请输入参数值!',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="参数描述" name="ParDescription">
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
