import mainStyles from '../../styles/styles.module.scss';
import headStyles from '../Header/Header.module.scss';

import Logo from '../../assets/Logo.svg';
import BackgroundImage from '../../assets/pexels-alexandr-podvalny-1227513.jpeg';

export const Header = () => {
  return (
    <header>
      <div className={headStyles.topBar}>
        <div className={headStyles.topBarContainer}>
          <div className={headStyles.logoElement}>
            <a href='#'>
              <img src={Logo} alt='logo svg' />
            </a>
          </div>
          <div className={headStyles.topButtons}>
            <button className={mainStyles.primary}>Users</button>
            <button className={mainStyles.primary}>Sing up</button>
          </div>
        </div>
      </div>
      <div className={headStyles.mainSection}>
        <div className={headStyles.backgroundImage}>
          <img
            src={BackgroundImage}
            alt='wheat field and blue sky as Ukraine freedom'
          />
        </div>
        <h1>Test assignment for front-end developer</h1>
        <p>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <button className={mainStyles.primary}>Sing Up</button>
      </div>
    </header>
  );
};
