import { Button, Form, Input, TimePicker, Modal } from 'antd';
import React, { useEffect } from 'react';
import moment from 'moment';
const { RangePicker } = TimePicker;

const UpdateForm = (props) => {
  const { updateModalVisible, onCancel, handleUpdate, values } = props;
  if (!updateModalVisible) return null;
  const [form] = Form.useForm();
  useEffect(() => {
    const timer = values.Times.split('-');
    form.setFieldsValue({
      Times: [moment(timer[0],'HH:mm:ss'), moment(timer[1],'HH:mm:ss')],
    });
  }, []);

  return (
    <Modal
      destroyOnClose
      title="编辑平仓线"
      visible={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdate}
        initialValues={{
          Id: values.Id,
          Cordon: values.Cordon,
          ClosingLine: values.ClosingLine,
        }}
      >
        <Form.Item label="时间段" name="Times">
          <RangePicker />
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

export default UpdateForm;
