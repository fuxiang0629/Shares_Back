import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { queryBrokerList } from '../../dealer/service';
import { queryBrokerSdList } from '../../dealer/sd/service';
import { queryServerList } from '../../server/service';

const CreateAccountFrom = (props) => {
  const { modalVisible, onCancel, handleAdd } = props;
  if (!modalVisible) return null;

  const [brokerList, setBrokerList] = useState([]);
  const [serverList, setServerList] = useState([]);
  const [brokerSdList, setBrokerSdList] = useState([]);


  useEffect(() => {
    queryBrokerList({
      current: 1,
      pageSize: 1000,
    }).then((res) => {
      console.log('券商列表');
      console.log(res);
      setBrokerList(res.Data.List);
    });
    
    
    queryServerList({
      current: 1,
      pageSize: 1000,
    }).then((res) => {
      console.log('服务器列表');
      console.log(res);
      setServerList(res.Data.List);
    });
  }, []);

  const handleSelectBroker = async (code) => {
    let brokerSdList = await queryBrokerSdList({ current: 1, pageSize: 100, BrokerCode: code });


    setBrokerSdList(brokerSdList.Data.List)
    console.log(brokerSdList);

    console.log('选择券商');
    console.log(code);
  };

  return (
    <Modal
      destroyOnClose
      title="添加股票账户"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={680}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleAdd}
      >
        <Form.Item
          label="账户Code"
          name="AccountCode"
          rules={[
            {
              required: true,
              message: '请输入账户Code!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="账号类型"
          name="AccountType"
          rules={[
            {
              required: true,
              message: '请输入账号类型!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="账户号"
          name="AccountNo"
          rules={[
            {
              required: true,
              message: '请输入账户号!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="深市资金账户"
          name="TradeAccountNo0"
          rules={[
            {
              required: true,
              message: '请输入深市资金账户!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="沪市资金账户"
          name="TradeAccountNo1"
          rules={[
            {
              required: true,
              message: '请输入沪市资金账户!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="深市股东代码"
          name="Holder0"
          rules={[
            {
              required: true,
              message: '请输入深市股东代码!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="沪市股东代码"
          name="Holder1"
          rules={[
            {
              required: true,
              message: '请输入沪市股东代码!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="初始资金"
          name="InitialFunding"
          rules={[
            {
              required: true,
              message: '请输入初始资金!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="券商code"
          name="BrokerCode"
          rules={[
            {
              required: true,
              message: '请选择券商!',
            },
          ]}
        >
          <Select onChange={handleSelectBroker}>
            {brokerList.map((item, index) => {
              return (
                <Select.Option key={index} value={item.BrokerCode}>
                  {item.BrokerName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="营业部code"
          name="DepartmentCode"
          rules={[
            {
              required: true,
              message: '请选择营业部code!',
            },
          ]}
        >
          <Select onChange={handleSelectBroker}>
            {brokerSdList.map((item, index) => {
              return (
                <Select.Option key={index} value={item.DepartmentCode}>
                  {item.DepartmentName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
       
        <Form.Item
          label="服务器ID"
          name="ServerId"
          rules={[
            {
              required: true,
              message: '请选择服务器!',
            },
          ]}
        >
          <Select>
            {serverList.map((item, index) => {
              return (
                <Select.Option key={index} value={item.ServerId}>
                  {item.ServerDes}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="JyPassword"
          label="交易密码"
          rules={[
            {
              required: true,
              message: '请输入您的交易密码!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="TxPassword"
          label="通讯密码"
          rules={[
            {
              required: true,
              message: '请输入您的通讯密码!',
            },
          ]}
          hasFeedback
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

export default CreateAccountFrom;
