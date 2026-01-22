from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

# ------------------------
# Health Check
# ------------------------
@app.route("/")
def home():
    return jsonify({
        "status": "DividendQuest backend running"
    })


# ------------------------
# Stock Information
# ------------------------
@app.route("/stock/<ticker>", methods=["GET"])
def stock_info(ticker):
    stock = yf.Ticker(ticker)
    info = stock.info

    return jsonify({
        "symbol": ticker.upper(),
        "name": info.get("shortName"),
        "price": info.get("currentPrice"),
        "dividend_yield": info.get("dividendYield"),
        "dividend_rate": info.get("dividendRate"),
        "payout_ratio": info.get("payoutRatio"),
        "sector": info.get("sector")
    })


# ------------------------
# Portfolio Calculation
# ------------------------
@app.route("/portfolio", methods=["POST"])
def portfolio():
    data = request.json
    portfolio = data.get("stocks", [])

    total_investment = 0
    annual_dividend = 0

    for stock in portfolio:
        ticker = stock["ticker"]
        amount = stock["amount"]

        s = yf.Ticker(ticker)
        info = s.info

        price = info.get("currentPrice", 0)
        dividend = info.get("dividendRate", 0)

        if price and dividend:
            shares = amount / price
            annual_dividend += shares * dividend
            total_investment += amount

    portfolio_yield = (
        (annual_dividend / total_investment) * 100
        if total_investment else 0
    )

    return jsonify({
        "total_investment": round(total_investment, 2),
        "annual_dividend": round(annual_dividend, 2),
        "portfolio_yield_percent": round(portfolio_yield, 2)
    })


# ------------------------
# Dividend Income Simulation
# ------------------------
@app.route("/simulate", methods=["POST"])
def simulate():
    data = request.json
    portfolio = data.get("stocks", [])
    years = data.get("years", 5)
    reinvest = data.get("reinvest", False)

    total_value = 0
    annual_income = 0

    for stock in portfolio:
        ticker = stock["ticker"]
        amount = stock["amount"]

        s = yf.Ticker(ticker)
        info = s.info

        price = info.get("currentPrice", 0)
        dividend = info.get("dividendRate", 0)

        if price and dividend:
            shares = amount / price
            total_value += amount
            annual_income += shares * dividend

    results = []

    for year in range(1, years + 1):
        results.append({
            "year": year,
            "portfolio_value": round(total_value, 2),
            "annual_dividend": round(annual_income, 2)
        })

        if reinvest:
            total_value += annual_income

    return jsonify(results)


# ------------------------
# Risk Score (Simple Heuristic)
# ------------------------
@app.route("/risk", methods=["POST"])
def risk_score():
    data = request.json
    portfolio = data.get("stocks", [])

    score = 0

    for stock in portfolio:
        ticker = stock["ticker"]
        s = yf.Ticker(ticker)
        info = s.info

        beta = info.get("beta", 1)
        payout = info.get("payoutRatio", 0)

        if beta:
            score += beta * 10
        if payout and payout > 0.8:
            score += 10

    if score < 30:
        level = "Low Risk"
    elif score < 60:
        level = "Medium Risk"
    else:
        level = "High Risk"

    return jsonify({
        "risk_score": round(score, 2),
        "risk_level": level
    })


# ------------------------
# Run Server
# ------------------------
if __name__ == "__main__":
    app.run(debug=True)
