import styles from './Button.module.scss';

interface ButtonProps {
  onClick?: () => void;
  btnText: string;
}

const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        class={styles.btn}
        onClick={props.onClick}
      >
        {props.btnText}
      </button>
    </>
  );
};

export default Button;
