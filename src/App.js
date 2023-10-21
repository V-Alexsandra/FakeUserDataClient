import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';
import { Container, Row, Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [region, setRegion] = useState('us');
  const [errorCount, setErrorCount] = useState(0);
  const randomSeed = Math.floor(Math.random() * 1000000);
  const [seed, setSeed] = useState(randomSeed.toString());
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const baseurl = "https://fake-user-data-server.vercel.app";

  const fetchData = () => {
    const url = `${baseurl}/generateFakeData?region=${region}&errorCount=${errorCount}&seed=${seed}&page=${page}`;

    axios.get(url)
      .then((response) => {
        const newData = [...data, ...response.data];
        setData(newData);
      })
      .catch((error) => {
        console.error(error);
        setHasMore(false);
      });
  };

  useEffect(() => {
    fetchData();
    setPage(2);
  }, [region, seed, errorCount]);

  const handleScroll = () => {
    setPage(page + 1);
    fetchData();
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setSeed(randomSeed);
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  const handleErrorCountChange = (e) => {
    setErrorCount(e.target.value);
    setData([]);
    setHasMore(true);
    setPage(1);
  };

  const handleSeedChange = (e) => {
    const newSeed = e.target.value;
    setSeed(newSeed);
    setData([]);
    setHasMore(true);
    setPage(1);
  };

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1000000).toString();
    setSeed(randomSeed);
    setData([]);
    setHasMore(true);
    setPage(1);
  };

  const exportToCSV = () => {
    const dataToExport = data;
    
    const header = [
      { id: 'number', title: 'Number' },
      { id: 'id', title: 'Random Identifier' },
      { id: 'name', title: 'Full Name' },
      { id: 'address', title: 'Address' },
      { id: 'phoneNumber', title: 'Phone Number' },
    ];

    const csv = [header.map(item => item.title).join(',')];
    dataToExport.forEach(item => {
      const row = header.map(key => item[key.id]);
      csv.push(row.join(','));
    });

    const csvBlob = new Blob([csv.join('\n')], { type: 'text/csv' });

    const url = window.URL.createObjectURL(csvBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported-data.csv';
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={2}>
          <label>
            Select Region:
            <select className="form-control" value={region} onChange={handleRegionChange}>
              <option value="en">USA</option>
              <option value="pl">Poland</option>
              <option value="de">German</option>
            </select>
          </label>
        </Col>
        <Col xs={12} md={4}>
          <label>
            Error Count (0-10):
            <input
              type="range"
              className="form-range"
              value={errorCount}
              min="0"
              max="10"
              step="0.25"
              onChange={handleErrorCountChange}
            />
          </label>
          <input
            type="number"
            className="form-control"
            value={errorCount}
            min="0"
            max="10"
            step="0.25"
            onChange={handleErrorCountChange}
          />
        </Col>
        <Col xs={12} md={4}>
          <label>
            Seed:
            <input
              type="text"
              className="form-control"
              value={seed}
              onChange={handleSeedChange}
            />
            <button className="btn btn-primary" onClick={handleRandomSeed}>Random</button>
          </label>
        </Col>
        <Col xs={12} md={2}>
          <button className="btn btn-primary" onClick={exportToCSV}>Export to CSV</button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <InfiniteScroll
            dataLength={data.length}
            next={handleScroll}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Random Identifier</th>
                  <th>Full Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.number}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
