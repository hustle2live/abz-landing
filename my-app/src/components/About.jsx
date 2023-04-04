import mainStyles from '../Styles.module.scss';
import styles from './About.module.scss';

import Photo from './assets/photo-cover.svg';

export const About = () => {
  const GetCards = () => {};

  return (
    <div className={styles.container}>
      <h2>Working with GET request</h2>

      <section className={styles.cardSection}>
        <div className={styles.card}>
          <div className={styles.card__image}>
            <img src='' alt='candidate photo-picture' />
          </div>
          <p className={styles.card__name}>
            Salvador Stewart Flynn Thomas Salva Salve...
          </p>
          <div className={styles.card__description}>
            <p className={styles.card__description__position}>
              Leading specialist of the department of cent...
            </p>
            <p className={styles.card__description__email}>
              frontend_develop@gmail.com
            </p>
            <p className={styles.card__description__phone}>
              +38 (098) 278 44 24
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card__image}>
            <img src='' alt='candidate photo-picture' />
          </div>
          <p className={styles.card__name}>Takamaru Ayako Jurrien</p>
          <div className={styles.card__description}>
            <p className={styles.card__description__position}>
              Lead Independent Director
            </p>
            <p className={styles.card__description__email}>
              Takamuru@gmail.com
            </p>
            <p className={styles.card__description__phone}>
              +38 (098) 278 90 24
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card__image}>
            <img src='' alt='candidate photo-picture' />
          </div>
          <p className={styles.card__name}>Takamaru Ayako Jurrien</p>
          <div className={styles.card__description}>
            <p className={styles.card__description__position}>
              Lead Independent Director
            </p>
            <p className={styles.card__description__email}>
              Takamuru@gmail.com
            </p>
            <p className={styles.card__description__phone}>
              +38 (098) 278 90 24
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card__image}>
            <img src='' alt='candidate photo-picture' />
          </div>
          <p className={styles.card__name}>Takamaru Ayako Jurrien</p>
          <div className={styles.card__description}>
            <p className={styles.card__description__position}>
              Lead Independent Director
            </p>
            <p className={styles.card__description__email}>
              Takamuru@gmail.com
            </p>
            <p className={styles.card__description__phone}>
              +38 (098) 278 90 24
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card__image}>
            <img src='' alt='candidate photo-picture' />
          </div>
          <p className={styles.card__name}>Takamaru Ayako Jurrien</p>
          <div className={styles.card__description}>
            <p className={styles.card__description__position}>
              Lead Independent Director
            </p>
            <p className={styles.card__description__email}>
              Takamuru@gmail.com
            </p>
            <p className={styles.card__description__phone}>
              +38 (098) 278 90 24
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card__image}>
            <img src='' alt='candidate photo-picture' />
          </div>
          <p className={styles.card__name}>Takamaru Ayako Jurrien</p>
          <div className={styles.card__description}>
            <p className={styles.card__description__position}>
              Lead Independent Director
            </p>
            <p className={styles.card__description__email}>
              Takamuru@gmail.com
            </p>
            <p className={styles.card__description__phone}>
              +38 (098) 278 90 24
            </p>
          </div>
        </div>
      </section>
      <button className={`${styles.more} ${mainStyles.primary}`}>
        Show more
      </button>
    </div>
  );
};
