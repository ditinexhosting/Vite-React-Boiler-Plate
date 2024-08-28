// export const api = axios.create({
//   baseURL: Config.API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const handleResponse = response => {
//   if (response?.status === 202) toast.error(response.data.error);
//   else if (response?.response?.status === 500) toast.error(response?.message);
//   else if (response?.response?.status === 401) {
//     Config.UNAUTHORIZED_EXCEPTION = true;
//     toast.error('You are not authorized for the action.');
//   } else if (response?.status === 200) return response?.data;
//   else toast.error('Something went wrong. Please contact server admin.');
//   return false;
// };

// export const getToken = async () => {
//   const session = localStorage.getItem('userSession')
//     ? JSON.parse(localStorage.getItem('userSession'))
//     : null;

//   let response = session?.access_token;
//   if (session && session?.token_expiry - new Date().getTime() < 1) {
//     //call refresh token and update client token
//     try {
//       const apiresponse = await api.get(
//         '/v1/auth/refresh-token/' +
//           session._id +
//           '/' +
//           session.active_session_refresh_token,
//       );
//       session.access_token = apiresponse.data;
//       session.token_expiry = new Date().getTime() + 23 * 60 * 60 * 1000;
//       response = session.access_token;
//       localStorage.setItem('userSession', JSON.stringify(session));
//     } catch (e) {}
//   }

//   return response;
// };

export const errorResponse = (e) => ({
  status: 500,
  data: e,
  message: 'Something went wrong. Contact admin team.'
});
