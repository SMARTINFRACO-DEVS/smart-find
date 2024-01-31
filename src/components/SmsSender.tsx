import { useEffect } from 'react';
import axios from 'axios';

const SmsSender = () => {
  const sendSms = async () => {
    try {
      const endPoint = 'https://api.mnotify.com/api/template';
      const apiKey = '2CavNr2eF71DYu2ShH1VwgOCA';
      const data = {
        'title': 'API testing',
        'content': 'Best message template',
      };

      const url = `${endPoint}?key=${apiKey}`;

      const config = {
        method: 'POST',
        url: url, 
        headers: {
          'Accept': 'application/json',
        },
        data: data,
      };

      const response = await axios(config);

      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sendSms();
  }, []);

  return (
    <div>
      <button onClick={() => sendSms()}>Send</button>
    </div>
  );
};

export default SmsSender;
