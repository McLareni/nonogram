import { faGear, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "./ButtonSideBar";
import { fetchUserPlaces } from "../scripts/http";
import { useEffect, useState } from "react";

export default function SideBar({
  openSetting,
  isOpen,
  openList,
  closeList,
  onChange,
}) {
  const [list, setList] = useState([]);
  let cssClassesSideBar =
    "absolute left-[10px] top-1/3 flex flex-col gap-3 p-4 rounded border-black border shadow-black shadow-sm bg-stone-100";
  let cssClassesList =
    "absolute left-full top-1/3 flex flex-col gap-3 p-4 rounded border-black border shadow-black shadow-sm bg-stone-100";

  if (!isOpen) {
    cssClassesSideBar += " barClose";
    cssClassesList += " barOpen";
  }
  else{
    cssClassesSideBar += " barOpen"
  }

  async function getDate() {
    try {
      const data = await fetchUserPlaces();
      setList(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getDate();
  }, []);

  return (
    <div>
      <div className={cssClassesSideBar}>
        <Button func={openList} icon={faBars} />
        <Button func={openSetting} icon={faGear} />
      </div>
      <div className={cssClassesList}>
        <Button
          func={closeList}
          icon={faXmark}
          className="absolute top-2 right-2"
        />
        <ul className="mr-5">
          {list.map((level) => (
            <button
              key={level.id}
              className="flex"
              onClick={() => onChange(level.id)}
            >
              <h3>{level.name}</h3>
              <p className="font-semibold mx-2">{`(#${level.id})`}</p>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}
