import Link from 'next/link';
import styles from './MobileMenu.module.css';
import { usePathname } from 'next/navigation';

const MobileMenu = ({ isOpen, toggleMenu, navItems }) => {
  const pathname = usePathname();

  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={toggleMenu}>
        <i className="fas fa-times"></i>
      </button>
      <ul>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={pathname === item.href ? styles.active : ''} onClick={toggleMenu}>
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/booking" className="btn btn-accent" onClick={toggleMenu}>Book Now</Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;