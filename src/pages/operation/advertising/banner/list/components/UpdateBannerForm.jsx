import { Button, Form, Input, Modal, Select,Upload } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { host } from '@/utils/config';
import { getStorage } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';

const UpdateBannerForm = (props) => {
  const { modalVisible, onCancel, handleUpdateBanner, values } = props;
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
      title="编辑Banner"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdateBanner}
        initialValues={{
          ...values,
        }}
      >
        <Form.Item label="Id" name="Id" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Banner名称"
          name="Name"
          rules={[
            {
              required: true,
              message: '请输入Banner名称!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="排序值" name="OrderIndex">
          <Input type="number" />
        </Form.Item>
        
        <Form.Item label="跳转地址" name="ActionPath">
          <Input />
        </Form.Item>

        <Form.Item label="跳转类型" name="ActionType">
          <Select>
            <Select.Option value={0}>无跳转</Select.Option>
            <Select.Option value={1}>跳转外部页面</Select.Option>
            <Select.Option value={2}>跳转本地页面</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Banner图片">
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

        <Form.Item style={{ justifyContent: 'center' }}>
          <Button type="primary" block htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBannerForm;
