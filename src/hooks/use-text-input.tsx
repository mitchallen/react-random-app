import { useCallback, useState } from "react";

export interface TextInput {
    id?: string,
    name?: string,
    label?: string,
    helperText?: string,
    init?: string,
}

export function useTextInput(options: TextInput = {}) {
    let {
        id = undefined,
        name = undefined,
        label = 'Text',
        helperText = 'Enter text',
        init = '',
    } = options;

    if (name === undefined) {
        name = id;
    }

    const [value, setValue] = useState(init);
    const handleValueChange = useCallback((event) => {
        setValue(event.target.value);
    }, []);

    return {
        id,
        name,
        label,
        value,
        onChange: handleValueChange,
        helperText,
    }
}
