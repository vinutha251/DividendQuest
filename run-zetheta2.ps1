# -------------------------------
# ZETTHETA2 FULL STACK RUN SCRIPT
# -------------------------------

# Stop on any error
$ErrorActionPreference = "Stop"

Write-Host "Starting DividendQuest full-stack project..." -ForegroundColor Cyan

# -------------------------------
# Start Backend
# -------------------------------
Write-Host "Starting Backend (Flask)..." -ForegroundColor Green

# Open a new PowerShell window for backend
Start-Process powershell -ArgumentList "-NoExit", "-Command `"cd D:\zetheta2\backend; venv\Scripts\Activate.ps1; python app.py`""

# Wait a moment to ensure backend starts
Start-Sleep -Seconds 3

# -------------------------------
# Start Frontend
# -------------------------------
Write-Host "Starting Frontend (React)..." -ForegroundColor Green

# Open a new PowerShell window for frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command `"cd D:\zetheta2\frontend; npm start`""

Write-Host "Both Backend and Frontend are running." -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Backend: http://127.0.0.1:5000" -ForegroundColor Yellow
