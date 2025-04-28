import React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowUpOnSquareIcon, MicrophoneIcon } from "@heroicons/react/24/outline"



function Home() {
    const navigate = useNavigate()

    return (
        <>

            <div className="w-full min-h-screen bg-[#1e1e2e] text-gray-300 font-sans overflow-y-auto overflow-x-hidden">

                {/* Título */}
                <div className="h-[250px] w-full mb-32 hover:text-[#a6e3a1]">
                    <h1 className="text-6xl md:text-[210px] font-extrabold tracking-wider text-center"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        AERO
                    </h1>
                </div>

                {/* Contenedor de tarjetas */}
                <div className="flex flex-row gap-x-10 w-full mt-20 justify-center">


                    {/* Tarjeta de Grabación */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/user")}
                        className="flex flex-row gap-x-2 bg-[#cba6f7]/10 hover:bg-[#cba6f7]/20 
                        transition-colors duration-300 rounded-2xl shadow-lg cursor-pointer 
                        overflow-hidden ml-4"
                    >
                        {/* image */}
                        <div className="w-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-48 ">
                            <MicrophoneIcon className="text-white w-40 h-48 my-auto" />
                        </div>

                        {/* info */}
                        <div className="w-96 p-3 flex flex-col gap-y-4">
                            
                            <h2 className="text-3xl font-bold mb-2 text-[#cdd6f4]">
                                Grabación en Tiempo Real
                            </h2>

                            <p className="text-sm md:text-base text-gray-400">
                                Graba 5 segundos de audio, procesa y visualiza su espectro en tiempo real.
                            </p>
                        </div>
                    </motion.div>

                    {/* Tarjeta de Carga de Archivo */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/upload")}
                        className="flex flex-row gap-x-2 bg-[#f38ba8]/10 hover:bg-[#f38ba8]/20 transition-colors 
                        duration-300 rounded-2xl shadow-lg cursor-pointer overflow-hidden"
                    >

                        {/* image */}
                        <div className="w-40 bg-gradient-to-r from-cyan-500 to-blue-500 h-48 ">
                            <ArrowUpOnSquareIcon className="text-yellow-500 w-40 h-48 my-auto" />
                        </div>

                        {/* info */}
                        <div className="w-96 p-3 flex flex-col gap-y-4">
                            <h2 className="text-3xl font-bold text-[#f5e0dc] hover:text-[#f5c2e7]">
                                Carga de Archivo .WAV
                            </h2>

                            <p className="text-sm md:text-base text-gray-400">
                                Importa un archivo .wav, genera su espectrograma y analiza su contenido en frecuencia.
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </>
    )
}

export default Home
