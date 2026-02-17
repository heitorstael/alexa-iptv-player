import type { Component } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import styles from './NotFound.module.scss';

import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

const NotFound: Component = () => {
  const navigate = useNavigate();
  const goHomepage = () => { navigate("/"); }

  return (
    <>
      <main class={styles.notFoundContainer}>
        <Header backButton={false} />
        <div class={styles.contentRow}>
          <p>Page not found!</p>
          <Button onClick={goHomepage} btnText="Go to homepage" />
        </div>
      </main>
    </>
  );
};

export default NotFound;
