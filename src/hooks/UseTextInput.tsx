import { ChangeEventHandler, useCallback, useState } from "react";

export interface TextInput {
    id?: string,
    name?: string,
    label?: string,
    helperText?: string,
    init?: string,
}

export interface TextInputProps {
    id?: string,
    name?: string,
    label?: string,
    value: string,
    onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined,
    helperText?: string,
}

export function useTextInput(options: TextInput = {}) {
    let {
        id = undefined,
        name = undefined,
        label = 'Text',
        helperText = undefined,
        init = '',
    } = options;

    if (name === undefined) {
        name = id;
    }

    const [value, setValue] = useState(init);
    const onChange = useCallback((event) => {
        setValue(event.target.value);
    }, []);

    return {
        id,
        name,
        label,
        value,
        onChange,
        helperText,
    }
}