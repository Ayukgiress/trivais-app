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
    return <div>Loading...</div>;
  }

  const handleAnswer = (answer) => {
    answerQuestion(answer);
    if (questionIndex < questions.length - 1) {
      navigate(`/question/${questionIndex + 1}`);
    } else {
      navigate('/results');
    }
  };

  return (
    <div className="question-page">
      <h2>Question {questionIndex + 1} of {questions.length}</h2>
      <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
      <div className="answers">
        <button onClick={() => handleAnswer('True')}>True</button>
        <button onClick={() => handleAnswer('False')}>False</button>
      </div>
    </div>
  );
};

export default QuestionPage;
