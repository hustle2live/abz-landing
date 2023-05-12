import BackgroundImage from '../../assets/1x1.png';
import Logo from '../../assets/Logo.svg';

import global from '../../styles/global.module.scss';
import styles from '../Header/Header.module.scss';

export const Header = () => {
   return (
      <>
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
            <div className={styles.backgroundImage}>
               <img
                  src={BackgroundImage}
                  alt="wheat field and blue sky as Ukraine freedom"
               />
            </div>
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
      </>
   );
};
