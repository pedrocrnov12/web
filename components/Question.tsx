import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface QuestionProps {
  question: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
  onAnswerOptionClick: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswerOptionClick, onNextQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(15);

  useEffect(() => {
    setSelectedAnswer('');  // Reset selected answer when question changes
    setTimeLeft(15);  // Reset timer when question changes
  }, [question]);

  useEffect(() => {
    if (timeLeft === 0) {
      onAnswerOptionClick(false);
      onNextQuestion();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswerOptionClick(answer === question.correctAnswer);
  };

  return (
    <Card style={{ marginTop: '20px', padding: '20px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{question.question}</Typography>
        {question.options.map((option) => (
          <Button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={selectedAnswer !== ''}
            style={{
              backgroundColor:
                selectedAnswer === option
                  ? option === question.correctAnswer
                    ? 'green'
                    : 'red'
                  : '',
              margin: '8px 0',
              width: '100%',
              color: selectedAnswer === option ? 'white' : 'black',  // Ensure text is visible
              fontWeight: 'bold',
            }}
          >
            {option}
          </Button>
        ))}
        <Typography variant="h6" color="textSecondary">Tiempo restante: {timeLeft}s</Typography>
        {selectedAnswer && (
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={onNextQuestion}>
              Next Question
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Question;
