import { getPageQuery } from '@/utils/utils';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { queryPageDetail, updatePageDetail } from '../service';
import styles from './index.less';
const queryParams = getPageQuery();

const layout = {
  labelCol: {
    span: 1,
  },
  wrapperCol: {
    span: 16,
  },
};
const AboutConfig = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    queryPageDetail({
      Id: queryParams.Id,
    }).then((res) => {
      let desc = JSON.parse(res.Data.Content);
      form.setFieldsValue({
        content: desc.content,
      });
    });
  }, []);

  const onFinish = async (values) => {
    const hide = message.loading('正在更新');
    try {
      await updatePageDetail({ Content: JSON.stringify(values), Id: queryParams.Id });
      hide();
      message.success('正在更新');
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
          <Form.Item name="content" label="描述">
            <Input.TextArea style={{ height: '200px' }} />
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

export default AboutConfig;
