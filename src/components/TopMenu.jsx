import { timeFormatter } from '../scripts/formatter/timeFormatter';

export default function TopMenu({time}) {
  return (
    <div className="absolute top-0 left-1/2 bg-white -translate-x-1/2 border-black rounded-b-md shadow-sm shadow-black px-10 py-2 min-w-40 text-center z-50">
     <p className="text-black font-bold">{timeFormatter(time)}</p>
    </div>
  );
}
