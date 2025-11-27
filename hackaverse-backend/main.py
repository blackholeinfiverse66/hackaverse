# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HackaVerse API",
    description="Backend API for HackaVerse hackathon platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
from app.routes import auth, projects, teams, submissions

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HackaVerse API",
    description="Backend API for HackaVerse hackathon platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(teams.router, prefix="/api/teams", tags=["teams"])
app.include_router(submissions.router, prefix="/api/submissions", tags=["submissions"])
