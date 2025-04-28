import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useReq from "../hooks/useReq";
import Plot from "react-plotly.js";
import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/outline";



function Upload() {
    const navigate = useNavigate();
    const { sendFile, data, loading, error } = useReq();

    const [formSent, setFormSent] = useState(false);
    const [backendData, setBackendData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById("fileUpload");
        const file = fileInput.files[0];

        if (file) {
            const result = await sendFile(file);
            setBackendData(result);
            setFormSent(true);
        }
    };

    const handleReset = () => {
        setFormSent(false);
        setBackendData(null);
    };

    const renderSpectrogram = () => {
        if (!backendData?.spectrogram) return null;

        const { frequencies, times, magnitude_db } = backendData.spectrogram;

        return (
            <div className="mt-12 px-4">
                <h2 className="text-2xl font-bold text-white text-center mb-4">Espectrograma</h2>
                <Plot
                    data={[
                        {
                            z: magnitude_db,
                            x: times,
                            y: frequencies,
                            type: "heatmap",
                            colorscale: "Jet",
                            reversescale: true,
                            zsmooth: 'best',
                        },
                    ]}
                    layout={{
                        title: "",
                        xaxis: { title: "Tiempo (s)" },
                        yaxis: { title: "Frecuencia (Hz)" },
                        autosize: true,
                        margin: { l: 60, r: 30, b: 50, t: 20 },
                        paper_bgcolor: "#1e1e2e",
                        plot_bgcolor: "#1e1e2e",
                        font: { color: "white" },
                    }}
                    style={{ width: "100%", height: "600px" }}
                    useResizeHandler
                />
            </div>
        );
    };

    const renderMetadata = () => {
        if (!backendData?.metadata) return null;

        const { dominant_freq, duration, energy } = backendData.metadata;

        return (
            <div className="mt-8 text-center text-white space-y-2">
                <h2 className="text-2xl font-bold text-white text-center mb-4">Especificaciones</h2>
                <p><strong>🎯 Frecuencia dominante:</strong> {dominant_freq.toFixed(2)} Hz</p>
                <p><strong>⏱️ Duración:</strong> {duration.toFixed(2)} segundos</p>
                <p><strong>⚡ Energía:</strong> {energy.toFixed(2)}</p>
            </div>
        );
    };

    return (
        <div className="w-full min-h-screen bg-[#1e1e2e] text-gray-300 font-sans pt-8">
            <div className="flex flex-row">

                <button className="h-12 w-12" onClick={() => navigate("/")}>
                    <ArrowTurnDownLeftIcon className="text-yellow-500 w-full h-full" />
                </button>

                <h1 className="text-6xl font-bold mb-4 text-white mx-auto">
                    Análisis de un archivo .wav
                </h1>
            </div>

            <p className="text-lg text-gray-400 mb-8 max-w-xl text-center my-8 mx-auto">
                Por favor, selecciona un archivo de audio en formato <strong>.wav</strong>. Este archivo será analizado para visualizar su contenido en frecuencia usando un espectrograma.
            </p>

            {formSent ? (
                <>
                    <div className="w-full max-w-md mx-auto mt-8 bg-green-800 text-white p-6 rounded-xl shadow-md text-center">
                        <p className="text-lg font-semibold mb-4">✅ Archivo procesado correctamente</p>
                        <p className="text-sm mb-6">Puedes realizar otra consulta si lo deseas.</p>
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-white text-green-900 rounded hover:bg-gray-100 transition"
                        >
                            Nueva consulta
                        </button>
                    </div>

                    {/* solo mostramos los resultados si formSent es true */}
                    {renderMetadata()}
                    {renderSpectrogram()}
                </>
            ) : (
                <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
                    <label
                        htmlFor="fileUpload"
                        className="w-full h-48 border-2 border-dashed border-orange-400 bg-orange-100 text-orange-800 flex flex-col items-center justify-center rounded-2xl cursor-pointer hover:bg-orange-200 transition-all"
                    >
                        <span className="text-xl font-semibold mb-2">
                            Haz clic para seleccionar tu archivo .wav
                        </span>
                        <span className="text-sm text-orange-700">(Tamaño máximo recomendado: 100MB)</span>
                        <input
                            id="fileUpload"
                            type="file"
                            accept=".wav"
                            className="hidden"
                        />
                    </label>
                    <button type="submit" className="mt-4 px-4 py-2 bg-orange-500 text-white rounded">
                        Enviar
                    </button>
                </form>
            )}

        </div>
    );
}

export default Upload;
