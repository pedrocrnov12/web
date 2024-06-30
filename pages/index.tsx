import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import Question from '../components/Question';

interface QuestionType {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Home: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);

  const startExam = async () => {
    const response = await axios.get('http://localhost:5000/api/questions');
    setQuestions(response.data);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
          <CardContent>
            {showScore ? (
              <>
                <Typography variant="h4" gutterBottom>Tu calificación: {score}</Typography>
                {score >= 8 && <Typography variant="h6" color="primary">Excelente trabajo!</Typography>}
                {score >= 5 && score < 8 && <Typography variant="h6" color="secondary">Buen trabajo!</Typography>}
                {score >= 1 && score < 5 && <Typography variant="h6" color="warning">Sigue practicando!</Typography>}
                {score === 0 && <Typography variant="h6" color="error">Mejor suerte la próxima vez!</Typography>}
                <Box mt={3}>
                  <Button variant="contained" color="primary" onClick={startExam}>
                    Retake Exam
                  </Button>
                </Box>
              </>
            ) : (
              <>
                {questions.length === 0 ? (
                  <>
                    <Typography variant="h5" gutterBottom>Instrucciones para el Examen:</Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                      1. El examen consta de 10 preguntas seleccionadas aleatoriamente de un banco de 30 preguntas.
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                      2. Tienes 15 segundos para responder cada pregunta.
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                      3. Una vez seleccionada una respuesta, no podrás cambiarla.
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                      4. Si el tiempo se agota, la pregunta se marcará como incorrecta.
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                      5. Al finalizar el examen, se te mostrará tu puntuación y un mensaje de acuerdo a tu desempeño.
                    </Typography>
                    <Box mt={5}>
                      <Button variant="contained" color="primary" onClick={startExam} style={{ fontSize: '1.2em', padding: '10px 20px' }}>
                        Empezar Examen
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Question
                    question={questions[currentQuestion]}
                    onAnswerOptionClick={handleAnswerOptionClick}
                    onNextQuestion={handleNextQuestion}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
