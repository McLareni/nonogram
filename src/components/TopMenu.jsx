import { timeFormatter } from '../scripts/formatter/timeFormatter';

export default function TopMenu({time}) {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-200 border border-black border-t-0 rounded-b-md px-10 py-2 min-w-40 text-center z-50">
     <p className="text-black font-bold">{timeFormatter(time)}</p>
    </div>
  );
}
