import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useRef, useState, useEffect } from 'react';

const EndWithdrawForm = (props) => {
  const { modalVisible, onCancel, handleUpdateEndWithdraw,values } = props;
  if (!modalVisible) return null;

  return (
    <Modal
      destroyOnClose
      title="结束提现"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdateEndWithdraw}
        initialValues={{
            ...values
        }}
      >
        <Form.Item label="Id" name="Id" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item
          name="Remark"
          label="备注"
          rules={[
            {
              required: true,
              message: '请输入备注!',
            },
          ]}
        >
          <Input.TextArea rows={4} />
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

export default EndWithdrawForm;
