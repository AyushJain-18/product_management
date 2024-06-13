let serverUrl = 'http://localhost:5000';

export const getImage = (imageName) => `${serverUrl}/images/${imageName}`;

const getCall = async (endpoint) => {
  let response = await fetch(serverUrl + endpoint);
  let data = await response.text();
  return data;
};

export const getHeartBeat = async () => {
  let response = await fetch(serverUrl + '/heartbeat');
  let data = await response.text();
  console.log('data', data);
};
