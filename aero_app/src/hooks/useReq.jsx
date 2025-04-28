import { useState } from "react";
import axios from "axios";

const useReq = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const sendFile = async (file) => {
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:3369/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            console.error("Error al subir el archivo:", err);
        } finally {
            setLoading(false);
        }
    };

    return { sendFile, data, loading, error };
};

export default useReq;
