import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './navbar.module.css'
import Image from 'next/image'
import { useUserEmail, useSignOut, useAuthenticated } from '@nhost/react';


const Navbar = () => {
  const email = useUserEmail()
  const { signOut } = useSignOut()
  const isAuthenticated = useAuthenticated()

  useEffect(() => {
    console.log(isAuthenticated)
  }, [isAuthenticated])

  const [showDropdown, setShowDropdown] = useState(false)

  const handleShowDropdown = (e) => {
    e.preventDefault()
    setShowDropdown(!showDropdown)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" >
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>Netflix</div>
          </a>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navItem2}>
            <Link href="/browse/my-list">
              <a>My List</a>
            </Link>
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div className="">
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{email}</p>
              <Image src={'/static/expand_more.svg'} alt="Expand dropdown" width="24px" height="24px" />
            </button>

            {showDropdown && <div className={styles.navDropdown}>
              <div>
                <Link href="/login">
                  <a className={styles.linkName} onClick={signOut}>Sign out</a>
                </Link>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>}
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Navbar;