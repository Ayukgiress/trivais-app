import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrivia } from '../context/TriviaContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { loading, error } = useTrivia();

  const handleStart = () => {
    if (!loading && !error) {
      navigate('/question/0');
    }
  };

  return (
    <div className="landing-page">
      <h1>Trivia Challenge</h1>
      <p>Test your knowledge with 10 hard true or false questions!</p>
      <p>You cannot go back to previous questions once answered.</p>
      <div className="game-features">
        <div className="feature">
          <span className="feature-icon">🎓</span>
          <span>Educational & Fun</span>
        </div>
        <div className="feature">
          <span className="feature-icon">⚡</span>
          <span>Quick Answers</span>
        </div>
        <div className="feature">
          <span className="feature-icon">🏆</span>
          <span>Challenge Yourself</span>
        </div>
      </div>
      {loading && <p>Loading questions...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleStart} disabled={loading || error}>
        Start Game
      </button>
    </div>
  );
};

export default LandingPage;
