import { Upload, Button, Select, Modal, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getStorage } from '@/utils/utils';
import { host } from '@/utils/config';
import reqwest from 'reqwest';

class Demo extends React.Component {
  state = {
    fileList: [],
    uploading: false
  };

  // static getDerivedStateFromProps(nextProps) {
  //   this.setState({
  //     fileList: [],
  //     uploading: false,
  //     type: 0,
  //   });
  // }

  handleUpload = () => {
    const { fileList } = this.state;
    
    this.setState({
      uploading: true,
    });

    console.log(fileList);

    var myHeaders = new Headers();

    myHeaders.append('UserToken', getStorage('UserToken'));

    var formdata = new FormData();
    formdata.append('Other', fileList[0]);

    fetch(`${host}/tradecenter/shares/markettime/batch/modify`, {
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
        title="导入上市时间数据"
        visible={modalVisible}
        onCancel={() => onCancel()}
        footer={null}
        width={600}
      >
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
