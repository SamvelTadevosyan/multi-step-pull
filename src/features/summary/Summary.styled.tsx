import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

const revealLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const SummarySlide = styled(Box)`
  background-color: #6b55fe;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 40px;
  padding: 20px;
  animation: ${revealLeft} 0.5s ease-out;
`;

const AnswersContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-height: 50%;
  overflow-y: scroll;
  gap: 20px;
`;

const Answers = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: white;
  margin-top: 10px;
  gap: 25px;
`;

const SubmitButton = styled(Button)`
  width: 130px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;


export default {
  SummarySlide,
  Answers,
  AnswersContainer,
  ButtonContainer,
  SubmitButton
};
