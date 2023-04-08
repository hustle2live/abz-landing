import styles from './RegisterMessage.module.scss';
import SuccessImage from './assets/success-image.svg';

export const RegisterMessage = () => (
  <div className={styles.register__message}>
    <p className={styles.register__message__text}>
      User successfully registered
    </p>
    <div className={styles.register__message__picture}>
      <img src={SuccessImage} alt='worker succesfully send a file' />
    </div>
  </div>
);
