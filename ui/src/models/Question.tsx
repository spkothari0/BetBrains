interface Question {
    id: string;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
    topic: string;
    subject: string;
    difficulty: number;
}

export default Question;