# Salir si hay un error
set -e

# Ir a aero_api
echo "Activando entorno virtual de Python..."
cd aero_api
source env/bin/activate

# Iniciar backend
echo "Iniciando Backend (Python API) en puerto 3369..."
uvicorn app.main:app --reload --port 3369 &

# Volver a la raíz
cd ..

# Ir a aero_app
echo "Iniciando Frontend (React App)..."
cd aero_app
npm run dev
