import { Box, Typography } from "@mui/material";

interface QuizTypePopupProps {
    id: string;
    description: string;
}

export default function QuizTypePopup(props: QuizTypePopupProps) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: "center" }}>
                {props.id}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
                {props.description}
            </Typography>
        </Box>
    );
}

export type { QuizTypePopupProps };
