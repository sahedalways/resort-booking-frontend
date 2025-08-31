"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/tours", label: "Tours" },
    { href: "/resorts", label: "Resorts" },
    { href: "/contact", label: "Contact" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="container header-container">
        <div className="logo">
          <i className="fas fa-sun"></i>
          <a href="/">
            <h1>
              Prokiti-<span>Bari</span>
            </h1>
          </a>
        </div>
        <nav className="desktop-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname === item.href ? "active" : ""}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-right">
          <Link href="/booking" className="btn btn-accent">
            Book Now
          </Link>
          <button className="mobile-menu-button" onClick={toggleMenu}>
            <span className="hamburger-icon"></span>
          </button>
        </div>
      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        navItems={navItems}
      />
    </header>
  );
};

export default Header;
