import Toast from 'react-native-toast-message';

export const handleApiResponse = (response) => {
  if (response?.status == 200) return response.data;
  else if (response?.status == 400)
    Toast.show({
      type: 'error',
      text1: 'Error : ' + response?.message
    });
  else if (response?.status == 401)
    Toast.show({
      type: 'error',
      text1: 'Unauthorized : Action is not permitted.'
    });
  else if (response?.status === 500)
    Toast.show({
      type: 'error',
      text1: 'Error : ' + response?.message
    });
  else
    Toast.show({
      type: 'error',
      text1: 'Error : Something went wrong. Please contact admin.'
    });
  return null;
};
