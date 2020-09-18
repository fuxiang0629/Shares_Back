import { getStorage } from '@/utils/utils';
import { PictureOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Upload } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { ContentUtils } from 'braft-utils';
import React, { PureComponent } from 'react';
import { host } from '@/utils/config';

const uploadConfig = {
  name: 'MealTicket.Img',
  action: host + '/img/upload',
  headers: {
    UserToken: getStorage('UserToken'),
  },
};

class UpdateRichForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(null),
      content: '',
    };
  }

  handleChange = (editorState) => {
    this.setState({
      editorState,
      content: editorState.toHTML(),
    });
  };

  uploadHandler = async (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
      const {
        file: {
          response: {
            Data: { ImgUrl },
          },
        },
      } = info;

      this.setState({
        editorState: ContentUtils.insertMedias(this.state.editorState, [
          {
            type: 'IMAGE',
            url: ImgUrl,
          },
        ]),
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };

  handleValidateFrom = (values) => {


    console.log(this.state.content)
    console.log(values)

    const { content } = this.state;
    if (!content) {
      message.error(`请输入参数值！`);
      return false;
    }
    this.props.handleUpdate({ ...values, ParValue: content });
  };

  componentWillReceiveProps(nextProps) {
    const {
      values: { ParValue },
    } = nextProps;

    this.setState({
      editorState: BraftEditor.createEditorState(ParValue),
      content: ParValue,
    });
  }

  render() {
    const { modalVisible, onCancel, values } = this.props;
    if (!modalVisible) return null;

    const controls = [
      'bold',
      'italic',
      'underline',
      'text-color',
      'separator',
      'link',
      'separator',
    ];

    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            {...uploadConfig}
            name="MealTicket.Img"
            showUploadList={false}
            onChange={(info) => this.uploadHandler(info)}
          >
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              <PictureOutlined />
            </button>
          </Upload>
        ),
      },
    ];

    return (
      <Modal
        destroyOnClose
        title="编辑支付参数"
        visible={modalVisible}
        onCancel={() => onCancel()}
        width={750}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          onFinish={this.handleValidateFrom}
          initialValues={{
            ...values,
          }}
        >
          <Form.Item label="参数名" name="ParName">
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label="参数描述" name="ParDescription">
            <Input />
          </Form.Item>

          <Form.Item
            label="参数值"
            name="ParValue"
          >
            <div className="editor-wrapper">
              <BraftEditor
                value={this.state.editorState}
                onChange={this.handleChange}
                controls={controls}
                extendControls={extendControls}
              />
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" block htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default UpdateRichForm;
