import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import './index.css'; // make sure this exists in src/

function App() {
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [simulation, setSimulation] = useState([]);
  const [risk, setRisk] = useState(null);

  // Fetch individual stock info
  const fetchStock = async () => {
    if (!ticker) return alert("Enter a stock ticker");
    try {
      const res = await axios.get(`http://127.0.0.1:5000/stock/${ticker}`);
      setStockData(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching stock");
    }
  };

  // Add stock to portfolio
  const addToPortfolio = () => {
    if (!ticker) return alert("Enter ticker first");
    setPortfolio([...portfolio, { ticker: ticker.toUpperCase(), amount: 1000 }]); // default $1000
    setTicker('');
  };

  // Simulate dividend income
  const simulatePortfolio = async () => {
    if (portfolio.length === 0) return alert("Add stocks to portfolio first");
    try {
      const res = await axios.post('http://127.0.0.1:5000/simulate', {
        stocks: portfolio,
        years: 5,
        reinvest: true
      });
      setSimulation(res.data);
    } catch (err) {
      console.error(err);
      alert("Simulation failed");
    }
  };

  // Calculate risk score
  const calculateRisk = async () => {
    if (portfolio.length === 0) return alert("Add stocks to portfolio first");
    try {
      const res = await axios.post('http://127.0.0.1:5000/risk', { stocks: portfolio });
      setRisk(res.data);
    } catch (err) {
      console.error(err);
      alert("Risk calculation failed");
    }
  };

  return (
    <div className="App">
      <h1>Dividend Portfolio Simulator</h1>

      {/* Stock fetch */}
      <div className="input-container">
        <input
          type="text"
          value={ticker}
          placeholder="Enter Stock Ticker"
          onChange={(e) => setTicker(e.target.value)}
        />
        <button onClick={fetchStock}>Fetch Stock</button>
        <button onClick={addToPortfolio}>Add to Portfolio</button>
      </div>

      {/* Stock info */}
      {stockData && (
        <div className="stock-card">
          <h2>{stockData.name} ({stockData.symbol})</h2>
          <p>Price: ${stockData.price}</p>
          <p>Dividend Rate: ${stockData.dividend_rate}</p>
          <p>Dividend Yield: {stockData.dividend_yield}%</p>
          <p>Payout Ratio: {stockData.payout_ratio}</p>
          <p>Sector: {stockData.sector}</p>
        </div>
      )}

      {/* Portfolio */}
      {portfolio.length > 0 && (
        <div className="stock-card">
          <h2>Current Portfolio</h2>
          {portfolio.map((s, i) => (
            <p key={i}>{s.ticker} - ${s.amount}</p>
          ))}
          <button onClick={simulatePortfolio}>Simulate Dividend</button>
          <button onClick={calculateRisk}>Check Risk</button>
        </div>
      )}

      {/* Simulation Chart */}
      {simulation.length > 0 && (
        <div className="stock-card">
          <h2>Dividend Simulation (5 years)</h2>
          <LineChart width={500} height={300} data={simulation}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="annual_dividend" stroke="#2aa79b" />
            <Line type="monotone" dataKey="portfolio_value" stroke="#3498db" />
          </LineChart>
        </div>
      )}

      {/* Risk Score */}
      {risk && (
        <div className="stock-card">
          <h2>Portfolio Risk</h2>
          <p>Risk Score: {risk.risk_score}</p>
          <p>Risk Level: {risk.risk_level}</p>
        </div>
      )}
    </div>
  );
}

export default App;
