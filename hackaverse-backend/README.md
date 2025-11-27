# HackaVerse Backend API

A FastAPI-based backend for the HackaVerse hackathon platform with PostgreSQL and MongoDB support.

## Features

- **FastAPI Framework**: High-performance async web API framework
- **JWT Authentication**: Secure token-based authentication
- **PostgreSQL Database**: Relational data storage with SQLAlchemy ORM
- **MongoDB Integration**: NoSQL database for flexible data storage
- **File Upload Support**: Local file storage for submissions and assets
- **Docker Support**: Containerized deployment with docker-compose
- **CORS Enabled**: Cross-origin resource sharing for frontend integration

## Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hackaverse-backend
   ```

2. **Start the services**
   ```bash
   docker-compose up -d
   ```

3. **The API will be available at** `http://localhost:8000`

### Local Development

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment variables**
   Create a `.env` file:
   ```
   DATABASE_URL=postgresql://user:password@localhost/hackaverse
   MONGODB_URL=mongodb://localhost:27017/hackaverse
   SECRET_KEY=your-secret-key-here
   ```

3. **Run the application**
   ```bash
   uvicorn main:app --reload
   ```

## API Documentation

Once the server is running, visit `http://localhost:8000/docs` for interactive API documentation.

## Project Structure

```
hackaverse-backend/
├── app/
│   ├── __init__.py
│   ├── config.py          # Application configuration
│   ├── database.py        # Database setup
│   ├── main.py           # FastAPI application
│   ├── models/           # SQLAlchemy models
│   │   ├── __init__.py
│   │   └── user.py
│   ├── routes/           # API route handlers
│   │   ├── __init__.py
│   │   └── auth.py
│   ├── schemas/          # Pydantic schemas
│   │   ├── __init__.py
│   │   └── user.py
│   ├── services/         # Business logic
│   │   ├── __init__.py
│   │   └── auth_service.py
│   └── utils/            # Utility functions
│       ├── __init__.py
│       └── auth.py
├── tests/                # Unit tests
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── vercel.json
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost/hackaverse` |
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017/hackaverse` |
| `SECRET_KEY` | JWT secret key | `your-secret-key-here` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT token expiration | `30` |
| `UPLOAD_DIRECTORY` | File upload directory | `uploads` |
| `MAX_FILE_SIZE` | Maximum file size in bytes | `10485760` (10MB) |

## Development

### Running Tests

```bash
pytest tests/
```

### Database Migrations

```bash
alembic upgrade head
```

## Deployment

### Vercel

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Docker

```bash
docker build -t hackaverse-backend .
docker run -p 8000:8000 hackaverse-backend
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License
