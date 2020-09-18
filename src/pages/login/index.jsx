import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';
import LoginFrom from './components/Login';
import styles from './style.less';
import md5 from 'js-md5';

const { UserName, Password, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginTop:25,
      marginBottom: 10,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  console.log(props);

  const { login = {}, submitting } = props;
  const { status } = login;
  const [rememberPwd, setRememberPwd] = useState(true);

  /**
   * 登录
   * @param {*} values
   */
  const handleSubmit = (values) => {

    const { dispatch } = props;
    const payload = {
      UserName: values.UserName,
      Password: md5(values.Password),
    };
    
    dispatch({
      type: 'login/login',
      payload: payload,
    });
  };

  return (
    <div className={styles.main}>
      <LoginFrom onSubmit={handleSubmit}>
        {status === 'error' && !submitting && <LoginMessage content="账户或密码错误" />}

        <div className={styles.content}>
          <UserName
            name="UserName"
            placeholder="账户"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="Password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </div>

        <div>
          <Checkbox checked={rememberPwd} onChange={(e) => setRememberPwd(e.target.checked)}>
            记住密码
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))(Login);
