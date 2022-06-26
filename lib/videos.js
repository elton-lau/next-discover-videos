import VIEDO_DATA from '../data/videos.json'

export const getCommonVideos = async (url) => {

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

  const BASE_URL = 'youtube.googleapis.com/youtube/v3'

  const response = await fetch(`https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}&maxResults=25`)
  const data = await response.json();

  return data.items.map(item => {
    const id = item.id?.videoId || item.id
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id
    }
  })
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`
  return getCommonVideos(URL)
}

export const getPopularVideos = () => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=HK`
  return getCommonVideos(URL)
}