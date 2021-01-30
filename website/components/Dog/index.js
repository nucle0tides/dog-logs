import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Skeleton from 'react-loading-skeleton';

const { PIUS_UUID } = process.env;

const DOG_DATA = gql`
  query getPius {
    pius: dog {
      name
      picture
      birth
      goal
      activityValue
      hourlyAverage
    }
  }
`;

const Dog = () => {
  const { loading, error, data } = useQuery(DOG_DATA);

  if (loading) {
    return (
      <>
        <Skeleton height={'25vh'} />
        <h1><Skeleton count={3} /></h1>
      </>
    );
  }
  const { pius } = data;

  return (
    <Container>
      <Row>
        <Image
          src={`data:image/png;base64, ${pius.picture}`}
          fluid
          rounded
          alt={pius.name}
        />
      </Row>
      <Row>
        <h1>{pius.name}</h1>
      </Row>
      <Row>
        <h2>Daily Goal: {pius.goal}</h2>
      </Row>
      <Row>
        <h3>Today's Barkpoints: {pius.activityValue}</h3>
      </Row>
    </Container>
  );
};

export default Dog;
