import React from 'react';

const Result = ({ score, total, answers, questions, onRestart }) => {
  const percentage = (score / total) * 100;
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Score final : {score}/{total} ({percentage.toFixed(1)}%)
        </h2>
        
        <div className="w-full h-4 bg-gray-200 rounded-full mb-8">
          <div 
            className="h-4 rounded-full transition-all duration-1000"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: percentage >= 80 ? '#34D399' : percentage >= 50 ? '#FBBF24' : '#EF4444'
            }}
          ></div>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold mb-8"
        >
          Recommencer un QCM
        </button>
        
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-lg ${
                answers[index] === question.answer 
                  ? 'bg-green-50 border-2 border-green-200' 
                  : 'bg-red-50 border-2 border-red-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">{question.question}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  answers[index] === question.answer 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-red-200 text-red-800'
                }`}>
                  {answers[index] === question.answer ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <p className="text-green-700">
                  ✓ Bonne réponse : {question.answer}. {question.options[question.answer.charCodeAt(0) - 65]}
                </p>
                {answers[index] !== question.answer && (
                  <p className="text-red-700">
                    ✗ Votre réponse : {answers[index]}. {question.options[answers[index].charCodeAt(0) - 65]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;