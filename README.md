# DividendQuest

**DividendQuest** is a gamified dividend investing education platform that teaches users portfolio construction, dividend analysis, income planning, and risk management through interactive challenges and real-world simulations.

---

## Features

- Fetch stock information (price, dividend rate, yield, payout ratio, sector)
- Calculate portfolio dividends and yield
- Simulate dividend income over multiple years with optional reinvestment
- Assess portfolio risk using a simple heuristic
- Interactive charts for dividend trends

---

## Tech Stack

- **Frontend:** React.js, Recharts, Axios  
- **Backend:** Python, Flask, yfinance  
- **Other:** Flask-CORS for cross-origin requests

---

## Installation

1. Clone the repository:  
```bash
git clone https://github.com/vinutha251/DividendQuest.git
cd DividendQuest

backend running
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
# or
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python app.py

frontend running
cd frontend
npm install
npm start

Frontend runs on http://localhost:3000 and backend on http://127.0.0.1:5000.

Usage

Enter a stock ticker (e.g., AAPL) and click Fetch Stock

View dividend info, portfolio calculations, and charts

Simulate dividend income and assess risk
