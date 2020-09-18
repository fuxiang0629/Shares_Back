import { getStorage } from '@/utils/utils';
import { PictureOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Upload } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { ContentUtils } from 'braft-utils';
import React from 'react';
import { host } from '@/utils/config';

const uploadConfig = {
  name: 'MealTicket.Img',
  action: host + '/img/upload',
  headers: {
    UserToken: getStorage('UserToken'),
  },
};

class CreateQuestionForm extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    editorState: BraftEditor.createEditorState(null),
    content: '',
  };

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
    const { content } = this.state;
    if (!content) {
      message.error(`请输入答案！`);
      return false;
    }
    this.props.handleAdd({ ...values, Answer: this.state.content });
  };

  render() {
    const controls = [
      'bold',
      'italic',
      'underline',
      'text-color',
      'separator',
      'link',
      'separator',
    ];
    const { modalVisible, onCancel } = this.props;
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
        title="添加问题"
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
        >
          <Form.Item
            label="问题名称"
            name="Name"
            rules={[
              {
                required: true,
                message: '请输入问题名称!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="问题排序"
            name="OrderIndex"
            rules={[
              {
                required: true,
                message: '请输入问题排序!',
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="问题答案"
            name="Answer"
            rules={[
              {
                required: true,
              },
            ]}
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

export default CreateQuestionForm;
