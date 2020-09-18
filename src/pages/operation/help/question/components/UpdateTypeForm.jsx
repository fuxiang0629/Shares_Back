import { Button, Checkbox, Col, Form, Input, Modal, Row } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { queryQuestionCategoryList } from '../../category/service';

const UpdateTypeForm = (props) => {
  const { modalVisible, onCancel, handleUpdateType, values } = props;
  if (!modalVisible) return null;

  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    queryQuestionCategoryList({
      current: 1,
      pageSize: 1000,
      QuestionId: values.Id,
    }).then((res) => {
      let list = res.Data.List;
      let options = [];
      let checkList = [];
      list.map((item) => {
        options.push({ label: item.TypeName, value: item.Id });
        if (item.IsCheck) {
          checkList.push(item.Id);
        }
      });
      setCategoryList(options);
      form.setFieldsValue({
        type: checkList,
      });
    });
  }, []);


  return (
    <Modal
      destroyOnClose
      title="所属分类"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdateType}
        form={form}
        initialValues={{
          ...values,
        }}
      >
        <Form.Item label="问题名称：" name="Name">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item name="type" label="所属分类：">
          <Checkbox.Group options={categoryList}/>
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

export default UpdateTypeForm;
