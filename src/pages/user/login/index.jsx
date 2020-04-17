import { Alert } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';
import styles from './style.less';
import LoginFrom from './components/Login';

const { UserName, Password, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userAndlogin = {}, submitting } = props;
  const { status, type: loginType } = userAndlogin;
  const [type, setType] = useState('account');

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'userAndlogin/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content="账户或密码错误（admin/ant.design）" />
        )}

        <UserName
          name="username"
          placeholder="Enter username"
          rules={[
            {
              required: true,
              message: 'Username is require!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="Enter password"
          rules={[
            {
              required: true,
              message: 'Password is require!',
            },
          ]}
        />

        <Submit loading={submitting}>Login</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(({ userAndlogin, loading }) => ({
  userAndlogin,
  submitting: loading.effects['userAndlogin/login'],
}))(Login);
