import summaryReducer, {
    setAnswer,
    resetAnswers,
    submitAnswers,
} from './summarySlice';
import { AnswersState } from './summarySlice';
import { OptionType } from '../../types';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

jest.mock('axios'); // Mock axios
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('summarySlice', () => {
    const initialState: AnswersState = {
        answers: [],
        isSubmitting: false,
        isSubmitted: false,
        error: null,
    };

    it('should return the initial state', () => {
        expect(summaryReducer(undefined, { type: undefined })).toEqual(initialState);
    });

    it('should handle setAnswer', () => {
        const answer: OptionType = { label: 'Like', icon: '👍' };
        const action = setAnswer({ step: 0, answer });

        const result = summaryReducer(initialState, action);

        expect(result.answers[0]).toEqual(answer);
    });

    it('should handle resetAnswers', () => {
        const modifiedState: AnswersState = {
            ...initialState,
            answers: [{ label: 'Like', icon: '👍' }],
            isSubmitted: true,
        };

        const result = summaryReducer(modifiedState, resetAnswers());
        expect(result).toEqual(initialState);
    });
});

describe('submitAnswers thunk', () => {
    const answersMock: OptionType[] = [
        { label: 'Like', icon: '👍' },
        { label: 'Dislike', icon: '👎' },
    ];

    it('should handle successful submitAnswers', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

        const store = configureStore({
            reducer: summaryReducer,
        });

        await store.dispatch(submitAnswers(answersMock) as any);

        const state = store.getState();
        expect(state.isSubmitting).toBe(false);
        expect(state.isSubmitted).toBe(true);
        expect(state.error).toBeNull();
    });

    it('should handle rejected submitAnswers', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('Failed to submit'));

        const store = configureStore({
            reducer: summaryReducer,
        });

        await store.dispatch(submitAnswers(answersMock) as any);

        const state = store.getState();
        expect(state.isSubmitting).toBe(false);
        expect(state.isSubmitted).toBe(false);
        expect(state.error).toBe('Failed to submit');
    });

    it('should handle submitAnswers pending', async () => {
        mockedAxios.post.mockReturnValue(
            new Promise(() => {
                /* Simulate a pending state */
            }) as any
        );

        const store = configureStore({
            reducer: summaryReducer,
        });

        store.dispatch(submitAnswers(answersMock) as any);

        const state = store.getState();
        expect(state.isSubmitting).toBe(true);
        expect(state.error).toBeNull();
    });
});
