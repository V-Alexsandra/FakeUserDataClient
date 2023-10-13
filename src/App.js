import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [fakeData, setFakeData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/generateFakeData?region=en&errorCount=2&seed=12345')
      .then((response) => {
        setFakeData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching fake data:', error);
        // Добавьте здесь обработку ошибок, например, установите состояние для отображения сообщения об ошибке.
      });
  }, []);

  return (
    <div className="App">
      {/* Отобразите полученные фейковые данные в вашем React-приложении */}
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
