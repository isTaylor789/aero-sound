import React, { useState } from "react";
import axios from "axios";
import Recorder from "../helpers/Recorder";
import Plot from "react-plotly.js";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/outline"; // ícono similar al que pasaste

// arrow-turn-down-left




function User() {
    const [step, setStep] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);
    const [fftData, setFftData] = useState(null); // Aquí guardamos la respuesta del backend


    const handleRecordingComplete = (blob, url) => {
        console.log("Grabación lista:", url);
        setAudioBlob(blob);
    };

    const handleContinue = async () => {
        if (!audioBlob) {
            console.warn("No hay audio para procesar");
            return;
        }

        const formData = new FormData();
        formData.append("file", audioBlob, "grabacion.wav");

        try {
            const response = await axios.post("http://localhost:3369/user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("✅ Respuesta del backend:", response.data);
            setFftData(response.data); // Puedes usar esto para graficar luego
            setStep(1);
        } catch (error) {
            console.error("❌ Error al procesar el audio:", error);
        }
    };

    const navigate = useNavigate();


    return (
        <div className="w-full min-h-screen bg-[#1e1e2e] text-gray-300 font-sans overflow-y-auto overflow-x-hidden pt-10">
            <div className="flex flex-row mb-6">

                <button className="h-12 w-12" onClick={() => navigate("/")}>
                    <ArrowTurnDownLeftIcon className="text-yellow-500 w-full h-full" />
                </button>


                <h1 className="mx-auto text-4xl font-bold text-white">Grabación y análisis de audio</h1>
            </div>

            <Recorder
                onRecordingComplete={handleRecordingComplete}
                onContinue={handleContinue}
            />

            {step === 1 && (
                <div className="text-center text-white mt-10 px-6">
                    <h2 className="text-2xl font-bold mb-4">Resultados</h2>

                    {fftData ? (
                        <>
                            <div className="text-center text-gray-400 mb-6 space-y-1">
                                <p><strong>Frecuencia dominante:</strong> {fftData.metadata.dominant_freq.toFixed(2)} Hz</p>
                                <p><strong>Duración:</strong> {fftData.metadata.duration.toFixed(2)} s</p>
                                <p><strong>Samplerate:</strong> {fftData.metadata.samplerate} Hz</p>
                                <p><strong>Energía:</strong> {fftData.metadata.energy.toFixed(2)}</p>
                            </div>

                            <div>
                                <h3 className="text-xl mb-4 text-white">Espectro de Frecuencia</h3>
                                <Plot
                                    data={[
                                        {
                                            x: fftData.fft.frequencies,
                                            y: fftData.fft.magnitude_db,
                                            type: "scatter",
                                            mode: "lines",
                                            line: { color: "#00FF9F" },
                                        },
                                    ]}
                                    layout={{
                                        title: "Espectro de Frecuencia",
                                        xaxis: { title: "Frecuencia (Hz)", color: "#ccc" },
                                        yaxis: { title: "Magnitud (dB)", color: "#ccc" },
                                        paper_bgcolor: "#1e1e2e",
                                        plot_bgcolor: "#1e1e2e",
                                        font: { color: "#ccc" },
                                    }}
                                    style={{ width: "100%", height: "400px" }}
                                />
                            </div>

                        </>
                    ) : (
                        <p className="text-yellow-400">Cargando análisis...</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default User;
