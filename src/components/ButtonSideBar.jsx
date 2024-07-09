import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({ func, icon, ...props }) {
  return (
    <button
      onClick={func}
      className="p-2 aspect-square rounded border-black border"
      {...props}
    >
      <FontAwesomeIcon icon={icon} className="text-xl aspect-square" />
    </button>
  );
}
