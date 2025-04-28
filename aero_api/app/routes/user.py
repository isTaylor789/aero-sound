import subprocess
import uuid
import os
import numpy as np
import soundfile as sf
from fastapi import APIRouter, UploadFile, File
from scipy.fft import fft, fftfreq

router = APIRouter()

@router.post("/")
async def process_audio(file: UploadFile = File(...)):

    # Rutas temporales
    uid = uuid.uuid4().hex
    input_path = f"temp_{uid}.webm"
    output_path = f"temp_{uid}.wav"

    # Guardar el archivo subido
    with open(input_path, "wb") as f:
        f.write(await file.read())

    # Convertir usando ffmpeg
    result = subprocess.run([
        "ffmpeg", "-y", "-i", input_path, output_path
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # Verificar errores
    if result.returncode != 0:
        return {"error": "Fallo la conversión con ffmpeg", "detail": result.stderr.decode()}

    # Leer WAV convertido
    data, samplerate = sf.read(output_path)

    # Limpiar archivos temporales
    os.remove(input_path)
    os.remove(output_path)

    # Convertir estéreo a mono
    if len(data.shape) > 1:
        data = data.mean(axis=1)

    duration = len(data) / samplerate
    N = len(data)
    yf = fft(data)
    xf = fftfreq(N, 1 / samplerate)

    pos_mask = xf >= 0
    xf = xf[pos_mask]
    yf = yf[pos_mask]

    magnitude = np.abs(yf)
    magnitude_db = 20 * np.log10(magnitude + 1e-6)

    dominant_freq = float(xf[np.argmax(magnitude)])
    energy = float(np.sum(data ** 2))

    return {
        "fft": {
            "frequencies": xf.tolist(),
            "magnitude_db": magnitude_db.tolist(),
        },
        "metadata": {
            "samplerate": samplerate,
            "duration": duration,
            "dominant_freq": dominant_freq,
            "energy": energy,
        }
    }
