import BackgroundImage from '../../assets/tyned_pexels-alexandr-podvalny.jpeg';
import BackgroundExtraLarge from '../../assets/bg_4256x2832.jpeg';
import BackgroundLarge from '../../assets/bg_2554x1699.jpg';
import BackgroundMedium from '../../assets/bg_1702x1133.jpg';
import BackgroundSmall from '../../assets/bg_766x510.jpg';

import Logo from '../../assets/Logo.svg';

import global from '../../styles/global.module.scss';
import styles from '../Header/Header.module.scss';

export const Header = () => {
   return (
      <header>
         <div id="top" className={styles.topBar}>
            <div className={styles.topBarContainer}>
               <div className={styles.logoElement}>
                  <a href="#top">
                     <img src={Logo} alt="logo svg" />
                  </a>
               </div>
               <div className={styles.topButtons}>
                  <button className={global.primary}>Users</button>
                  <button className={global.primary}>Sing up</button>
               </div>
            </div>
         </div>
         <div className={styles.mainSection}>
            <picture className={styles.backgroundImage}>
               <source
                  srcSet={BackgroundExtraLarge}
                  type="image/jpeg"
                  media="(min-width:1170px)"
               />
               <source
                  srcSet={BackgroundLarge}
                  type="image/jpeg"
                  media="(max-width:1170px)"
               />
               <source
                  srcSet={BackgroundMedium}
                  type="image/jpeg"
                  media="(max-width:1023px)"
               />
               <source
                  srcSet={BackgroundSmall}
                  type="image/jpeg"
                  media="(max-width:767px)"
               />
               <img
                  src={BackgroundImage}
                  alt="wheat field and blue sky as Ukraine freedom"
               />
            </picture>
            <h1>Test assignment for front-end developer</h1>
            <p>
               What defines a good front-end developer is one that has skilled
               knowledge of HTML, CSS, JS with a vast understanding of User
               design thinking as they'll be building web interfaces with
               accessibility in mind. They should also be excited to learn, as
               the world of Front-End Development keeps evolving.
            </p>
            <button className={global.primary}>Sing Up</button>
         </div>
      </header>
   );
};
