import React, { useState, useRef } from "react";

function Recorder({ onRecordingComplete, onContinue }) {
    const [recording, setRecording] = useState(false);
    const [finished, setFinished] = useState(false);
    const [countdown, setCountdown] = useState(6);
    const [audioURL, setAudioURL] = useState(null);
    const [mimeType, setMimeType] = useState("audio/webm"); // por defecto
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = async () => {
        setRecording(true);
        setCountdown(6);
        setFinished(false);
        setAudioURL(null);
        audioChunks.current = [];

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Detecta qué MIME soporta el navegador
        const options = [
            "audio/webm",
            "audio/ogg",
            "audio/mp4",
            "audio/wav"
        ];

        const supportedType = options.find(type => MediaRecorder.isTypeSupported(type)) || "";
        setMimeType(supportedType);

        const mediaRecorder = new MediaRecorder(stream, { mimeType: supportedType });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
            audioChunks.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(audioChunks.current, { type: supportedType });
            const url = URL.createObjectURL(blob);
            setAudioURL(url);
            setFinished(true);
            onRecordingComplete && onRecordingComplete(blob, url);
        };

        mediaRecorder.start();

        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(countdownInterval);
                    mediaRecorder.stop();
                    setRecording(false);
                }
                return prev - 1;
            });
        }, 1000);
    };

    const reset = () => {
        setRecording(false);
        setFinished(false);
        setCountdown(6);
        setAudioURL(null);
        audioChunks.current = [];
    };

    const handleContinue = () => {
        onContinue && onContinue();
    };

    const getExtension = () => {
        switch (mimeType) {
            case "audio/webm": return "webm";
            case "audio/ogg": return "ogg";
            case "audio/wav": return "wav";
            case "audio/mp4": return "mp4";
            default: return "webm";
        }
    };

    return (
        <div className="text-center">
            {!recording && !finished && (
                <button
                    onClick={startRecording}
                    className="w-32 h-32 rounded-full bg-red-600 text-white text-xl font-semibold flex items-center justify-center mx-auto hover:bg-red-700 transition-all"
                >
                    Grabar
                </button>
            )}

            {recording && (
                <div className="w-32 h-32 rounded-full bg-gray-700 text-white text-3xl font-bold flex items-center justify-center mx-auto">
                    {countdown - 1}s
                </div>
            )}

            {finished && (
                <>
                    <div className="w-32 h-32 rounded-full bg-green-600 text-white text-xl font-semibold flex items-center justify-center mx-auto">
                        ✔️ OK
                    </div>

                    <div className="mt-8 flex flex-col space-y-4 items-center">
                        <audio controls src={audioURL} className="mb-4" />

                        <a
                            href={audioURL}
                            download={`grabacion.${getExtension()}`}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Descargar grabación
                        </a>

                        <button
                            onClick={reset}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                        >
                            Volver a intentar
                        </button>

                        <button
                            onClick={handleContinue}
                            className="px-4 py-2 bg-green-300 text-gray-600 rounded hover:bg-green-400 transition"
                        >
                            Continuar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Recorder;
