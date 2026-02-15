import type { Component } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import styles from './NotFound.module.scss';

import Button from '../../components/Button/Button';

const NotFound: Component = () => {
  const navigate = useNavigate();
  const goHomepage = () => { navigate("/"); }

  return (
    <>
      <main class={styles.notFoundContainer}>
        <h1>Page not found!</h1>
        <Button onClick={goHomepage} btnText="Go to homepage" />
      </main>
    </>
  );
};

export default NotFound;
