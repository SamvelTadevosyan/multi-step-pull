import styled from '@emotion/styled';

const CarouselContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  position: relative;
`;

const SliderContainer = styled('div' )<{
  $currentStep: number;
  $length: number;
}>`
  width: 100%;
  flex-direction: column;
  transition: transform 0.3s;
  transform: ${(props) => `translateY(-${props.$currentStep * 100}%)`};
`;

const LeftContainer = styled.div`
  background-color: #6b55fe;
  padding-left: 150px;
  padding-right: 400px;
  width: 50%;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  gap: 10%;
`;

const CarouselItem = styled.div`
  display: flex;
  height:100vh;
  width:100vw;
`;

const ProgressContainer = styled('div' )<{
  $offset: number;
}>`
  display: flex;
  position: absolute;
  z-index: 2;
  flex-direction: column;
  top: ${({ $offset }) => `calc(50% - ${$offset * 25}px)`};
  left: 35px;
  gap: 10px;
`;

const ProgressDot = styled('span' )<{
  $isActive: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: ${(props) => props.$isActive ? 'transparent' : 'white'};
  border: 2px solid white;
`;

export default {
  CarouselContainer,
  SliderContainer,
  CarouselItem,
  ProgressContainer,
  ProgressDot,
  RightContainer,
  LeftContainer
};
