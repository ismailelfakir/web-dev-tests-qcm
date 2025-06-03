import { useState, useEffect } from 'react';
import Question from './components/Question';
import Result from './components/Result';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedQcm, setSelectedQcm] = useState(null);
  const [title, setTitle] = useState('');

  const qcmList = [
    { id: 'web_exam', name: 'Examen Web', file: '/qcm_web_exam.json', icon: '📝' },
    { id: 'dns', name: 'DNS', file: '/qcm_dns.json', icon: '🌐' },
    { id: 'html', name: 'HTML', file: '/qcm_html.json', icon: '📝' },
    { id: 'css', name: 'CSS', file: '/qcm_css.json', icon: '🎨' },
    { id: 'js', name: 'JavaScript', file: '/qcm_js.json', icon: '⚡' },
    { id: 'apache', name: 'Apache', file: '/qcm_apache.json', icon: '🚀' },
    { id: 'php', name: 'PHP', file: '/qcm_php.json', icon: '🐘' },
    { id: 'bootstrap', name: 'Bootstrap', file: '/qcm_bootstrap.json', icon: '🅱️' }
  ];

  useEffect(() => {
    if (selectedQcm) {
      fetch(selectedQcm.file)
        .then(response => response.json())
        .then(data => {
          setQuestions(data.questions);
          setTitle(data.title);
          document.title = `${data.title} | COFOEM Tests`;
        })
        .catch(error => console.error('Error loading questions:', error));
    } else {
      document.title = 'COFOEM Tests';
    }
  }, [selectedQcm]);

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setIsFinished(false);
    setSelectedQcm(null);
  };

  if (!selectedQcm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">COFOEM Tests</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qcmList.map(qcm => (
              <button
                key={qcm.id}
                onClick={() => setSelectedQcm(qcm)}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{qcm.icon}</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{qcm.name}</h2>
                <p className="text-indigo-600">Cliquez pour commencer</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleRestart}
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            ← Retour aux QCM
          </button>
          <h1 className="text-3xl font-bold text-center text-indigo-900">{title}</h1>
          <div className="w-20"></div>
        </div>
        
        {!isFinished ? (
          <>
            <div className="mb-6 flex justify-center items-center space-x-4">
              <div className="text-lg text-indigo-800">
                Question {currentQuestion + 1} sur {questions.length}
              </div>
              <div className="h-2 w-48 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <Question
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
            />
          </>
        ) : (
          <Result
            score={score}
            total={questions.length}
            answers={userAnswers}
            questions={questions}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App;