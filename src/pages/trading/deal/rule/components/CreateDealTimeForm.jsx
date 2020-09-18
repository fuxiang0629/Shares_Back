import { Button, Form, Input, Modal, TimePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useEffect } from 'react';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const CreateDealTimeForm = (props) => {
  const { modalVisible, onCancel, timeType, handleUpdateDealTime, values } = props;
  if (!modalVisible) return null;
  const [form] = Form.useForm();
  useEffect(() => {
    let dealTime = [];
    if (values[`Time${timeType}`]) {
      let timeList = values[`Time${timeType}`].split(',');
      timeList.map((item1, index1) => {
        let time = [],
          tempTimeList = item1.split('-');
        tempTimeList.map((item) => {
          time.push(moment(item, 'HH:mm:ss'));
        });
        dealTime.push({
          fieldKey: index1,
          isListField: true,
          key: index1,
          name: index1,
          time,
        });
      });
    }

    form.setFieldsValue({
      ...values,
      time: dealTime,
    });
  }, []);

  const onFinish = (values) => {
    let Time = '';
    values.time.map((item) => {
      Time += `${moment(item.time[0]).format('LTS')}-${moment(item.time[1]).format('LTS')},`;
    });
    Time = Time.substr(0, Time.length - 1);
    handleUpdateDealTime({ Time, Id: values.Id, Type: timeType });
  };

  return (
    <Modal
      destroyOnClose
      title={`编辑${
        timeType === 1
          ? '开市竞价'
          : timeType === 2
          ? '等待开市'
          : timeType === 3
          ? '开市时间'
          : '尾市竞价'
      }时间`}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={600}
    >
      <Form {...formItemLayoutWithOutLabel} onFinish={onFinish} form={form}>
        <Form.List name="time">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '交易时间' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, 'time']}
                      rules={[
                        {
                          required: true,
                          message: '请选择交易时间或删除该字段！',
                        },
                      ]}
                      noStyle
                    >
                      <TimePicker.RangePicker style={{ width: '60%' }} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: '60%' }}
                  >
                    <PlusOutlined />
                    {`添加${
                      timeType === 1
                        ? '开市竞价'
                        : timeType === 2
                        ? '等待开市'
                        : timeType === 3
                        ? '开市时间'
                        : '尾市竞价'
                    }时间`}
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item name="Id" label="Id" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateDealTimeForm;
