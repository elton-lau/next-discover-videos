import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner/banner';
import Navbar from '../components/nav/navbar';
import Card from '../components/card/card';
import SectionCards from '../components/card/sectionCards';
import { getVideos, getPopularVideos } from '../lib/videos';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { authProtected } from '../components/authProtected'

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  //const disneyVideos = await getVideos('disney trailer')
  await queryClient.prefetchQuery('disneyVideos', () => getVideos('disney trailer'))
  await queryClient.prefetchQuery('travelVideos', () => getVideos('travel'))
  await queryClient.prefetchQuery('productivityVideos', () => getVideos('productivity'))
  await queryClient.prefetchQuery('popularVideos', () => getPopularVideos())

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }, // will be passed to the page component as props
  }
}

function Home(props) {
  const { data: disneyVideos = [], isLoading, isError, error } = useQuery('disneyVideos', () => getVideos('disney trailer'))
  const { data: travelVideos = [] } = useQuery('travelVideos', () => getVideos('travel'))
  const { data: productivityVideos = [] } = useQuery('productivityVideos', () => getVideos('productivity'))
  const { data: popularVideos = [] } = useQuery('popularVideos', () => getPopularVideos())

  if (isError) {
    console.error('YouTube API error', error)
    return []
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <Navbar username="elton@gmail.com" />
        <Banner title="Clifford the red dog" subTitle="a very cute dog" imgUrl="/static/clifford.webp" />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards title="Productivity" videos={productivityVideos} size="medium" />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  )
}

export default authProtected(Home)