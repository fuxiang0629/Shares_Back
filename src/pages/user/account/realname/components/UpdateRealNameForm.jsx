import { Button, DatePicker, Form, Input, Modal, Select, Space, Row, Col } from 'antd';
import moment from 'moment';
import React from 'react';

const UpdateRealNameForm = (props) => {
  const { modalVisible, onCancel, handleUpdateRealName, values } = props;
  if (!modalVisible) return null;
  const [visibleRejectModal, handleVisibleRejectModal] = React.useState(false);
  const [rejectDesc, handleRejectDesc] = React.useState(false);
  const [form] = Form.useForm();

  console.log(values);

  const handleCheckRealName = (result) => {
    console.log(result);
    console.log('审核按钮');

    if (!result) {
      handleVisibleRejectModal(true);
    } else {
      handleSubmit(1);
    }
  };

  const handleSubmit = (result) => {
    handleUpdateRealName({
      AccountId: values.AccountId,
      ExamineStatus: result ? 2 : 3,
      ExamineStatusDes: rejectDesc,
    });
  };

  return (
    <>
      <Modal
        destroyOnClose
        title={`实名认证审核-${values.RealName}`}
        visible={modalVisible}
        onCancel={() => onCancel()}
        width={600}
        footer={null}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          initialValues={{
            ...values,
            BirthDay: moment(values.BirthDay),
          }}
        >
          <Form.Item label="AccountId" name="AccountId" hidden={true}>
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label="身份证">
            <Space>
              <Form.Item>
                <a href={values.ImgUrlFrontShow} target="_blank">
                  <img
                    style={{ width: '200px', height: '150px' }}
                    src={values.ImgUrlFrontShow}
                    alt=""
                  />
                </a>
              </Form.Item>
              <Form.Item>
                <a href={values.ImgUrlBackShow} target="_blank">
                  <img
                    style={{ width: '200px', height: '150px' }}
                    src={values.ImgUrlBackShow}
                    alt=""
                  />
                </a>
              </Form.Item>
            </Space>
          </Form.Item>

          <Form.Item label="姓名" name="RealName">
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label="性别" name="Sex">
            <Select disabled={true}>
              <Select.Option value={0}>未知</Select.Option>
              <Select.Option value={1}>男</Select.Option>
              <Select.Option value={2}>女</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="出生年月" name="BirthDay">
            <DatePicker disabled={true} />
          </Form.Item>
          <Form.Item label="身份证号码" name="CardNo">
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label="住址" name="Address">
            <Input.TextArea rows={4} disabled={true} />
          </Form.Item>

          {values.ExamineStatus !== 3 && values.ExamineStatus !== 2 && (
            <Row justify="end">
              <Col span={4}>
                <Button
                  onClick={() => {
                    handleCheckRealName(0);
                  }}
                  type="primary"
                >
                  拒绝
                </Button>
              </Col>
              <Col span={4}>
                <Button
                  onClick={() => {
                    handleCheckRealName(1);
                  }}
                  type="primary"
                >
                  通过
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </Modal>

      <Modal
        title="拒绝原因"
        visible={visibleRejectModal}
        onOk={() => {
          handleSubmit(0);
        }}
        onCancel={() => {
          handleVisibleRejectModal(false);
        }}
      >
        <Form>
          <Form.Item label="拒绝理由" name="testq">
            <Input.TextArea rows={4} onChange={(event) => handleRejectDesc(event.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateRealNameForm;
