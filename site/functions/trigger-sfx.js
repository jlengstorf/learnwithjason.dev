const axios = require('axios');

exports.handler = async event => {
  const command = JSON.parse(event.body);
  const result = await axios.post('http://localhost:8080/api', command);

  return {
    statusCode: 200,
    body: JSON.stringify(result.data),
  };
};
