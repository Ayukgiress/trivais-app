import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrivia } from '../context/TriviaContext';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { questions, answers, resetGame } = useTrivia();

  const score = answers.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].correct_answer ? 1 : 0);
  }, 0);

  const handleRestart = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="results-page">
      <h1>Results</h1>
      <p>Your score: {score} / {questions.length}</p>
      <div className="results-list">
        {questions.map((question, index) => (
          <div key={index} className="result-item">
            <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
            <p>Your answer: {answers[index]}</p>
            <p>Correct answer: {question.correct_answer}</p>
            <p className={answers[index] === question.correct_answer ? 'correct' : 'incorrect'}>
              {answers[index] === question.correct_answer ? 'Correct' : 'Incorrect'}
            </p>
          </div>
        ))}
      </div>
      <button onClick={handleRestart}>Play Again</button>
    </div>
  );
};

export default ResultsPage;
