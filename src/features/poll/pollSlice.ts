import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { OptionType, Step } from "../../types";
import axios from 'axios';
import { localSteps } from "../../constants";

export interface PollState {
    steps: Step[];
    currentStep: number;
    answers: OptionType[];
    completed: boolean;
    loading: boolean;
    error: string | null;
}


const initialState: PollState = {
    steps: [],
    currentStep: 0,
    answers: [],
    completed: false,
    loading: false,
    error: null,
};

export const fetchPollSteps = createAsyncThunk('poll/fetchSteps', async () => {
    const response = await axios.get('https://67386abb4eb22e24fca7dc5e.mockapi.io/api/v1/poll');
    return response.data;
});

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchPollSteps.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPollSteps.fulfilled, (state, action: PayloadAction<any>) => {
                state.steps = action.payload;
                state.loading = false;
            })
            .addCase(fetchPollSteps.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
                // In case if api will not work, just to show how app works
                state.steps = localSteps;
            });
    },
});

// actions
export const { setAnswer, nextStep, completePoll, resetPoll } = pollSlice.actions;

// selectors
export const selectCurrentStep = (state: RootState) => state.poll.currentStep
export const selectSteps = (state: RootState) => state.poll.steps;
export const selectPoolComplete = (state: RootState) => state.poll.completed

export default pollSlice.reducer;