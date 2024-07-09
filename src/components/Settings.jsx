import { memo } from "react";

export default memo(function Settings({ onChange, onSelect }) {
  return (
    <div className="py-3 px-5">
      <p>
        <input
          type="checkbox"
          onChange={(e) => onChange(e, "horizontal")}
          className="mr-2"
        />
        <label>Additional horizontal information field</label>
      </p>
      <p>
        <input
          type="checkbox"
          onChange={(e) => onChange(e, "vertical")}
          className="mr-2"
        />
        <label>Additional vertical information field</label>
      </p>
      <p>
        <select onChange={(e) => onSelect(e)}>
          <option>10</option>
          <option>14</option>
          <option>18</option>
        </select>
        <label>Select a cell size</label>
      </p>
    </div>
  );
});
