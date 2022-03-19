import { client } from "./.."
import { gql } from '@apollo/client/core';
import { mutation } from "svelte-apollo";

// import { gql, useQuery } from '@apollo/client';

// const GET_DOGS = gql`
//   query GetDogs {
//     dogs {
//       id
//       breed
//     }
//   }
// `;



export const signin = async (data) => {

  const SIGN_IN = gql`
  mutation SignIn {
    signIn(username: "kyle", password: "password") {
      username,
      accessToken
    }
  }
`;

  const result = await mutation(SIGN_IN);
  console.log({ result });
};




