import { useContext } from "react";

import Table from "./Table.jsx";
import { timeFormatter } from "../scripts/formatter/timeFormatter.js";
import { GridContext } from "../store/Grid-context.jsx";

export default function FinishCrossfood({ time }) {
  const { name } = useContext(GridContext);

  return (
    <div className="flex flex-col items-center py-5 px-8">
      <h1 className="text-2xl">{name}</h1>
      <p className="text-stone-600">Complete</p>
      <p className=" mb-6">{timeFormatter(time)}</p>
      <Table info={true} />
    </div>
  );
}
