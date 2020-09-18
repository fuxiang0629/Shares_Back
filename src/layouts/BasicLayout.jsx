/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import RightContent from '@/components/GlobalHeader/RightContent';
import Authorized from '@/utils/Authorized';
import { getAuthorityFromRouter, getStorage } from '@/utils/utils';
import ProLayout, { DefaultFooter, SettingDrawer } from '@ant-design/pro-layout';
import { Button, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, history, Link, useIntl } from 'umi';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less';
import PageTab from './PageTab';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="对不起，您没有权限访问此页。"
    extra={
      <Button type="primary">
        <Link to="/user/login">登录</Link>
      </Button>
    }
  />
);

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 米慧科技有限公司`}
    links={[
      {
        key: 'help',
        title: '帮助',
        href: '#',
        blankTarget: true,
      },
      {
        key: 'privacy',
        title: '隐私',
        href: '#',
        blankTarget: true,
      },
      {
        key: 'terms',
        title: '条款',
        href: '#',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    menuList,
    openKeys,
    selectedKeys,
    location = {
      pathname: '/',
    },
  } = props;
  const menuId = getStorage('menuId');
  const menuName = getStorage('menuName');

  console.log(props);

  // const [openKeys, setOpenKeys] = useState([]);
  // const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'global/getMenuList',
        payload: {
          FatherMenuId: menuId,
        },
      }).then((res) => {
        let firstPath;
        if (!res.ErrorCode) {
          firstPath = res.Data[0].routes[0].path;
          history.replace(firstPath);
        }
      });
    }
  }, []);

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  /**
   * 菜单展开
   * @param {*} e 
   */
  const handleOpenMenuChange = (e) => {
    console.log(e);
    if (dispatch) {
      dispatch({
        type: 'global/setOpenKeys',
        payload: e,
      });
    }
  };

  /**
   * 菜单选中
   * @param {*} e 
   */
  const handleOpenMenuClick = (e) => {
    if (dispatch) {
      dispatch({
        type: 'global/setSelectedKeys',
        payload: {
          path: e.key,
        },
      });
    }
  };
  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  const {} = useIntl();
  return (
    <>
      <ProLayout
        headerTitleRender={() => (
          <Link to="/home">
            <img src={logo} alt="" />
            <span className={styles.logo_tit}>{`饭票后台管理系统-${menuName}`}</span>
          </Link>
        )}
        onCollapse={handleMenuCollapse}
        menuProps={{
          openKeys: openKeys,
          selectedKeys: selectedKeys,
          onOpenChange: (e) => handleOpenMenuChange(e),
          onClick: (e) => handleOpenMenuClick(e),
        }}
        onMenuHeaderClick={() => history.push('/home')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={false}
        itemRender={false}
        footerRender={() => defaultFooterDom}
        menuDataRender={() => menuList}
        rightContentRender={() => <RightContent />}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          <PageTab>{children}</PageTab>
        </Authorized>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={(config) =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
};

export default connect(({ global, settings }) => ({
  ...global,
  settings,
}))(BasicLayout);
