import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

export default function LoadingScreen({ onLoadingComplete }) {
  const { progress, errors } = useProgress();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setShowLoader(false);
        if (onLoadingComplete) onLoadingComplete();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [progress, onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-100 transition-opacity duration-500 ${
        showLoader ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Chargement...</h2>

      <div className="w-64 h-2 bg-blue-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-blue-600 font-medium">{Math.round(progress)}%</p>

      {errors.length > 0 && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md max-w-md">
          <p className="font-bold">Erreurs de chargement:</p>
          <ul className="list-disc pl-5">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
