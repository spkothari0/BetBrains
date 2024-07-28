import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import QuizTypePopup from './QuizType';
import { QuizTypeOption } from './Game';

export default function QuizTypeSelector(prop: { quizTypes: QuizTypeOption[], setSelectedQuizType: Dispatch<SetStateAction<string|null>> }) {
    const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
    const handleSelect = (id: string) => {
        setSelectedQuiz(id);
        prop.setSelectedQuizType(id);
    };

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {prop.quizTypes.map((quizType) => (
                <Box
                    key={quizType.id}
                    onClick={() => handleSelect(quizType.id)}
                    sx={{
                        p: 2,
                        cursor: 'pointer',
                        border: selectedQuiz === quizType.id ? '2px solid blue' : '2px solid transparent',
                        '&:hover': {
                            border: '2px solid gray',
                        },
                        backgroundColor: selectedQuiz === quizType.id ? 'blue' : 'lightblue',
                    }}
                >
                    <QuizTypePopup id={quizType.id} description={quizType.description} />
                </Box>
            ))}
        </Box>
    );
}
