import React from 'react';
import axios from 'axios';

const SoundBoard = () => {
  const handleClick = command => event => {
    event.preventDefault();
    axios.post(
      'http://localhost:8888/.netlify/functions/trigger-sfx',
      JSON.stringify({
        command,
        channel: 'jlengstorf',
      }),
    );
  };

  return (
    <ul>
      <li>
        <button onClick={handleClick('blitzed')}>!blitzed</button>
      </li>
      <li>
        <button onClick={handleClick('plzhold')}>!plzhold</button>
      </li>
    </ul>
  );
};

export default SoundBoard;
