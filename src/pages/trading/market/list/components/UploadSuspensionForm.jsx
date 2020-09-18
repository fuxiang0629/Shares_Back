import { Upload, Button, Select, Modal, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getStorage } from '@/utils/utils';
import { host } from '@/utils/config';
import reqwest from 'reqwest';

class Demo extends React.Component {
  state = {
    fileList: [],
    uploading: false,
    type: 0,
  };

  // static getDerivedStateFromProps(nextProps) {
  //   this.setState({
  //     fileList: [],
  //     uploading: false,
  //     type: 0,
  //   });
  // }

  handleUpload = () => {
    const { fileList, type } = this.state;
    if (!type) {
      message.error('请选择停复牌类型！');
      return;
    }

    this.setState({
      uploading: true,
    });

    console.log(fileList);

    var myHeaders = new Headers();

    myHeaders.append('UserToken', getStorage('UserToken'));

    var formdata = new FormData();
    formdata.append('Other', fileList[0]);
    formdata.append('Type', type);

    fetch(`${host}/tradecenter/shares/suspensionstatus/batch/modify`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.ErrorCode) {
          this.props.onCancel();
          this.props.handleRefresh();
        }
      })
      .catch((error) => {
        message.error('上传错误');
      })
      .finally(() => {
        this.setState({
          uploading: false,
        });
      });
  };

  handleSelectType = (value) => {
    console.log(value);

    this.setState({
      type: value,
    });
  };



  render() {
    const { uploading, fileList } = this.state;
    const { modalVisible, onCancel } = this.props;
    const props = {
      multiple: false,
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState((state) => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <Modal
        title="批量导入停/复牌数据"
        visible={modalVisible}
        onCancel={() => onCancel()}
        footer={null}
        width={600}
      >
        <Space>
          类型：
          <Select
            onChange={this.handleSelectType}
            placeholder="请选择停复牌类型"
            style={{ width: 200, marginRight: 10 }}
          >
            <Select.Option value={1}>停牌</Select.Option>
            <Select.Option value={2}>复牌</Select.Option>
          </Select>
        </Space>

        <Upload {...props}>
          <Button>
            <UploadOutlined /> 选择文件
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? '导入' : '开始导入'}
        </Button>
      </Modal>
    );
  }
}

export default Demo;
