import React from 'react';

// styles
import Styled from './Summary.styled'

import {
    resetPoll,
    selectSteps,
    selectPoolComplete,
} from '../poll/pollSlice';

import CircularProgress from '@mui/material/CircularProgress';
import {Typography, Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAnswers, selectIsSubmitting, submitAnswers} from "./summarySlice";

export default function Summary() {
    const isSubmitting = useAppSelector(selectIsSubmitting);
    const answers = useAppSelector(selectAnswers);
    const steps = useAppSelector(selectSteps);
    const isPollCompleted = useAppSelector(selectPoolComplete);
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        dispatch(submitAnswers(answers));
    }

    const handleResetPoll = () => {
        dispatch(resetPoll())
    };

    return isPollCompleted ? (
        <Styled.SummarySlide>
            <Styled.AnswersContainer>
                <div>
                    {steps.map((step, index) => {
                        return (
                            <Styled.Answers key={index}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold'}} component="p">
                                    {step.title}
                                </Typography>
                            </Styled.Answers>
                        )}
                    )}
                </div>
                <div>
                    {steps.map((step, index) => {
                        return (
                            <Styled.Answers key={index}>
                                <Typography variant="h4" component="p">
                                    {answers[index].icon} {answers[index].label}
                                </Typography>
                            </Styled.Answers>
                        )}
                    )}
                </div>
            </Styled.AnswersContainer>
            <Styled.ButtonContainer>
                <Styled.SubmitButton
                    variant="contained"
                    color="secondary"
                    onClick={handleResetPoll}
                >
                    Reset
                </Styled.SubmitButton>
                <Styled.SubmitButton
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                    onClick={handleSubmit}
                >
                    Submit
                </Styled.SubmitButton>
            </Styled.ButtonContainer>
        </Styled.SummarySlide>
    ) : null;
}

