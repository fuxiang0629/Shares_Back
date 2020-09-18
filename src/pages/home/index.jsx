import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Menu, Dropdown, Row, Col, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.less';
import ModifyPwdFrom from '@/components/ModifyPwdFrom';
import { getStorage, setStorage } from '@/utils/utils';
import md5 from 'js-md5';

/**
 * 点击跳转菜单
 * @param {*} id
 * @param {*} name
 */
const handleMenuItem = (item) => {
  const { id, name, path } = item;
  setStorage('menuId', id);
  setStorage('menuName', name);
  history.push({
    pathname: path,
  });
};

const Home = (props) => {
  const {
    dispatch,
    home: { menuList },
  } = props;
  const [modifyPwdModalVisible, handleModifyPwdModalVisible] = useState(false);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'home/getMenuList',
        payload: {
          FatherMenuId: 0,
        },
      });
    }
  }, []);

  const handleUpdatePwd = async (values) => {
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
          handleModifyPwdModalVisible(false);
          message.success('修改成功');
        } else {
          message.success('修改失败');
        }
      });
    }
  };

  const logout = () => {
    dispatch({
      type: 'login/logout',
    });
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          onClick={() => {
            handleModifyPwdModalVisible(true);
          }}
        >
          修改密码
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          onClick={() => {
            logout();
          }}
        >
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img className={styles.logo_img} src={require('../../assets/logo.png')} alt="" />
          <span className={styles.logo_txt}>饭票后台管理系统</span>
        </div>

        <div>
          <Dropdown overlay={menu}>
            <a className={styles.dropdown_txt} onClick={(e) => e.preventDefault()}>
              {getStorage('UserName')} <DownOutlined max="36" style={{fontSize:"14px"}} />
            </a>
          </Dropdown>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.menu}>
          <Row>
            {menuList &&
              menuList.map((item, index) => {
                return (
                  <Col key={index} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <div className={styles.menu_item} onClick={() => handleMenuItem(item)}>
                      <img className={styles.menu_icon} src={item.icon} alt="" />
                      <span>{item.name}</span>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
      <ModifyPwdFrom
        onCancel={() => handleModifyPwdModalVisible(false)}
        modalVisible={modifyPwdModalVisible}
        handleUpdatePwd={handleUpdatePwd}
      />
    </div>
  );
};

export default connect(({ home, login, loading }) => ({
  home,
  login,
  getMenuList: loading.effects['home/getMenuList'],
  updatePassWord: loading.effects['home/updatePassWord'],
  logout: loading.effects['login/logout'],
}))(Home);
