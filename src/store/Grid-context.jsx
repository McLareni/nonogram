import { createContext } from "react";

export const GridContext = createContext({
    name: "",
    width: 0,
    heigth: 0,
    grid: [],
    changeColor: () => {},
    closeLine: () => {},
    infoLineVertical: [],
    infoLineHorizontal: [],
    statusLineVertical: [],
    statusLineHorizontal: [],
});