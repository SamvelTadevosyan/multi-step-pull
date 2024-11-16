import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    // actions
    fetchPollSteps,
    nextStep,
    completePoll,
    // selectors
    selectCurrentStep,
    selectSteps,
    selectPoolComplete,
} from './pollSlice';

import {
    setAnswer,
    selectAnswers,
} from '../summary/summarySlice';

import Carousel from "../../components/Carousel";

function Poll() {
    const currentStep = useAppSelector(selectCurrentStep);
    const steps = useAppSelector(selectSteps);
    const answers = useAppSelector(selectAnswers);
    const isPollCompleted = useAppSelector(selectPoolComplete);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPollSteps());
    }, [dispatch]);

    const handleIconClick = (option: any) => {
        dispatch(setAnswer({ step: currentStep, answer: option }));

        if (steps.length - 1 === currentStep) {
            dispatch(completePoll());
        } else {
            dispatch(nextStep());
        }
    }

    return !isPollCompleted ? (
        <Carousel
            steps={steps}
            answers={answers}
            onSelectOption={handleIconClick}
        />
    ) : null
}

export default Poll;