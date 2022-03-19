import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client/core";

import { setClient } from "svelte-apollo";

export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

setClient(client);


// import axios from 'axios'

// const axiosAPI = axios.create({
//   baseURL: "http://localhost:3001"
// });

// const apiRequest = (method, url, request) => {
//   const headers = {
//     authorization: ""
//   };

//   return axiosAPI({
//     method,
//     url,
//     data: request,
//     headers
//   })
//     .then(res => Promise.resolve(res.data))
//     .catch(err => Promise.reject(err));
// };

// const get = (url, request?) => apiRequest("get", url, request);
// const deleteRequest = (url, request) => apiRequest("delete", url, request);
// const post = (url, request) => apiRequest("post", url, request);
// const put = (url, request) => apiRequest("put", url, request);
// const patch = (url, request) => apiRequest("patch", url, request);

// const API = {
//   get,
//   delete: deleteRequest,
//   post,
//   put,
//   patch
// };

// export default API;