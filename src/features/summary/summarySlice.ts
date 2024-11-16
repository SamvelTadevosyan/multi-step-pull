import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { OptionType } from '../../types';
import axios from "axios";
import {RootState} from "../../app/store";

export interface AnswersState {
    answers: OptionType[];
    isSubmitting: boolean;
    isSubmitted: boolean;
    error: string | null;
}

const initialState: AnswersState = {
    answers: [],
    isSubmitting: false,
    isSubmitted: false,
    error: null,
};

export const submitAnswers = createAsyncThunk(
    'answers/submitAnswers',
    async (answers: OptionType[]) => {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            answers,
        });
        return response.data;
    }
);

const summarySlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {
        setAnswer: (state, action: PayloadAction<{ step: number; answer: OptionType }>) => {
            state.answers[action.payload.step] = action.payload.answer;
        },
        resetAnswers: (state) => {
            state.answers = [];
            state.isSubmitted = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitAnswers.pending, (state) => {
                state.isSubmitting = true;
                state.error = null;
            })
            .addCase(submitAnswers.fulfilled, (state) => {
                state.isSubmitting = false;
                state.isSubmitted = true;
            })
            .addCase(submitAnswers.rejected, (state, action) => {
                state.isSubmitting = false;
                state.error = action.error.message || 'Failed to submit answers';
            });
    },
});

export const selectAnswers = (state: RootState) => state.summary.answers;
export const selectIsSubmitting = (state: RootState) => state.summary.isSubmitting;
export const selectIsSubmitted = (state: RootState) => state.summary.isSubmitted;
export const selectError = (state: RootState) => state.summary.error;

export const { setAnswer, resetAnswers } = summarySlice.actions;
export default summarySlice.reducer;
