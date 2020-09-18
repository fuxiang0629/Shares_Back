import { getStorage } from '@/utils/utils';
import { PictureOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Upload, DatePicker } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { ContentUtils } from 'braft-utils';
import React from 'react';
import { host } from '@/utils/config';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const uploadConfig = {
  name: 'MealTicket.Img',
  action: host + '/img/upload',
  headers: {
    UserToken: getStorage('UserToken'),
  },
};

class CreateTouTiaoForm extends React.Component {
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

    console.log('请输入内容！');
    console.log(content);

    if (!content) {
      message.error(`请输入内容！`);
      return false;
    }

    console.log(values);

    this.props.handleAdd({
      ...values,
      Content: this.state.content,
      StartShowTime: values.ShowTime[0],
      EndShowTime: values.ShowTime[1],
    });
  };

  componentWillReceiveProps() {
    this.setState({
      editorState: BraftEditor.createEditorState(null),
      content: '',
    });
  }

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
        title="添加头条"
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
            label="头条标题"
            name="Title"
            rules={[
              {
                required: true,
                message: '请输入标题!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="内容介绍"
            name="ContentIntroduction"
            rules={[
              {
                required: true,
                message: '请输入内容介绍!',
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="展示时间"
            name="ShowTime"
            rules={[
              {
                required: true,
                message: '请选择展示时间!',
              },
            ]}
          >
            <RangePicker showTime />
          </Form.Item>

          <Form.Item label="头条内容" name="Content">
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

export default CreateTouTiaoForm;
