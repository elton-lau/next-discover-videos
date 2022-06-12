
import Image from 'next/image';
import styles from './card.module.css';
import React, { useState } from 'react';

const Card = (props) => {
  const { imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80", size = 'medium' } = props;
  const [imgSrc, setImageSrc] = useState(imgUrl)

  const handleOnError = () => {
    console.error('hi, error')
    setImageSrc("https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80")
  }

  const classMap = {
    'large': styles.lgItem,
    'medium': styles.mdItem,
    'small': styles.smItem
  }
  
  return (
    <div className={styles.container}>
      Card
      <div className={classMap[size]}>
      <Image src={imgSrc} alt="Expand dropdown" onError={handleOnError} layout="fill" className={styles.cardImg}  />
      </div>
    </div>
  );
};

export default Card; 