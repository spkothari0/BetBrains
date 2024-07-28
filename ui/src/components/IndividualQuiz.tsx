import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Question from '../models/Question';

export default function IndividualQuiz(props: { subject: string, topic: string }) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [time, setTime] = useState(10); // Initial timer value
    const [quizComplete, setQuizComplete] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);

    useEffect(() => {
        fetch('/data/questions.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: Question[]) => {
                const filteredQuestions = data.filter(
                    (question: Question) => question.subject === props.subject && question.topic === props.topic
                );
                setQuestions(filteredQuestions);
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, [props.subject, props.topic]);

    useEffect(() => {
        if (!timerStarted || quizComplete || time <= 0) return;

        const timer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setQuizComplete(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timerStarted, quizComplete]);

    const handleAnswerClick = (answer: string) => {
        if (feedback || time <= 0 || !timerStarted) return; // Prevent multiple clicks or answering if the timer has stopped or quiz is complete

        if (answer === questions[currentQuestionIndex].answer) {
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setSelectedAnswer(null);
            setFeedback(null);
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            if(currentQuestionIndex == questions.length - 1) {
                setQuizComplete(true);
            }
        } else {
            setQuizComplete(true);
        }
    };

    const handleStart = () => {
        setTime(30); // Reset timer to initial value
        setCurrentQuestionIndex(0); // Reset to first question
        setSelectedAnswer(null);
        setFeedback(null);
        setQuizComplete(false);
        setTimerStarted(true);
    };

    const handleClose = () => {
        setQuizComplete(false);
        setTimerStarted(false);
    };

    if (questions.length === 0) {
        return <Typography>Loading questions...</Typography>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <Box sx={{ m: 3 }}>
            <Typography variant="h4">
                Timer: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h5">{currentQuestion.question}</Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {currentQuestion.options.map((option, index) => (
                        <Grid item xs={6} key={index}>
                            <Button
                                variant="contained"
                                onClick={() => handleAnswerClick(option)}
                                sx={{
                                    width: '100%', // Make all buttons the same width
                                    backgroundColor: 
                                        feedback && option === currentQuestion.answer ? 'green' :
                                        feedback && option === selectedAnswer ? 'red' : undefined,
                                    '&:hover': {
                                        backgroundColor: 
                                            feedback && option === currentQuestion.answer ? 'green' :
                                            feedback && option === selectedAnswer ? 'red' : undefined
                                    },
                                }}
                                disabled={feedback !== null || time <= 0 || !timerStarted}
                            >
                                {option}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
                {feedback && (
                    <Typography sx={{ mt: 2 }} color={feedback === 'correct' ? 'green' : 'red'}>
                        {feedback === 'correct' ? 'Correct!' : `Incorrect! The correct answer is ${currentQuestion.answer}.`}
                    </Typography>
                )}
                {feedback && currentQuestionIndex < questions.length - 1 && (
                    <Button variant="outlined" onClick={handleNextQuestion} sx={{ mt: 2 }}>
                        Next Question
                    </Button>
                )}
            </Box>
            {quizComplete && (
                <Dialog open={quizComplete} onClose={handleClose}>
                    <DialogTitle>Quiz Complete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You have completed the quiz. Well done!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleStart} sx={{ mt: 2 }}>
                    {quizComplete || time <= 0 ? 'Restart' : 'Start'}
                </Button>
            </Box>
        </Box>
    );
}
