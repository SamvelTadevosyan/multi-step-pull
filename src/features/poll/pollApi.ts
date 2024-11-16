import axios from 'axios';

export const submitAnswers = async (answers: any) => {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', answers);
        console.log('Response submitted successfully:', response.data);
    } catch (error) {
        console.error('Error submitting response:', error);
    }
};