import { splitProps, JSX } from 'solid-js';
import styles from './Button.module.scss';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  btnText: string;
  secondary?: boolean;
}

const Button = (props: ButtonProps) => {
  const [local, buttonProps] = splitProps(props, ['onClick', 'btnText', 'secondary']);

  return (
    <>
      <button {...buttonProps}
        class={styles.btn + ' ' + (local.secondary && styles.secondary)}
        onClick={local.onClick}
      >
        {local.btnText}
      </button>
    </>
  );
};

export default Button;
