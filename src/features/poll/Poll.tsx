import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    // actions
    setAnswer,
    nextStep,
    completePoll,
    // selectors
    selectCurrentStep,
    selectAnswers, selectPoolComplete
} from './pollSlice';
import { steps } from '../../constants';
import Carousel from "../../components/Carousel";
import Styled from "./Poll.styled";

export function Poll() {
    const currentStep = useAppSelector(selectCurrentStep);
    const answers = useAppSelector(selectAnswers);
    const isPollCompleted = useAppSelector(selectPoolComplete);
    const dispatch = useAppDispatch();

    const handleIconClick = (option: any) => {
        dispatch(setAnswer({ step: currentStep, answer: option }));
        console.log("currentStep :::", currentStep)
        dispatch(nextStep());
        if (steps.length - 1 === currentStep) {
            dispatch(completePoll());
        }
    }

    return (
        <Styled.PollContainer>
            <Carousel
                steps={steps}
                answers={answers}
                onSelectOption={handleIconClick}
            />
        </Styled.PollContainer>

    // <div>
    //     {!isPollCompleted && (
    //         <>
    //             <div>
    //                 {
    //                     steps[currentStep].title
    //                 }
    //             </div>
    //             {steps[currentStep].options.map(option => (
    //                 <div key={option.id} onClick={() => handleIconClick(option)}>
    //                     {option.label}
    //                 </div>
    //             ))}
    //         </>
    //     )}
    //     {isPollCompleted && answers.map((answer, index) => (
    //         <div key={index}>
    //             {answer.label}
    //         </div>
    //     ))}
    // </div>
    );
}
