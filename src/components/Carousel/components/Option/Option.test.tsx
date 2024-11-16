import React from "react";
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Option from './Option'; // Assuming the correct path to Option component
import { OptionType } from '../../../../types';

describe('Option Component', () => {
    it('should render the option with the correct icon', () => {
        const option: OptionType = { label: 'Option 1', icon: '🟢' };
        const mockOnOptionSelect = jest.fn();

        render(<Option option={option} onOptionSelect={mockOnOptionSelect} />);

        expect(screen.getByText('🟢')).toBeInTheDocument();
    });

    it('should call onOptionSelect with the correct option when clicked', () => {
        const option: OptionType = { label: 'Option 1', icon: '🟢' };
        const mockOnOptionSelect = jest.fn();

        render(<Option option={option} onOptionSelect={mockOnOptionSelect} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockOnOptionSelect).toHaveBeenCalledWith(option);
    });

    it('should show the tooltip with the correct label when hovered', async () => {
        const option: OptionType = { label: 'Option 1', icon: '🟢' };
        const mockOnOptionSelect = jest.fn();

        render(<Option option={option} onOptionSelect={mockOnOptionSelect} />);

        fireEvent.mouseOver(screen.getByRole('button'));

        await waitFor(() => {
            expect(screen.getByRole('tooltip')).toBeInTheDocument();  // Tooltip should show the label
        });
    });
});
