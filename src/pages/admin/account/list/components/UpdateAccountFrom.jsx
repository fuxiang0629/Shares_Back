import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { queryDepartmentList } from '../../../organization/department/service';
import { queryPositionList } from '../../../organization/position/service';

const UpdateAccountFrom = (props) => {
  const { modalVisible, onCancel, handleUpdate,values } = props;
  if(!modalVisible) return null;
  const [positionList, setPositionList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    queryDepartmentList({
      current: 1,
      pageSize: 100,
    }).then((res) => {
      setDepartmentList(res.Data.List);
    });

    queryPositionList({
      current: 1,
      pageSize: 100,
    }).then((res) => {
      setPositionList(res.Data.List);
    });
  }, []);

  return (
    <Modal
      destroyOnClose
      title="编辑账号"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdate}
        initialValues={{
          ...values,
        }}
      >

<Form.Item
          label="AccountId"
          name="AccountId"
          hidden={true}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="用户名"
          name="UserName"
          rules={[
            {
              required: true,
              message: '请输入您的密码!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="手机号" name="Mobile">
          <Input />
        </Form.Item>

        <Form.Item
          name="Email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: '输入的电子邮件无效!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="部门" name="DepartmentId">
          <Select>
            {departmentList.map((item, index) => {
              return (
                <Select.Option key={index} value={item.Id}>
                  {item.Name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="职位" name="PositionId">
          <Select>
            {positionList.map((item, index) => {
              return (
                <Select.Option key={index} value={item.Id}>
                  {item.Name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="姓名" name="RealName">
          <Input />
        </Form.Item>

        <Form.Item label="性别" name="Sex">
          <Select>
            <Select.Option value={0}>未知</Select.Option>
            <Select.Option value={1}>男</Select.Option>
            <Select.Option value={2}>女</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入您的密码!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['Password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请确认您的密码!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('Password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('您输入的两个密码不匹配!');
              },
            }),
          ]}
        >
          <Input.Password />
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

export default UpdateAccountFrom;
