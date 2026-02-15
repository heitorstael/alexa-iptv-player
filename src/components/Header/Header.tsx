import styles from './Header.module.scss';

interface HeaderProps {
  backButton: boolean;
  backText?: string;
  backPage?: string;
}

const Header = (props: HeaderProps) => {
  return (
    <>
      <header class={styles.headerContainer}>
        {props.backButton &&
          <nav>
            <a href="http://">&lt;</a>
          </nav>
        }
        <h1>Alexa IPTV Player</h1>
      </header>
    </>
  );
};

export default Header;
