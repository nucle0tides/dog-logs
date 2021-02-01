import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import styles from './styles.scss';

const DOG_DATA = gql`
  query getPius {
    pius: dog {
      name
      picture
      activityValue
      activityGoal
      breeds
    }
  }
`;

const Dog = () => {
  const { loading, error, data } = useQuery(DOG_DATA);

  if (loading) {
    return (
      <>
        <Skeleton height={'15vh'} />
      </>
    );
  }
  /* const data = {
   *   pius: {
   *     name: 'Pius',
   *     breeds: ['American Eskimo Dog (Standard)', 'American Staffordshire Terrier'],
   *     activityValue: 10000,
   *     activityGoal: 15000,
   *     picture: 'http://placerabbit.com/rabbit/1500x1500.jpg',
   *   },
   * }; */
  const { pius } = data;

  return (
    <>
      <div className={styles.infoContainer}>
        <div>
          <img
            old-src={pius.picture}
            src={`data:image/png;base64, ${pius.picture}`}
            rounded
            alt={pius.name}
            className={styles.dogPhoto}
          />
        </div>
        <div className={styles.basicInfo}>
          <div className={styles.name}>{pius.name}</div>
          <div className={styles.breed}>{pius.breeds.join(' && ')}</div>
        </div>
      </div>
      <div className={styles.progressContainer}>
        <div className={styles.progress}>
          {pius.activityValue}/{pius.activityGoal} BarkPoints
        </div>
      </div>
    </>
  );
};

export default Dog;
