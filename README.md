# HackaVerse

## Quick Start

### Backend
```bash
cd hackathon-main
pip install -r requirements.txt
python -m uvicorn src.main:app --reload --port 8001
```

### Frontend
```bash
cd hackaverse-frontend
npm install
npm run dev
```

### Test Integration
```bash
python test_integration.py
```

## Startup Scripts
- `start_backend.bat` - Start backend server
- `start_frontend.bat` - Start frontend server

## API Documentation
- Backend API: http://localhost:8001/docs
- Frontend: http://localhost:3000