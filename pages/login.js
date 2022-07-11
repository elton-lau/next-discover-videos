
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Login.module.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSignInEmailPasswordless } from '@nhost/nextjs';

const Login = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   const handleComplete = () => {
  //     // setIsLoading(false)
  //   }
  //   router.events.on('routeChangeComplete', handleComplete);
    //   router.events.on('routeChangeError', handleComplete);

    //   return () => {
      //     router.events.off('routeChangeComplete', handleComplete);
      //     router.events.off('routeChangeError', handleComplete);
      //   }
  // }, [router])

  const [userMsg, setUserMsg] = useState('');
  const [email, setEmail] = useState('');
  const { signInEmailPasswordless, isLoading, isSuccess, isError, error } =
  useSignInEmailPasswordless()


  const handleOnChangeEmail = (e) => {
    setUserMsg('')
    const email = e.target.value
    setEmail(email)
  }


  const handleLoginWithEmail = async (e) => {
    e.preventDefault()
    if (email) {
      if (email === 'twilightlau94@gmail.com') {
        // Magic Link sign in
        try {
          const status = await signInEmailPasswordless(email)
          console.log({status})
          // handled already by nhost Auth
          // if (isSuccess) {
          //   router.push('/')   
          // }
        } catch {
          console.error('Something went wrong when logging in')
        }
        // route to dashboard

      } else {
        setUserMsg('Something went wrong when logging in')
      }
    } else {
      // show user message
      setUserMsg('Enter a valid email address')
    }
    
  }

  return <div className={styles.container}>
    <Head>
      <title>Netflix SignIn</title>
    </Head>

    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link href="/" >
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>Netflix</div>
          </a>
        </Link>
      </div>
    </header>

    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <h1 className={styles.signinHeader}>Sign In</h1>
        <input type="text" placeholder="Email address" className={styles.emailInput} onChange={handleOnChangeEmail} />
        <p className={styles.userMsg}>{userMsg}</p>
        <button onClick={handleLoginWithEmail} className={styles.loginBtn}>{isLoading ? 'Loading...' : 'Sign In'}</button>
      </div>
    </main>

  </div>;
};

export default Login;