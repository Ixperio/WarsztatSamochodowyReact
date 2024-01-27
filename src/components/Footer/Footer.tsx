import { FC } from 'react';
import styles from './Footer.module.css';

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <div className={styles.Footer}>
    Made by <p className='author'>Artur L.</p> & <p className='author'>Marcin Ż.</p>
  </div>
);

export default Footer;
