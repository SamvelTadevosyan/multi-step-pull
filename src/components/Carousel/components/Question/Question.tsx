import React from "react";
import Styled from "./Question.styled";
import { Typography } from "@mui/material";

type QuestionProps = {
    title: string
}

export default function Question({ title }: QuestionProps): JSX.Element {
return (
    <Styled.QuestionContainer>
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            {title}
        </Typography>
    </Styled.QuestionContainer>
)}