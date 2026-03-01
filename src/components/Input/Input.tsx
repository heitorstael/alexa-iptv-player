import { splitProps, JSX, Show } from 'solid-js';
import styles from './Input.module.scss';

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = (props: InputProps) => {
  const [local, inputProps] = splitProps(props, ['label']);

  return (
    <>
      <div class={styles.inputContainer}>
        <Show when={local.label}>
          <label for={inputProps.id} class={styles.labelText}>{local.label}</label>
        </Show>
        <input {...inputProps} class={styles.inputBox} />
      </div>
    </>
  );
};

export default Input;
