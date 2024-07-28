import { useState } from "react";
import { Box, MenuItem, Button, Typography, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import QuizTypeSelector from "./QuizTypeSelector";
import IndividualQuiz from "./IndividualQuiz";
import { blue } from "@mui/material/colors";
import CompetitionQuiz from "./CompetitionQuiz";

const subjectsMap = new Map<string, string[]>([
    ["Math", ["Geometry", "Statistics"]],
    ["Physics", ["Thermodynamics", "NLM"]],
    ["Chemistry", ["Organic", "Inorganic"]],
]);

export interface QuizTypeOption {
    id: string;
    description: string;
}

export const quizTypes: QuizTypeOption[] = [
    { id: 'Individual Quiz', description: 'Collect the tokens using the individual quiz by answering right for the provided questions. For each correct answer, 1 token will be rewarded' },
    { id: 'Competition Quiz', description: 'Bet with your competators on amount of tokens of your choice. Whoever wins will get all the tokens and other will loose the tokens amount.' },
];

export default function Game() {
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [selectedTopic, setSelectedTopic] = useState<string>("");
    const [selectedQuizType, setSelectedQuizType] = useState<string | null>(null);
    const [bettingAmount, setBettingAmount] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [finalizeBet, setFinalizeBet] = useState(false);

    const handleSubjectChange = (event: SelectChangeEvent) => {
        setSelectedSubject(event.target.value as string);
        setSelectedTopic("");
    };

    const handleTopicChange = (event: SelectChangeEvent) => {
        setSelectedTopic(event.target.value as string);
    };
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', m: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: "center" }}>
                    Select Subject and Topic
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 4 }}>
                    <Box>
                        <Select
                            id="subject"
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            sx={{ minWidth: 200, color: 'black' }}
                        >
                            <MenuItem value="">Select Subject</MenuItem>
                            {Array.from(subjectsMap.keys()).map((subject) => (
                                <MenuItem key={subject} value={subject}>
                                    {subject}
                                </MenuItem>
                            ))}
                        </Select>
                        <Typography sx={{ fontWeight: 'bold', textAlign: "center" }}>
                            Subject
                        </Typography>
                    </Box>
                    <Box>
                        <Select
                            id="topic"
                            value={selectedTopic}
                            onChange={handleTopicChange}
                            sx={{ minWidth: 200 }}
                            disabled={!selectedSubject}
                        >
                            <MenuItem value="">Select Topic</MenuItem>
                            {selectedSubject &&
                                subjectsMap.get(selectedSubject)?.map((topic) => (
                                    <MenuItem key={topic} value={topic}>
                                        {topic}
                                    </MenuItem>
                                ))}
                        </Select>
                        <Typography sx={{ fontWeight: 'bold', textAlign: "center" }}>
                            Topic
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                    <QuizTypeSelector quizTypes={quizTypes} setSelectedQuizType={setSelectedQuizType} />
                </Box>

                <Box sx={{ marginTop: 5 }}>
                    <Button variant="contained" onClick={(e) => { setIsReady(true) }}>
                        Proceed to Quiz
                    </Button>
                </Box>

                {selectedQuizType && isReady && (
                    <Box sx={{ marginTop: 5, border: `2px solid ${blue[500]}` }}>
                        {selectedQuizType === 'Individual Quiz' && (
                            <IndividualQuiz subject={selectedSubject} topic={selectedTopic} />
                        )}

                        {selectedQuizType === 'Competition Quiz' && (
                            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems:'center'}}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: "center" }}>
                                        Betting Amount
                                    </Typography>

                                    <TextField
                                        id="betting-amount"
                                        label="Betting Amount"
                                        type="number"
                                        defaultValue={5}
                                        value={bettingAmount}
                                        onChange={(event) => setBettingAmount(Number(event.target.value))}
                                        sx={{ margin: '10px' }}
                                        disabled={finalizeBet}
                                        error={bettingAmount < 5}
                                        helperText={bettingAmount < 5 ? 'Betting amount should be greater than 4' : ''}
                                    />

                                    <Button variant="contained" onClick={(e) => { setFinalizeBet(true) }}>
                                        Search for users
                                    </Button>
                                </Box>
                                <CompetitionQuiz subject={selectedSubject} topic={selectedTopic} />
                            </Box>
                        )}
                    </Box>
                )}


            </Box>
        </>
    );
}