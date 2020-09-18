import { getStorage } from '@/utils/utils';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, message } from 'antd';
import md5 from 'js-md5';
import React from 'react';
import { connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import ModifyPwdFrom from '../ModifyPwdFrom';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModifyPwd: false,
    };
  }

  onMenuClick = (event) => {
    const { key } = event;
    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      return;
    } else {
      this.setState({
        isShowModifyPwd: true,
      });
    }
  };

  handlePwdModalVisible = () => {
    this.setState({
      isShowModifyPwd: !this.state.isShowModifyPwd,
    });
  };

  handleUpdatePwd = (values) => {
    const { dispatch } = this.props;
    const payload = {
      OldPassword: md5(values.oldPassword),
      NewPassword: md5(values.password),
    };
    if (dispatch) {
      dispatch({
        type: 'home/updatePassWord',
        payload,
      }).then((res) => {
        if (!res.ErrorCode) {
          this.setState({
            isShowModifyPwd: false,
          });
          message.success('修改成功');
        } else {
          message.error(res.ErrorMessage);
        }
      });
    }
  };

  render() {
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="pwd">
          <UserOutlined />
          修改密码
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        <HeaderDropdown overlay={menuHeaderDropdown}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" className={styles.avatar} src="" alt="avatar" />
            <span className={`${styles.name} anticon`}>{getStorage('UserName')}</span>
          </span>
        </HeaderDropdown>
        <ModifyPwdFrom
          onCancel={this.handlePwdModalVisible}
          modalVisible={this.state.isShowModifyPwd}
          handleUpdatePwd={this.handleUpdatePwd}
        />
      </>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
