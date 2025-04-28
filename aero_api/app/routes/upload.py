from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import numpy as np
import soundfile as sf
from scipy.signal import spectrogram
import io

router = APIRouter()


@router.post("/")
async def upload_audio(file: UploadFile = File(...)):
    # Leer archivo en memoria
    contents = await file.read()
    audio_io = io.BytesIO(contents)
    data, samplerate = sf.read(audio_io)

    if data.ndim > 1:
        data = data[:, 0]  # convertir a mono si es estéreo

    # Duración
    duration = len(data) / samplerate

    # Espectrograma
    f, t, Sxx = spectrogram(data, fs=samplerate, window='hann', nperseg=512, noverlap=64)
    magnitude_db = 10 * np.log10(Sxx + 1e-10)  # para evitar log(0)

    # Info adicional
    energy = np.sum(data**2)
    fft = np.fft.fft(data)
    freqs = np.fft.fftfreq(len(fft), 1 / samplerate)
    magnitude_fft = np.abs(fft[:len(fft)//2])
    freq_half = freqs[:len(fft)//2]
    dominant_freq = freq_half[np.argmax(magnitude_fft)]

    # Análisis simple SLI
    is_causal = True  # como todo sistema físico real
    is_stable = bool(energy < np.inf)  # Cast a bool nativo de Python

    return JSONResponse(content={
        "spectrogram": {
            "frequencies": f.tolist(),
            "times": t.tolist(),
            "magnitude_db": magnitude_db.tolist()
        },
        "metadata": {
            "sample_rate": samplerate,
            "duration": duration,
            "dominant_freq": float(dominant_freq),
            "energy": float(energy),
            "is_causal": is_causal,
            "is_stable": is_stable
        }
    })
