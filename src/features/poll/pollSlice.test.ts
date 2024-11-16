import pollReducer, {
    setAnswer,
    nextStep,
    resetPoll,
    completePoll,
    fetchPollSteps,
} from './pollSlice';
import { PollState } from './pollSlice';
import { OptionType, Step } from '../../types';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { localSteps } from '../../constants';

jest.mock('axios'); // Mock axios
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('pollSlice', () => {
    const initialState: PollState = {
        steps: [],
        currentStep: 0,
        answers: [],
        completed: false,
        loading: false,
        error: null,
    };

    it('should return the initial state', () => {
        expect(pollReducer(undefined, { type: undefined })).toEqual(initialState);
    });

    it('should handle setAnswer', () => {
        const answer: OptionType = { label: 'Like', icon: '👍' };
        const action = setAnswer({ step: 0, answer });

        const result = pollReducer(initialState, action);

        expect(result.answers[0]).toEqual(answer);
    });

    it('should handle nextStep', () => {
        const result = pollReducer(initialState, nextStep());
        expect(result.currentStep).toBe(1);
    });

    it('should handle resetPoll', () => {
        const modifiedState: PollState = {
            ...initialState,
            currentStep: 3,
            answers: [{ label: 'Like', icon: '👍' }],
            completed: true,
        };

        const result = pollReducer(modifiedState, resetPoll());
        expect(result).toEqual(initialState);
    });

    it('should handle completePoll', () => {
        const result = pollReducer(initialState, completePoll());
        expect(result.completed).toBe(true);
    });
});

describe('fetchPollSteps thunk', () => {
    const stepsMock: Step[] = [
        {
            id: 1,
            title: 'Step 1',
            options: [
                { label: 'Like', icon: '👍' },
                { label: 'Dislike', icon: '👎' },
            ],
        },
    ];

    it('should handle successful fetchPollSteps', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: stepsMock });

        const store = configureStore({
            reducer: pollReducer,
        });

        await store.dispatch(fetchPollSteps() as any);

        const state = store.getState();

        expect(state.steps).toEqual(stepsMock);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });

    it('should handle rejected fetchPollSteps', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

        const store = configureStore({
            reducer: pollReducer,
        });

        await store.dispatch(fetchPollSteps() as any);

        const state = store.getState();
        expect(state.steps).toEqual(localSteps); // fallback to localSteps
        expect(state.loading).toBe(false);
        expect(state.error).toBe("Failed to fetch");
    });

    it('should handle fetchPollSteps pending', async () => {
        mockedAxios.get.mockReturnValue(
            new Promise(() => {
                /* Simulate a pending state */
            }) as any
        );

        const store = configureStore({
            reducer: pollReducer,
        });

        store.dispatch(fetchPollSteps() as any);

        const state = store.getState();
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });
});