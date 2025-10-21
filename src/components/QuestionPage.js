import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrivia } from '../context/TriviaContext';

const QuestionPage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const { questions, answerQuestion } = useTrivia();

  const questionIndex = parseInt(questionId);
  const question = questions[questionIndex];

  if (!question) {
    return (
      <div className="question-page loading">
        <div className="loading-spinner">🔄</div>
        <p>Loading question...</p>
      </div>
    );
  }

  const handleAnswer = (answer) => {
    answerQuestion(answer);
    if (questionIndex < questions.length - 1) {
      navigate(`/question/${questionIndex + 1}`);
    } else {
      navigate('/results');
    }
  };

  const progressPercentage = ((questionIndex + 1) / questions.length) * 100;

  return (
    <div className="question-page">
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <span className="progress-text">{questionIndex + 1} / {questions.length}</span>
      </div>
      <div className="question-card">
        <div className="question-header">
          <span className="question-category">{question.category}</span>
          <span className="difficulty-badge" data-difficulty={question.difficulty}>
            {question.difficulty}
          </span>
        </div>
        <h2 className="question-text" dangerouslySetInnerHTML={{ __html: question.question }}></h2>
        <div className="answers">
          <button className="answer-btn true-btn" onClick={() => handleAnswer('True')}>
            ✅ True
          </button>
          <button className="answer-btn false-btn" onClick={() => handleAnswer('False')}>
            ❌ False
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
