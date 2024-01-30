import { FC } from 'react';
import styles from './Footer.module.css';

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <div className={styles.Footer}>
    Made by <a className='author'>Artur L.</a> & <a className='author'>Marcin Ż.</a>
  </div>
);

export default Footer;
