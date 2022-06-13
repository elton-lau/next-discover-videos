
import Card from './card';
import styles from './sectionCards.module.css';

const SectionCards = (props) => {
  const { title, videos, size } = props
  return <section className={styles.container}>
    <h2 className={styles.title}>{title}</h2>
    <div className={styles.cardWrapper}>
      {videos.map((video, idx) => {
          return <Card size={size} id={idx} key={idx} imgUrl={video.imgUrl} />
        })
      }
    </div>
  </section>;
};
export default SectionCards;