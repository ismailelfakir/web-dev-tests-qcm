import React from 'react';

const Question = ({ question, onAnswer }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
        <div className="text-sm text-indigo-600 font-medium mb-4">{question.part}</div>
        <h2 className="text-xl font-bold text-gray-800 mb-8">{question.question}</h2>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(String.fromCharCode(65 + index))}
              className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 flex items-center space-x-4"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;