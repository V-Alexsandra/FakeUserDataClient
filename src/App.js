import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [fakeData, setFakeData] = useState(null);

  useEffect(() => {
    axios.get('https://fake-user-data-generation-ivory.vercel.app/generateFakeData?region=en_US&errorCount=2&seed=12345')
      .then((response) => {
        setFakeData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching fake data:', error);
      });
  }, []);

  return (
    <div className="App">
      {fakeData && (
        <div>
          <p>Name: {fakeData.name}</p>
          <p>Address: {fakeData.address}</p>
          <p>Phone Number: {fakeData.phoneNumber}</p>
        </div>
      )}
    </div>
  );
}

export default App;
