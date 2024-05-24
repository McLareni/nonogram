import { useEffect, useState } from "react";

import { timeFormatter } from "../../scripts/formatter/timeFormatter.js";

let timer;

export default function Timer({ ...props }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    timer = setInterval(() => {
      setTime((prev) => prev + 1);
      
    }, 1000);
  }, []);

  let formattedTime = timeFormatter(time);

  return <p {...props}>{formattedTime}</p>;
}
