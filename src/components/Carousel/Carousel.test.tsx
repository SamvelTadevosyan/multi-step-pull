import { render, screen, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';
import { OptionProps } from "./components/Option";
import { Step } from "../../types";
import '@testing-library/jest-dom';

// Mock components
jest.mock('./components/Option', () => ({ option, onOptionSelect }: OptionProps) => (
    <button onClick={onOptionSelect}>{option.icon}</button>
));
jest.mock('./components/Question', () => ({ title }: { title: string }) => <div>{title}</div>);

describe('Carousel component', () => {
    const steps: Step[] = [
        { id: 1, title: 'Step 1', options: [{ icon: "👍", label: 'Option 1' }] },
        { id: 2, title: 'Step 2', options: [{ icon: "😊", label: 'Option 2' }] },
    ];

    const mockOnSelectOption = jest.fn();
    const answers = [{ icon: "👍", label: 'Option 1' }, { icon: "😊", label: 'Option 2' }, { id: 'opt2' }];

    it('should render the carousel correctly', () => {
        render(<Carousel steps={steps} answers={answers} onSelectOption={mockOnSelectOption} />);

        expect(screen.getByText('Step 1')).toBeInTheDocument();
        expect(screen.getByText('Step 2')).toBeInTheDocument();

        expect(screen.getByText(steps[0].options[0].icon)).toBeInTheDocument();
    });

    it('should navigate to next step when an option is selected', () => {
        render(<Carousel steps={steps} answers={answers} onSelectOption={mockOnSelectOption} />);

        expect(screen.getByText('Step 1')).toBeInTheDocument();

        fireEvent.click(screen.getByText(steps[0].options[0].icon));

        expect(screen.getByText('Step 2')).toBeInTheDocument();
        expect(mockOnSelectOption).toHaveBeenCalledTimes(1);
    });

    it('should highlight the active progress dot', () => {
        render(<Carousel steps={steps} answers={answers} onSelectOption={mockOnSelectOption} />);

        const progressDots = screen.getAllByRole('progressDots');
        expect(progressDots[0]).toHaveStyle('background-color: transparent');
        expect(progressDots[1]).toHaveStyle('background-color: white');

        fireEvent.click(screen.getByText(steps[0].options[0].icon));

        expect(progressDots[0]).toHaveStyle('background-color: white');
        expect(progressDots[1]).toHaveStyle('background-color: transparent');
    });

    it('should not go beyond the last step', () => {
        const extendedSteps: Step[] = [
            { id: 1, title: 'Step 1', options: [{ icon: "👍", label: 'Option 1' }] },
            { id: 2, title: 'Step 2', options: [{ icon: "😊", label: 'Option 2' }] },
            { id: 3, title: 'Step 3', options: [{ icon: "👎", label: 'Option 3' }] },
        ];

        render(<Carousel steps={extendedSteps} answers={answers} onSelectOption={mockOnSelectOption} />);

        fireEvent.click(screen.getByText(extendedSteps[0].options[0].icon)); // Move to Step 2
        fireEvent.click(screen.getByText(extendedSteps[1].options[0].icon)); // Move to Step 3

        expect(screen.getByText('Step 3')).toBeInTheDocument();
    });
});

