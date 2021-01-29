import React from 'react';
import { useQuery, gql } from '@apollo/client';

const { PIUS_UUID } = process.env;

const DOG_DATA = gql`
  query getPius($id: String!) {
    pius: dog(id: $id) {
      name
      picture
      weight
      birth
    }
  }
`;

const Dog = () => {
  const { loading, error, data } = useQuery(DOG_DATA, { variables: { id: PIUS_UUID } });

  if (loading) return <span>loading</span>;
  if (error) return <span>{JSON.stringify(error)}</span>;

  const { pius } = data;

  return (
    <>
      <h1>{pius.name}</h1>
      <h2>{pius.weight}</h2>
      <h3>{pius.birth}</h3>
      <img src={`data:image/png;base64, ${pius.picture}`} />
    </>
  );
};

export default Dog;
