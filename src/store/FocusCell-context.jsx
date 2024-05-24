import { createContext } from "react";

export const FocusCellContext = createContext({
    selectedRow: undefined,
    selectedCol: undefined,
    setFocusCell: () => {},
});