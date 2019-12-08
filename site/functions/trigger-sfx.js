const axios = require('axios');

exports.handler = async event => {
  const command = JSON.parse(event.body);
<<<<<<< HEAD
  const result = await axios.post(
    `${process.env.CHATBOT_API_URI}/commands/trigger`,
    command,
    {
      auth: {
        username: 'apikey',
        password: process.env.CHATBOT_API_KEY,
      },
    },
  );
=======
  const result = await axios.post('http://localhost:8080/api', command);
>>>>>>> 3d645ac4e61434f314ce959cfc20ab291b9cc51a

  return {
    statusCode: 200,
    body: JSON.stringify(result.data),
  };
};
