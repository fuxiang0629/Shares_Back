import { getPageQuery, getStorage } from '@/utils/utils';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, Input, message, Checkbox, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { host } from '@/utils/config';
import { queryPageDetail, updatePageDetail } from '../service';
import styles from './index.less';
import { useState } from 'react';
const queryParams = getPageQuery();

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 16,
  },
};

const ShareConfig = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    queryPageDetail({
      Id: queryParams.Id,
    }).then((res) => {
      console.log(res);
      let detail = JSON.parse(res.Data.Content);

      form.setFieldsValue({
        ...detail,
      });
    });
  }, []);

  const uploadConfig = {
    name: 'MealTicket.Img',
    action: host + '/img/upload',
    headers: {
      UserToken: getStorage('UserToken'),
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
        const {
          file: {
            response: {
              Data: { ImgUrl },
            },
          },
        } = info;

        console.log('图片上床');
        console.log(info);

        form.setFieldsValue({
          ImgUrl: ImgUrl,
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  const onFinish = async (values) => {
    console.log(values);

    const hide = message.loading('正在更新');
    try {
      await updatePageDetail({ Content: JSON.stringify(values), Id: queryParams.Id });
      hide();
      message.success('更新成功');
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

  return (
    <>
      <div className={styles.main}>
        <Form form={form} onFinish={onFinish} {...layout}>
          <Form.Item name="pageTitle" label="页面标题">
            <Input />
          </Form.Item>

          <Form.Item name="leftButtonText" label="左边按钮文本">
            <Input />
          </Form.Item>
          <Form.Item name="leftButtonBackgroundColor" label="左边按钮背景色">
            <Input />
          </Form.Item>

          <Form.Item name="leftButtonBorderColor" label="左边按钮边框色">
            <Input />
          </Form.Item>

          <Form.Item name="leftButtonFontColor" label="左边按钮文字颜色">
            <Input />
          </Form.Item>

          <Form.Item name="rightButtonText" label="右边按钮文本">
            <Input />
          </Form.Item>
          <Form.Item name="rightButtonBackgroundColor" label="右边按钮背景色">
            <Input />
          </Form.Item>

          <Form.Item name="rightButtonBorderColor" label="右边按钮边框色">
            <Input />
          </Form.Item>

          <Form.Item name="rightButtonFontColor" label="右边按钮文字颜色">
            <Input />
          </Form.Item>

          <Form.Item name="buttonBackgroundColor" label="底部按钮背景色">
            <Input />
          </Form.Item>

          <Form.Item name="isShowButton" label="是否显示底部按钮" valuePropName="checked">
            <Checkbox />
          </Form.Item>

          <Form.Item name="qrcodeX" label="二维码X">
            <Input />
          </Form.Item>
          <Form.Item name="qrcodeY" label="二维码Y">
            <Input />
          </Form.Item>
          <Form.Item name="qrcodeWidth" label="二维码宽度">
            <Input />
          </Form.Item>
          <Form.Item name="qrcodeHeight" label="二维码高度">
            <Input />
          </Form.Item>

          <Form.Item label="背景图片">
            <Upload {...uploadConfig}>
              {form.getFieldsValue().ImgUrl ? (
                <img src={form.getFieldsValue().ImgUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                <Button>
                  <UploadOutlined /> 点击上传
                </Button>
              )}
            </Upload>
            &nbsp;
          </Form.Item>

          <Form.Item label="ImgUrl" name="ImgUrl" hidden={true}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ShareConfig;
