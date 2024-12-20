import React from "react";
import styles from "./login.module.css";
import LoginForm from "./loginForm/loginForm";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
