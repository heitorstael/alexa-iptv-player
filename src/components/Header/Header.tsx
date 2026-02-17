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
        {props.backButton &&
          <nav>
            <A href={props.backPage || ""}><BackIcon /> {props.backText}</A>
          </nav>
        }
        <h1>Alexa IPTV Player</h1>
      </header>
    </>
  );
};

export default Header;
