import { getPageQuery } from '@/utils/utils';
import { ReloadOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, message, Tooltip } from 'antd';
import { useParams } from 'umi';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import UpdateRichForm from './components/UpdateRichForm';
import { queryPaymentArgsList, updatePaymentArgs } from './service';

/**
 * 更新支付参数
 * @param fields
 */

const handleUpdate = async (queryParams, fields) => {
  const hide = message.loading('正在更新');
  try {
    await updatePaymentArgs({ ...fields, PaymentAccountId: queryParams.id });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList = () => {
  const [updateModalVisible, handleModalVisible] = useState(false);
  const [updateRichModalVisible, handleRichModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef();
  const queryParams = useParams();

  const columns = [
    {
      title: '参数名',
      dataIndex: 'ParName',
    },
    {
      title: '参数值',
      dataIndex: 'ParValue',
      hideInSearch: true,
      render: (_, record) => (
        <>
          {record.ParValue ? (
            <Tooltip placement="topLeft" title={record.ParValue}>{`${record.ParValue.substring(
              0,
              20,
            )}...`}</Tooltip>
          ) : (
            <span>-</span>
          )}
        </>
      ),
    },
    {
      title: '描述',
      dataIndex: 'ParDescription',
      hideInSearch: true,
      valueType: 'textarea',
    },
    {
      title: '更新时间',
      dataIndex: 'LastModified',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {record.ParName !== 'app_id' &&
            record.ParName !== 'seller_id' &&
            record.ParName !== 'mch_id' && (
              <>
                {record.ParName !== 'Other' ? (
                  <a
                    onClick={() => {
                      handleModalVisible(true);
                      setFormValues(record);
                    }}
                  >
                    编辑
                  </a>
                ) : (
                  <a
                    onClick={() => {
                      handleRichModalVisible(true);
                      setFormValues(record);
                    }}
                  >
                    编辑
                  </a>
                )}
              </>
            )}
        </>
      ),
    },
  ];
  return (
    <>
      <ProTable
        search={{
          collapsed: false,
          collapseRender: false,
        }}
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
          density: false,
        }}
        headerTitle={false}
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          >
            <ReloadOutlined />
            刷新
          </Button>,
        ]}
        rowKey="ParName"
        request={(params, sorter, filter) =>
          queryPaymentArgsList({ ...params, sorter, filter, queryParams }).then((res) => {
            const result = {
              data: res.Data,
            };
            return result;
          })
        }
        columns={columns}
      />
      <UpdateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={updateModalVisible}
        handleUpdate={async (value) => {
          const success = await handleUpdate(queryParams, value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        values={formValues}
      />
      <UpdateRichForm
        onCancel={() => handleRichModalVisible(false)}
        modalVisible={updateRichModalVisible}
        handleUpdate={async (value) => {
          const success = await handleUpdate(queryParams, value);
          if (success) {
            handleRichModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        values={formValues}
      />
    </>
  );
};

export default TableList;
