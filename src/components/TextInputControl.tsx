import { FormControl, TextField } from "@mui/material";
import React from "react";
import {TextInputProps} from '../hooks/UseTextInput';

export interface TextInputControlProps {
    textInput: TextInputProps,
    style: any,
}

export const TextInputControl = (
    props: TextInputControlProps,
) => (

    <FormControl style={props.style || {width: '40%'}} >
        <TextField
            {...props.textInput}
        />
    </FormControl>

);