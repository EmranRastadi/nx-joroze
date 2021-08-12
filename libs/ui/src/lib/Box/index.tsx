import styles from './style.module.scss';

/* eslint-disable-next-line */
export interface BoxProps {}

export function Box(props: BoxProps) {
  return (
    <div className={styles.container}>
      <h1>Welcome to Box!!!!</h1>
    </div>
  );
}

export default Box;
