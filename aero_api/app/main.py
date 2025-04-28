from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import upload, user  # aquí se ira agregando más rutas 

app = FastAPI(
    title="Aero API",
    description="API para análisis de señales de audio",
    version="1.0.0"
)

# CORS — permite que el frontend (React) se conecte con esta API sin errores de origen cruzado
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes cambiar "*" por ["http://localhost:5173"] si se quiere restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(upload.router, prefix="/upload", tags=["Upload"])
app.include_router(user.router, prefix="/user", tags=["User"])


# Ruta base
@app.get("/")
def root():
    return {"message": "Bienvenido a Aero API"}
