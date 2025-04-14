"use client";
import React, { useState, useEffect, useRef } from 'react'

export default function Page() {
    const [firstNumber, setFirstNumber] = useState<number>(0);
    const [secondNumber, setSecondNumber] = useState<number>(0);
    const userAnswerRef = useRef<HTMLInputElement>(null);

    // Generate random numbers for subtraction
    const generateRandomNumbers = () => {
        // Generate first number (1-50)
        const newFirstNumber = Math.floor(Math.random() * 20) + 1;
        
        // Generate second number (1-20) that is smaller than or equal to first number
        // to avoid negative results which might be harder for beginners
        const newSecondNumber = Math.floor(Math.random() * Math.min(newFirstNumber, 20)) + 1;
        
        setFirstNumber(newFirstNumber);
        setSecondNumber(newSecondNumber);
    };

    // Generate random numbers on component mount
    useEffect(() => {
        generateRandomNumbers();
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        const userAnswer = Number(userAnswerRef.current?.value || '0');
        const correctAnswer = firstNumber - secondNumber;
        
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
            }
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto bg-white rounded-xl shadow-md transition-all">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center">Subtraction Quiz</h1>
            
            <div className="text-center mb-6">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    {firstNumber} - {secondNumber} = ?
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