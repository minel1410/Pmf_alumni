import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function Progress({ step }) {
    const [currentStep, setCurrentStep] = useState(step);

    return (
        <div className="flex flex-col items-center justify-center pt-8 bg-white w-full">
            <div className="relative flex items-center justify-between w-3/4 mb-8">
                {/* Siva traka pozadine */}
                <div
                    className="absolute top-1/2 left-0 shadow-xl w-full h-1 bg-gray-300 transform -translate-y-1/2"
                    style={{ zIndex: -1 }}
                ></div>
                {/* Zelena traka progresa */}
                <div
                    className="absolute top-1/2 left-0 h-1 shadow-xl bg-green-500 transform -translate-y-1/2 transition-all duration-300"
                    style={{ width: `${(currentStep - 1) / 2 * 100}%` }}
                ></div>
                {/* Krugovi koraka */}
                {[1, 2, 3].map((step, idx) => (
                    <div
                        key={idx}
                        className={`w-8 h-8 flex items-center justify-center rounded-full shadow-xl transition-colors duration-300 z-20 ${
                            currentStep > step ? 'bg-green-500 text-white' : 'bg-gray-300'
                        }`}
                    >
                        {currentStep > step ? <FontAwesomeIcon icon={faCheck} /> : step}
                    </div>
                ))}
            </div>
            {/* Naslovi koraka */}
            <div className="flex justify-between w-full">
                {['Registracija', 'Interesovanja', 'Slika diplome'].map((label, idx) => (
                    <div
                        key={idx}
                        className={`flex-1 text-center transition-colors duration-300 ${
                            currentStep === idx + 1
                                ? 'text-picton-blue-500'
                                : currentStep > idx + 1
                                ? 'text-gray-500'
                                : 'text-gray-400'
                        }`}
                    >
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Progress;
