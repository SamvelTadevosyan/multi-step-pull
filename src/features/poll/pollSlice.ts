import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import {OptionType} from "../../types";

interface PollState {
    currentStep: number;
    answers: OptionType[];
    completed: boolean;
}

const initialState: PollState = {
    currentStep: 0,
    answers: [],
    completed: false,
};

const pollSlice = createSlice({
    name: 'poll',
    initialState,
    reducers: {
        setAnswer: (state, action: PayloadAction<{ step: number; answer: OptionType }>) => {
            state.answers[action.payload.step] = action.payload.answer;
        },
        nextStep: (state) => {
                state.currentStep += 1;
            },
        resetPoll: (state) => {
            state.currentStep = 0;
            state.answers = [];
            state.completed = false;
        },
        completePoll: (state) => {
            state.completed = true;
        },
    },
});

// actions
export const { setAnswer, nextStep, completePoll } = pollSlice.actions;

// selectors
export const selectCurrentStep = (state: RootState) => {
    return state.poll.currentStep
};

export const selectAnswers = (state: RootState) => {
    return state.poll.answers
};

export const selectPoolComplete = (state: RootState) => {
    return state.poll.completed
};

export default pollSlice.reducer;