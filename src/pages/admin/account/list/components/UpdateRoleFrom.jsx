import { Button, Form, Input, Modal, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { queryRoleList } from '../../role/service';

const UpdateRoleFrom = (props) => {
  const { modalVisible, onCancel, handleUpdateRole, values } = props;
  if (!modalVisible) return null;
  const [form] = Form.useForm();
  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    queryRoleList({
      current: 1,
      pageSize: 1000,
      AccountId: values.AccountId,
    }).then((res) => {
      console.log(res);

      let list = res.Data.List,
        options = [],
        checkList = [];
      list.map((item) => {
        options.push({ label: item.RoleName, value: item.RoleId });
        if (item.IsCheck) {
          checkList.push(item.RoleId);
        }
      });

      setRoleList(options);
      form.setFieldsValue({
        role: checkList,
      });
    });
  }, []);

  return (
    <Modal
      destroyOnClose
      title="更新角色列表"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={600}
    >
      <Form
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdateRole}
        form={form}
        initialValues={{
          ...values,
        }}
      >
        <Form.Item label="AccountId" name="AccountId" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item name="role">
          <Checkbox.Group options={roleList} />
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

export default UpdateRoleFrom;
