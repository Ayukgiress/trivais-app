import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrivia } from '../context/TriviaContext';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { questions, answers, resetGame } = useTrivia();

  const score = answers.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].correct_answer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  const handleRestart = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="results-page">
      <h1>🎉 Your Results 🎉</h1>
      <div className="score-summary">
        <div className="score-circle">
          <span className="score-number">{score}</span>
          <span className="score-total">/{questions.length}</span>
        </div>
        <p className="percentage">{percentage}% Correct</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      <div className="results-list">
        {questions.map((question, index) => (
          <div key={index} className="result-card">
            <div className="question-header">
              <span className="question-number">Q{index + 1}</span>
              <span className={`result-icon ${answers[index] === question.correct_answer ? 'correct-icon' : 'incorrect-icon'}`}>
                {answers[index] === question.correct_answer ? '✅' : '❌'}
              </span>
            </div>
            <p className="question-text" dangerouslySetInnerHTML={{ __html: question.question }}></p>
            <div className="answer-details">
              <p><strong>Your answer:</strong> {answers[index]}</p>
              <p><strong>Correct answer:</strong> {question.correct_answer}</p>
            </div>
            <p className={`result-status ${answers[index] === question.correct_answer ? 'correct' : 'incorrect'}`}>
              {answers[index] === question.correct_answer ? 'Correct!' : 'Incorrect'}
            </p>
          </div>
        ))}
      </div>
      <button onClick={handleRestart}>🔄 Play Again</button>
    </div>
  );
};

export default ResultsPage;
