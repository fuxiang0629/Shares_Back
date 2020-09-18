import { host } from '@/utils/config';
import { getStorage } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, message, Modal, Select, Upload } from 'antd';
import moment from 'moment';
import React from 'react';

const UpdateAccountForm = (props) => {
  const { modalVisible, onCancel, handleUpdateAccount, values } = props;
  if (!modalVisible) return null;
  const [form] = Form.useForm();
  const uploadConfig = {
    name: 'MealTicket.Img',
    action: host + '/img/upload',
    headers: {
      UserToken: getStorage('UserToken'),
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
        const {
          file: {
            response: {
              Data: { ImgPath },
            },
          },
        } = info;

        form.setFieldsValue({
          HeadUrl: ImgPath,
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  return (
    <Modal
      destroyOnClose
      title="编辑用户信息"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdateAccount}
        initialValues={{
          ...values,
          BirthDay: moment(values.BirthDay),
        }}
      >
        <Form.Item label="AccountId" name="AccountId" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item label="昵称" name="NickName">
          <Input />
        </Form.Item>

        <Form.Item label="性别" name="Sex">
          <Select>
            <Select.Option value={0}>未知</Select.Option>
            <Select.Option value={1}>男</Select.Option>
            <Select.Option value={2}>女</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="生日" name="BirthDay">
          <DatePicker onChange={onChange} />
        </Form.Item>

        <Form.Item label="头像">
          <Upload {...uploadConfig}>
            <Button>
              <UploadOutlined /> 点击上传
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item label="HeadUrl" name="HeadUrl" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" block htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateAccountForm;
