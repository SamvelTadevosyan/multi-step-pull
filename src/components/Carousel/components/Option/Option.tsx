import React from "react";
import { Typography, Button, Tooltip } from '@mui/material';
import { GenericCallback, OptionType } from "../../../../types";

type OptionProps = {
    option: OptionType;
    isSelected: boolean;
    onOptionSelect: GenericCallback
}

export default function Option({ option, onOptionSelect }: OptionProps): JSX.Element {
    return (
    <Tooltip
        title={
            <Typography variant="body2" component="p">
                {option.label}
            </Typography>
        }
        placement="top"
    >
        <Button onClick={() => onOptionSelect(option)}>
            <Typography variant="h1" component="p">
                {option.icon}
            </Typography>
        </Button>
    </Tooltip>
)}