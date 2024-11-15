import React, { useState } from 'react';

// styles
import Styled from './Carousel.styled'

// types
import {GenericCallback, OptionType, Step} from "../../types";

// components
import Option from "./components/Option";
import Question from "./components/Question";

type CarouselProps = {
    steps: Step[];
    onSelectOption: GenericCallback;
    answers: any,
};

export default function Carousel({ steps, answers, onSelectOption }: CarouselProps): JSX.Element | null {
    const [currentStep, setCurrentIndex] = useState(0);

    const nextItem = (option: OptionType) => {
        setCurrentIndex(currentStep + 1)
        onSelectOption(option)
    };

    return (
        <Styled.CarouselContainer>
            <Styled.ProgressContainer $offset={steps.length/2}>
                {steps.map(({ id }, index) => (
                    <Styled.ProgressDot key={id} $isActive={currentStep === index}/>
                ))}
            </Styled.ProgressContainer>
            <Styled.SliderContainer $currentStep={currentStep} $length={steps.length}>
                {steps.map((step, index) => {
                    return (
                        <Styled.CarouselItem key={index}>
                            <Styled.LeftContainer>
                                <Question
                                    title={step.title || ''}
                                />
                            </Styled.LeftContainer>

                            <Styled.RightContainer>
                                {step.options.map((option, index) => (
                                    <Option
                                        key={index}
                                        isSelected={answers?.[currentStep]?.id === option.id}
                                        option={option}
                                        onOptionSelect={(option) => nextItem(option)}
                                    />
                                ))}
                            </Styled.RightContainer>
                        </Styled.CarouselItem>
                    )}
                )}
            </Styled.SliderContainer>
        </Styled.CarouselContainer>
    )
}
