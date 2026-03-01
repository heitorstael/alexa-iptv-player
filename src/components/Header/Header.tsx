import { Show } from 'solid-js';
import styles from './Header.module.scss';

import { A } from "@solidjs/router";
import BackIcon from '../BackIcon/BackIcon';

interface HeaderProps {
  backButton: boolean;
  backText?: string;
  backPage?: string;
}

const Header = (props: HeaderProps) => {
  return (
    <>
      <header class={props.backButton ? styles.navHeader : styles.simpleHeader}>
        <Show when={props.backButton}>
          <nav>
            <A href={props.backPage || ""}><BackIcon /> {props.backText}</A>
          </nav>
        </Show>
        <h1>Alexa IPTV Player</h1>
      </header>
    </>
  );
};

export default Header;
