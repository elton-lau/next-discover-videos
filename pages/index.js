import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner/banner';
import Navbar from '../components/nav/navbar';
import Card from '../components/card/card';
import SectionCards from '../components/card/sectionCards';

export default function Home() {

  const DISNEY_VIDEOS = [
    {
      imgUrl: '/static/clifford.webp'
    },
    {
      imgUrl: '/static/clifford.webp'
    },
    {
      imgUrl: '/static/clifford.webp'
    },
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Navbar username="elton@gmail.com" />
        <Banner title="Clifford the red dog" subTitle="a very cute dog" imgUrl="/static/clifford.webp"  />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={DISNEY_VIDEOS} size="large" /> 
          <SectionCards title="Disney" videos={DISNEY_VIDEOS} size="medium" /> 
        </div>


    </div>
  )
}
