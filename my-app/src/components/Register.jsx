import mainStyles from '../Styles.module.scss';
import styles from './Register.module.scss';
import aboutStyles from './About.module.scss';

export const Register = () => {
  return (
    <section className={aboutStyles.container}>
      <h3 className={styles.sectionTitle}>Working with POST request</h3>
      <div className={styles.registerSection}></div>
      <button className={mainStyles.disabled}> Sing up</button>
    </section>
  );
};
