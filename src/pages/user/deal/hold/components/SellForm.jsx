import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useRef, useState, useEffect } from 'react';

const SellForm = (props) => {
  const { modalVisible, onCancel, handleUpdate, values } = props;
  if (!modalVisible) return null;

  const [visibleSellPrice, setVisibleSellPrice] = useState(1);

  const handleChangeSellType = (value) => {
    console.log(value);
    setVisibleSellPrice(value);
  };

  return (
    <Modal
      destroyOnClose
      title={`卖出股票`}
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
          SharesName: `${values.SharesName}(${values.SharesCode})`,
        }}
      >
        <Form.Item label="HoldId" name="Id" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item label="股票名称" name="SharesName">
          <Input disabled/>
        </Form.Item>
        <Form.Item label="卖出数量" name="SellCount">
          <Input />
        </Form.Item>
        <Form.Item label="卖出类型" name="SellType">
          <Select onChange={handleChangeSellType}>
            <Select.Option value={1}>限价卖出</Select.Option>
            <Select.Option value={2}>市价卖出</Select.Option>
          </Select>
        </Form.Item>

        {visibleSellPrice == 1 && (
          <Form.Item label="卖出价格" name="SellPrice">
            <Input />
          </Form.Item>
        )}
        <Form.Item label="备注" name="Remark">
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

export default SellForm;
