import { ChangeEventHandler, useCallback, useState } from "react";

export interface CheckedInput {
    id?: string,
    name?: string,
    init?: boolean,
}

export interface CheckedInputProps {
    id?: string,
    name?: string,
    checked: boolean,
    onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined,
}

export function useCheckedInput(options: CheckedInput = {}): CheckedInputProps {
    let {
        id = undefined,
        name = undefined,
        init = false,
    } = options;

    if (name === undefined) {
        name = id;
    }

    const [checked, setChecked] = useState(init);
    const onChange = useCallback((event) => {
        // Note that this is returning 'checked':
        setChecked(event.target.checked);
    }, []);

    return {
        id,
        name,
        checked,
        onChange,
    }
}