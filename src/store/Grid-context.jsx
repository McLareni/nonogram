import { createContext } from "react";

export const GridContext = createContext({
    name: "",
    grid: [],
    changeColor: () => {},
    closeLine: () => {},
    infoLineVertical: [],
    infoLineHorizontal: [],
    statusLineVertical: [],
    statusLineHorizontal: [],
});