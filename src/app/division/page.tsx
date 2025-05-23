"use client";
import React, { useState, useEffect, useRef } from 'react'

export default function Page() {
    const [dividend, setDividend] = useState<number>(0);
    const [divisor, setDivisor] = useState<number>(0);
    const userAnswerRef = useRef<HTMLInputElement>(null);

    // Generate random numbers for division
    const generateRandomNumbers = () => {
        // Generate divisor first (1-10)
        const newDivisor = Math.floor(Math.random() * 9) + 1;
        
        // Generate a random multiplier (1-10) to ensure clean division
        const multiplier = Math.floor(Math.random() * 1000) + 1;
        
        // Calculate dividend to ensure it's evenly divisible
        const newDividend = newDivisor * multiplier;
        
        setDividend(newDividend);
        setDivisor(newDivisor);
    };

    // Generate random numbers on component mount
    useEffect(() => {
        generateRandomNumbers();
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        const userAnswer = Number(userAnswerRef.current?.value || '0');
        const correctAnswer = dividend / divisor;
        
        if (userAnswer === correctAnswer) {
            alert('Success! Your answer is correct! 🎉');
            // Generate new numbers for the next question
            generateRandomNumbers();
            // Clear the input field
            if (userAnswerRef.current) {
                userAnswerRef.current.value = '';
            }
        } else {
            alert('Incorrect. Try again!');
            if (userAnswerRef.current) {
                userAnswerRef.current.value = '';
                userAnswerRef.current.focus();
            }
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto bg-white rounded-xl shadow-md transition-all">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center">Division Quiz</h1>
            
            <div className="text-center mb-6">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    {dividend} ÷ {divisor} = ?
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="flex flex-col">
                    <label className="mb-2 font-medium text-center text-sm sm:text-base">
                        Your Answer:
                        <input 
                            type="number" 
                            ref={userAnswerRef}
                            className="mt-2 block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base sm:text-lg"
                            placeholder="Enter your answer"
                            required
                            autoFocus
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                    </label>
                </div>
                
                <button 
                    type="submit"
                    className="w-full py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm sm:text-base font-medium transition-colors"
                >
                    Check Answer
                </button>
                
            </form>
        </div>
    );
}
