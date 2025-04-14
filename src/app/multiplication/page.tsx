"use client";
import React, { useState, useEffect, useRef } from 'react'

export default function Page() {
    const [firstNumber, setFirstNumber] = useState<number>(0);
    const [secondNumber, setSecondNumber] = useState<number>(0);
    const userAnswerRef = useRef<HTMLInputElement>(null);

    // Generate random numbers between 1 and 10
    const generateRandomNumbers = () => {
        setFirstNumber(Math.floor(Math.random() * 20) + 1);
        setSecondNumber(Math.floor(Math.random() * 20) + 1);
    };

    // Generate random numbers on component mount
    useEffect(() => {
        generateRandomNumbers();
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        const userAnswer = Number(userAnswerRef.current?.value || '0');
        const correctAnswer = firstNumber * secondNumber;
        
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
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Multiplication Quiz</h1>
            
            <div className="text-center mb-6">
                <p className="text-3xl font-bold">
                    {firstNumber} × {secondNumber} = ?
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="mb-2 font-medium text-center">
                        Your Answer:
                        <input 
                            type="number" 
                            ref={userAnswerRef}
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your answer"
                            required
                            autoFocus
                        />
                    </label>
                </div>
                
                <button 
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Check Answer
                </button>
                
            </form>
        </div>
    );
}
