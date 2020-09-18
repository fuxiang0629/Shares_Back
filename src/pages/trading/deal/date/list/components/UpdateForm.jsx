import { Button, Form, Input, Modal, DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';
const UpdateForm = (props) => {
  const { updateModalVisible, onCancel, handleUpdate, values } = props;
  if (!updateModalVisible) return null;

  return (
    <Modal
      destroyOnClose
      title="编辑禁止日期"
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
          BeginDate: moment(values.BeginDate),
          EndDate: moment(values.EndDate),
        }}
      >
        <Form.Item
          label="起始日期"
          name="BeginDate"
          rules={[
            {
              required: true,
              message: '请选择起始日期!',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="截止日期"
          name="EndDate"
          rules={[
            {
              required: true,
              message: '请选择截止日期!',
            },
          ]}
        >
          <DatePicker />
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
