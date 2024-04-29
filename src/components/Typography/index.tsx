import styles from "./typography.module.scss";

type Props = {
  children: React.ReactNode;
};

export const H1: React.FC<Props> = ({ children }) => (
  <h1 className={styles.h1}>{children}</h1>
);

export const H2: React.FC<Props> = ({ children }) => (
  <h2 className={styles.h2}>{children}</h2>
);

export const H3: React.FC<Props> = ({ children }) => (
  <h3 className={styles.h3}>{children}</h3>
);

export const H4: React.FC<Props> = ({ children }) => (
  <h4 className={styles.h4}>{children}</h4>
);

export const H5: React.FC<Props> = ({ children }) => (
  <h5 className={styles.h5}>{children}</h5>
);
