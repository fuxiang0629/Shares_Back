import { Button, Form, Input, Modal, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { queryBrokerAccountList } from '../../list/service';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const ShowAccountForm = (props) => {
  const { modalVisible, onCancel, values } = props;
  if (!modalVisible) return null;

  const [brokerAccountList, setBrokerAccountList] = useState([]);

  useEffect(() => {
    queryBrokerAccountList({
      current: 1,
      pageSize: 1000,
      ServerId: values.ServerId,
    }).then((res) => {
      setBrokerAccountList(res.Data.List);
    });
  }, []);

  console.log(values);

  return (
    <Modal
      destroyOnClose
      title="证券账户列表"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Card>
        {brokerAccountList.map((item, index) => {
          return (
            <Card.Grid key={index} hoverable={false} style={gridStyle}>
              {item.BrokerName}
            </Card.Grid>
          );
        })}
      </Card>
    </Modal>
  );
};

export default ShowAccountForm;
