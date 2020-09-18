import { getStorage } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Upload } from 'antd';
import React from 'react';
import { host } from '@/utils/config';

const UpdateCategoryForm = (props) => {
  const { modalVisible, onCancel, handleUpdate,values } = props;
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
          IconUrl: ImgPath,
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  return (
    <Modal
      destroyOnClose
      title="编辑问题分类"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdate}
        initialValues={{
          ...values,
        }}
      >
        <Form.Item
          label="分类名称"
          name="TypeName"
          rules={[
            {
              required: true,
              message: '请输入分类名称!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="排序值" name="OrderIndex">
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

        <Form.Item label="IconUrl" name="IconUrl" hidden={true}>
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

export default UpdateCategoryForm;
