# 🚀 Aero Sound

Aplicación web que combina un **backend en Python (FastAPI)** y un **frontend en React (Vite + TailwindCSS)** para ofrecer una experiencia moderna y rápida.

---

## 📂 Estructura del proyecto

Aero/ ├── aero_api/ # Backend - Python API (FastAPI) │ ├── app/ # Código fuente de la API │ ├── env/ # Entorno virtual (ignorado en Git) │ └── requirements.txt └── aero_app/ # Frontend - React App (Vite + TailwindCSS) ├── src/ # Código fuente de React ├── public/ # Recursos estáticos └── package.json


---

## 🛠 Tecnologías utilizadas

- **Backend:** Python 3, FastAPI, Uvicorn
- **Frontend:** React, Vite, TailwindCSS
- **Paquetería:** pip, npm

---

## 🚀 Instalación y ejecución

### Clonar el repositorio

```bash
git clone https://github.com/isTaylor789/aero-sound.git
cd aero-sound

Backend (API)

cd aero_api
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 3369

Frontend (React App)

cd aero_app
npm install
npm run dev

Iniciar ambos automáticamente

./start.sh

📜 Licencia

Este proyecto está licenciado bajo la MIT License.
🧠 Autor

isTaylor789 — GitHub
