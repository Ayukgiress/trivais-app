import React, { createContext, useContext, useState, useEffect } from 'react';

const TriviaContext = createContext();

export const useTrivia = () => {
  const context = useContext(TriviaContext);
  if (!context) {
    throw new Error('useTrivia must be used within a TriviaProvider');
  }
  return context;
};

export const TriviaProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');
        if (!response.ok) {
          if (response.status === 429) {
            throw new Error('Too many requests. Please try again later.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data.results || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const answerQuestion = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const value = {
    questions,
    currentQuestionIndex,
    answers,
    loading,
    error,
    answerQuestion,
    resetGame,
  };

  return (
    <TriviaContext.Provider value={value}>
      {children}
    </TriviaContext.Provider>
  );
};
