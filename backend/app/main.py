from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# Importar routers
from app.api import auth, data

# Importar modelos y base de datos
from app.database.database import engine, SessionLocal
from app.models import models
from app.services.data_service import initialize_sample_data
from app.services.auth_service import create_user
from app.schemas.schemas import UserCreate
from app.core.security import get_password_hash

app = FastAPI(title="Analytics Dashboard API", version="1.0.0")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(auth.router)
app.include_router(data.router)

@app.on_event("startup")
async def startup_event():
    # Crear tablas
    models.Base.metadata.create_all(bind=engine)
    
    # Inicializar datos de ejemplo
    db = SessionLocal()
    try:
        # Crear usuario de demo si no existe
        existing_user = db.query(models.User).filter(models.User.username == "demo").first()
        if not existing_user:
            demo_user = models.User(
                username="demo",
                email="demo@example.com",
                hashed_password=get_password_hash("demo123")
            )
            db.add(demo_user)
            db.commit()
        
        # Inicializar datos de ejemplo
        initialize_sample_data(db)
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Analytics Dashboard API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)