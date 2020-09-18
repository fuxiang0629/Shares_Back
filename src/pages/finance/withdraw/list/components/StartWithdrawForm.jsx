import { host } from '@/utils/config';
import { getStorage } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Select, Upload, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { money_unit } from '@/utils/config';
import { queryFinanceAccountList } from '../service';

const StartWithdrawForm = (props) => {
  const { modalVisible, onCancel, handleStartWithdraw, values } = props;
  if (!modalVisible) return null;
  const [form] = Form.useForm();

  const [payAccountList, setPayAccountList] = useState([]);
  const [payChannel, setPayChannel] = useState('Alipay');
  const [payType, setPayType] = useState(2);

  useEffect(() => {
    queryFinanceAccountList({
      ChannelCode: 'Alipay',
      CashRecordId: values.Id,
      Type: 2,
    }).then((res) => {
      if (res) {
        setPayAccountList(res.Data);
      }
      console.log(res);
    });
  }, []);

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
          VoucherImg: ImgPath,
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  /**
   * 选择全部金额
   */
  const handleAllMoney = () => {
    const allPrice = (values.ApplyAmount / money_unit - values.CashedAmount / money_unit).toFixed(
      2,
    );
    form.setFieldsValue({
      ApplyAmount: allPrice,
    });
  };

  /**
   * 提交
   * @param {*} values
   */
  const handleSubmit = (val) => {
    const allPrice = (values.ApplyAmount / money_unit - values.CashedAmount / money_unit).toFixed(
      2,
    );
    if (val.ApplyAmount > 0 && val.ApplyAmount > allPrice) {
      message.error('提现金额有误！');
      return false;
    }
    handleStartWithdraw({
      ...val,
      ApplyAmount: val.ApplyAmount * money_unit,
    });
  };

  /**
   * 选择打款账户
   * @param {*} val
   */
  const handleSelectType = (val) => {
    setPayType(val);
    form.setFieldsValue({
      PaymentAccountId: null,
    });
    queryFinanceAccountList({
      ChannelCode: payChannel,
      CashRecordId: payType,
      Type: val,
    }).then((res) => {
      console.log(res);
      if (res) {
        setPayAccountList(res.Data);
      }
    });
  };

  /**
   * 选择渠道
   */
  const handleSelectChannel = (val) => {
    setPayChannel(val);
    form.setFieldsValue({
      PaymentAccountId: null,
    });
    queryFinanceAccountList({
      ChannelCode: val,
      CashRecordId: values.Id,
      Type: payType,
    }).then((res) => {
      console.log(res);
      if (res) {
        setPayAccountList(res.Data);
      }
    });
  };

  return (
    <Modal
      destroyOnClose
      title="提现"
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
        onFinish={handleSubmit}
        initialValues={{
          Id: values.Id,
          w_money: `${values.ApplyAmount / money_unit} 剩余金额:(${(
            values.ApplyAmount / money_unit -
            values.CashedAmount / money_unit
          ).toFixed(2)})`,
        }}
      >
        <Form.Item label="提现金额" name="w_money">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item label="支付类型" name="PaymentChannel">
          <Select onChange={handleSelectChannel}>
            <Select.Option value={`Alipay`}>支付宝</Select.Option>
            <Select.Option value={`WeChat`}>微信</Select.Option>
            <Select.Option value={`BankCard`}>卡卡</Select.Option>
            <Select.Option value={`Union`}>银联</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="打款方式" name="Type">
          <Select onChange={handleSelectType}>
            <Select.Option value={2}>转账</Select.Option>
            <Select.Option value={1}>退款</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="打款账户" name="PaymentAccountId">
          <Select>
            {payAccountList &&
              payAccountList.map((item, index) => {
                return (
                  <Select.Option key={index} value={item.PaymentAccountId}>
                    {item.PaymentAccountName}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>

        <Form.Item label="打款金额">
          <div style={{ display: 'flex', flexDirection: 'row', height: '30px' }}>
            <Form.Item name="ApplyAmount">
              <Input style={{ width: '345px' }} type="number" />
            </Form.Item>
            <Button style={{ marginLeft: '5px' }} type="primary" onClick={handleAllMoney}>
              全部
            </Button>
          </div>
        </Form.Item>

        <Form.Item label="转账凭证">
          <Upload {...uploadConfig}>
            <Button>
              <UploadOutlined /> 点击上传
            </Button>
          </Upload>
          &nbsp;
        </Form.Item>

        <Form.Item label="VoucherImg" name="VoucherImg" hidden={true}>
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

export default StartWithdrawForm;
