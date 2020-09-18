import { getStorage } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Upload } from 'antd';
import React from 'react';
import { host } from '@/utils/config';

const UpdateServiceDetailForm = (props) => {
  const { modalVisible, onCancel, handleUpdateServiceConfigDetail,values } = props;
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
          ImgUrl: ImgPath,
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  return (
    <Modal
      destroyOnClose
      title="编辑客服详情"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdateServiceConfigDetail}
        initialValues={{
          ...values,
        }}
      >
        <Form.Item
          label="微信号码"
          name="WechatNumber"
          rules={[
            {
              required: true,
              message: '请输入微信号码!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="手机号码" name="Mobile"
        
        rules={[
            {
              required: true,
              message: '请输入手机号码!',
            },
          ]}
          >
          <Input type="number" />
        </Form.Item>

        <Form.Item label="分类图标" >
          <Upload {...uploadConfig}>
            <Button>
              <UploadOutlined /> 点击上传
            </Button>
          </Upload>
          &nbsp;
        </Form.Item>

        <Form.Item label="ImgUrl" name="ImgUrl" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item label="Id" name="Id" hidden={true}>
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

export default UpdateServiceDetailForm;
