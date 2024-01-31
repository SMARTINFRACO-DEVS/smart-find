import { useEffect } from 'react';
import axios from 'axios';
import token from '../components/token';

const fetchData = async () => {
  try {
    const response = await axios.post(
      'https://frog.wigal.com.gh/api/v2/sendmsg, ',
      {
        "username": "SOLATECK",
        "password": "D@niel7929",
        "senderid": "JOJO",
        "destinations": [
          {
            "destination": "233500297929",
            "msgid": 101
          }
        ],
        "message": "Hello API test message",
        "service": "SMS",
        "subject": "Hello World",
        "smstype": "text"
      },
      {
        headers: {
          'Cookie': Object.entries(token).map(([key, value]) => `${key}=${value}`).join('; '),
          'Content-Type': 'application/json',
        },
        maxBodyLength: 11,
      }
    );

    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  }
};

const ApiCallComponent = () => {
  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div>
      <div>
        <button onClick={() => fetchData()}>Send</button>
      </div>
    </div>
  );
};

export default ApiCallComponent;
