import { updateCurrentGrid } from "./http";

async function updataDate(grid) {
  try {
    await updateCurrentGrid({
      id: grid.id,
      grid: [...grid.grid.map((row) => [...row])],
    });
  } catch (error) {
    console.log(error.message);
  }
}

export { updataDate };
