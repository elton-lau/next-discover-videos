import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner/banner';
import Navbar from '../components/nav/navbar';
import Card from '../components/card/card';
import SectionCards from '../components/card/sectionCards';
import { getVideos } from '../lib/videos';
import { dehydrate, QueryClient, useQuery } from 'react-query';

export async function getServerSideProps(context) {
  const queryClient = new QueryClient()

  //const disneyVideos = await getVideos('disney trailer')
  await queryClient.prefetchQuery('disneyVideos', () => getVideos('disney trailer'))
  await queryClient.prefetchQuery('travelVideos', () =>  getVideos('travel'))
  await queryClient.prefetchQuery('productivityVideos', () =>  getVideos('productivity'))

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }, // will be passed to the page component as props
  }
}

export default function Home() {
  const { data: disneyVideos = [] } = useQuery('disneyVideos', () =>  getVideos('disney trailer'))
  const { data: travelVideos =[] } = useQuery('travelVideos', () =>  getVideos('travel'))
  const { data: productivityVideos =[] } = useQuery('productivityVideos', () => getVideos('productivity'))

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar username="elton@gmail.com" />
      <Banner title="Clifford the red dog" subTitle="a very cute dog" imgUrl="/static/clifford.webp" />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Travel" videos={travelVideos} size="small" />
        <SectionCards title="Productivity" videos={productivityVideos} size="medium" />
        <SectionCards title="Popular" videos={[]} size="small" />
      </div>


    </div>
  )
}
