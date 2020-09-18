import { Button, Form, Input, Modal, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { queryPaymentAccountList } from '../../account/service';

const UpdatePayAccountForm = (props) => {
  const { modalVisible, onCancel, handleUpdatePayAccount, values } = props;
  if (!modalVisible) return null;
  const [form] = Form.useForm();
  const [checkBoxList, setCheckBoxList] = useState([]);

  useEffect(() => {
    console.log('-------------');
    console.log(values);

    queryPaymentAccountList({
      current: 1,
      pageSize: 1000,
      ChannelCode: values.ChannelCode,
      BusinessCode: values.BusinessCode,
      Type: 1,
    }).then((res) => {
      console.log(res);

      let list = res.Data.List,
        options = [],
        checkList = [];
      list.map((item) => {
        options.push({ label: item.Name, value: item.Id });
        if (item.IsChecked) {
          checkList.push(item.Id);
        }
      });

      setCheckBoxList(options);


      console.log(checkList)


      form.setFieldsValue({
        PaymentAccountIdList: checkList,
      });

    });
  }, []);

  return (
    <Modal
      destroyOnClose
      title={`支付账户-${values.ChannelName}`}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={600}
    >
      <Form
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdatePayAccount}
        form={form}
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

        <Form.Item name="PaymentAccountIdList">
          <Checkbox.Group options={checkBoxList} />
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

export default UpdatePayAccountForm;
