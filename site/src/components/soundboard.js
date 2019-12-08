<<<<<<< HEAD
/** @jsx jsx */
import { jsx } from 'theme-ui';
=======
import React from 'react';
>>>>>>> 3d645ac4e61434f314ce959cfc20ab291b9cc51a
import axios from 'axios';

const SoundBoard = () => {
  const handleClick = command => event => {
    event.preventDefault();
    axios.post(
<<<<<<< HEAD
      '/api/trigger-sfx',
      JSON.stringify({
        command,
        user: 'LWJ Soundboard',
=======
      'http://localhost:8888/.netlify/functions/trigger-sfx',
      JSON.stringify({
        command,
>>>>>>> 3d645ac4e61434f314ce959cfc20ab291b9cc51a
        channel: 'jlengstorf',
      }),
    );
  };

  return (
<<<<<<< HEAD
    <ul sx={{ listStyle: 'none', p: 0 }}>
      <li sx={{ m: 0 }}>
        <button
          sx={{ variant: 'button', m: 0 }}
          onClick={handleClick('blitzed')}
        >
          !blitzed
        </button>
      </li>
      <li>
        <button
          sx={{ variant: 'button', m: 0 }}
          onClick={handleClick('plzhold')}
        >
          !plzhold
        </button>
=======
    <ul>
      <li>
        <button onClick={handleClick('blitzed')}>!blitzed</button>
      </li>
      <li>
        <button onClick={handleClick('plzhold')}>!plzhold</button>
>>>>>>> 3d645ac4e61434f314ce959cfc20ab291b9cc51a
      </li>
    </ul>
  );
};

export default SoundBoard;
