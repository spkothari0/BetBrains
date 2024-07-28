import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Question from '../models/Question';

export default function CompetitionQuiz(props: { subject: string, topic: string }) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndexUser1, setCurrentQuestionIndexUser1] = useState(0);
    const [currentQuestionIndexUser2, setCurrentQuestionIndexUser2] = useState(0);
    const [selectedAnswerUser1, setSelectedAnswerUser1] = useState<string | null>(null);
    const [selectedAnswerUser2, setSelectedAnswerUser2] = useState<string | null>(null);
    const [feedbackUser1, setFeedbackUser1] = useState<string | null>(null);
    const [feedbackUser2, setFeedbackUser2] = useState<string | null>(null);
    const [time, setTime] = useState(15); // Example: 15 seconds timer
    const [quizComplete, setQuizComplete] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [scoreUser1, setScoreUser1] = useState(0);
    const [scoreUser2, setScoreUser2] = useState(0);

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

    const handleAnswerClick = (user: number, answer: string) => {
        if (quizComplete || time <= 0) return;

        if (user === 1) {
            if (feedbackUser1) return; // Prevent multiple clicks

            if (answer === questions[currentQuestionIndexUser1].answer) {
                setFeedbackUser1('correct');
                setScoreUser1(prevScore => prevScore + 1);
            } else {
                setFeedbackUser1('incorrect');
            }
            setSelectedAnswerUser1(answer);
        } else {
            if (feedbackUser2) return; // Prevent multiple clicks

            if (answer === questions[currentQuestionIndexUser2].answer) {
                setFeedbackUser2('correct');
                setScoreUser2(prevScore => prevScore + 1);
            } else {
                setFeedbackUser2('incorrect');
            }
            setSelectedAnswerUser2(answer);
        }
    };

    const handleNextQuestion = (user: number) => {
        if (user === 1) {
            if (currentQuestionIndexUser1 < questions.length - 1) {
                setSelectedAnswerUser1(null);
                setFeedbackUser1(null);
                setCurrentQuestionIndexUser1(prevIndex => prevIndex + 1);
            }
        } else {
            if (currentQuestionIndexUser2 < questions.length - 1) {
                setSelectedAnswerUser2(null);
                setFeedbackUser2(null);
                setCurrentQuestionIndexUser2(prevIndex => prevIndex + 1);
            }
        }
    };

    const handleStart = () => {
        setTime(60); // Reset timer to initial value
        setCurrentQuestionIndexUser1(0); // Reset to first question for User 1
        setCurrentQuestionIndexUser2(0); // Reset to first question for User 2
        setSelectedAnswerUser1(null);
        setSelectedAnswerUser2(null);
        setFeedbackUser1(null);
        setFeedbackUser2(null);
        setQuizComplete(false);
        setTimerStarted(true);
        setScoreUser1(0);
        setScoreUser2(0);
    };

    const handleClose = () => {
        setQuizComplete(false);
        setTimerStarted(false);
    };

    if (questions.length === 0) {
        return <Typography>Loading questions...</Typography>;
    }

    const currentQuestionUser1 = questions[currentQuestionIndexUser1];
    const currentQuestionUser2 = questions[currentQuestionIndexUser2];
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <Box sx={{ m: 3 }}>
            <Typography variant="h4">
                Timer: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5 ,mt: 2, border:`2px solid` }}>
                {/* User 1 Section */}
                <Box sx={{ width: '48%', borderRight:`2px solid`, p:2 }}>
                    <Typography variant="h5">User 1</Typography>
                    <Typography variant="h6">{currentQuestionUser1.question}</Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {currentQuestionUser1.options.map((option, index) => (
                            <Grid item xs={6} key={index}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleAnswerClick(1, option)}
                                    sx={{
                                        width: '100%',
                                        backgroundColor: 
                                            feedbackUser1 && option === currentQuestionUser1.answer ? 'green' :
                                            feedbackUser1 && option === selectedAnswerUser1 ? 'red' : undefined,
                                        '&:hover': {
                                            backgroundColor: 
                                                feedbackUser1 && option === currentQuestionUser1.answer ? 'green' :
                                                feedbackUser1 && option === selectedAnswerUser1 ? 'red' : undefined
                                        },
                                    }}
                                    disabled={feedbackUser1 !== null || time <= 0 || !timerStarted}
                                >
                                    {option}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    {feedbackUser1 && (
                        <Typography sx={{ mt: 2 }} color={feedbackUser1 === 'correct' ? 'green' : 'red'}>
                            {feedbackUser1 === 'correct' ? 'Correct!' : `Incorrect! The correct answer is ${currentQuestionUser1.answer}.`}
                        </Typography>
                    )}
                    {feedbackUser1 && currentQuestionIndexUser1 < questions.length - 1 && (
                        <Button variant="outlined" onClick={() => handleNextQuestion(1)} sx={{ mt: 2 }}>
                            Next Question
                        </Button>
                    )}
                </Box>

                {/* User 2 Section */}
                <Box sx={{ width: '48%', borderLeft:`2px solid`, p:2 }}>
                    <Typography variant="h5">User 2</Typography>
                    <Typography variant="h6">{currentQuestionUser2.question}</Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {currentQuestionUser2.options.map((option, index) => (
                            <Grid item xs={6} key={index}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleAnswerClick(2, option)}
                                    sx={{
                                        width: '100%',
                                        backgroundColor: 
                                            feedbackUser2 && option === currentQuestionUser2.answer ? 'green' :
                                            feedbackUser2 && option === selectedAnswerUser2 ? 'red' : undefined,
                                        '&:hover': {
                                            backgroundColor: 
                                                feedbackUser2 && option === currentQuestionUser2.answer ? 'green' :
                                                feedbackUser2 && option === selectedAnswerUser2 ? 'red' : undefined
                                        },
                                    }}
                                    disabled={feedbackUser2 !== null || time <= 0 || !timerStarted}
                                >
                                    {option}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    {feedbackUser2 && (
                        <Typography sx={{ mt: 2 }} color={feedbackUser2 === 'correct' ? 'green' : 'red'}>
                            {feedbackUser2 === 'correct' ? 'Correct!' : `Incorrect! The correct answer is ${currentQuestionUser2.answer}.`}
                        </Typography>
                    )}
                    {feedbackUser2 && currentQuestionIndexUser2 < questions.length - 1 && (
                        <Button variant="outlined" onClick={() => handleNextQuestion(2)} sx={{ mt: 2 }}>
                            Next Question
                        </Button>
                    )}
                </Box>
            </Box>

            {quizComplete && (
                <Dialog open={quizComplete} onClose={handleClose}>
                    <DialogTitle>Quiz Complete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            User 1 Score: {scoreUser1}
                            <br />
                            User 2 Score: {scoreUser2}
                            <br />
                            {scoreUser1 === scoreUser2 ? 'It\'s a tie!' : scoreUser1 > scoreUser2 ? 'User 1 wins!' : 'User 2 wins!'}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {!timerStarted && (
                <Button variant="contained" onClick={handleStart} sx={{ mt: 2 }}>
                    Start
                </Button>
            )}

            {timerStarted && quizComplete && (
                <Button variant="contained" onClick={handleStart} sx={{ mt: 2 }}>
                    Restart
                </Button>
            )}
        </Box>
    );
}
