// src/components/Footer.js
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h2>About Me</h2>
          <p>
  Welcome to our space! Moms from all around the world, let&apos;s come together to share our experiences, support one another, and dive into the beautiful journey of motherhood. Whether you&apos;re an immigrant mom or a mom from any corner of the globe, this blog is a place for all of us to connect, learn, and grow together.
</p>
        </div>
        <div className={styles.footerSection}>
          <h2>Quick Links</h2>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact Me</Link></li>
            <li><Link href="/productsreview">Products Review</Link></li>
            <li><Link href="/food">Recipe</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h2>Follow Me</h2>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </a>
            <a
              href="https://www.instagram.com/the_stylishmama?igsh=MWhmaXJoYWRlNDRhOA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h2>Contact Me</h2>
          <p>
            <FontAwesomeIcon icon={faEnvelope} size="lg" /> fatimarezaie1234@gmail.com
          </p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </footer>
  );
}
