
import { Button, Form, Input, TimePicker, Modal } from 'antd';
import moment from 'moment';
import React from 'react';
const { RangePicker } = TimePicker;

const CreateForm = (props) => {
  const { modalVisible, onCancel, handleAdd, values } = props;
  if (!modalVisible) return null;

  const handleFinishFrom = (values) => {

    const startTime = moment(values.Times[0]).format('LTS');
    const endTime = moment(values.Times[1]).format('LTS');
    handleAdd({
      ...values,
      Times: `${startTime}-${endTime}`,
    });
  };

  return (
    <Modal
      destroyOnClose
      title="添加平仓线"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={600}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleFinishFrom}
        initialValues={{
          ...values,
        }}
      >
        <Form.Item label="时间段" name="Times">
          <RangePicker />
        </Form.Item>
        <Form.Item label="警戒线(1/万)" name="Cordon">
          <Input />
        </Form.Item>

        <Form.Item label="平仓线(1/万)" name="ClosingLine">
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

export default CreateForm;
