import { userView } from "../../config/viewModes";

interface ViewModeProps {
  currentViewLevel: string;
  onViewLevelChange: (viewType: string) => void;
}

const ViewMode = ({
  currentViewLevel = userView.ME,
  onViewLevelChange,
}: ViewModeProps) => {
  return (
    <div className="flex space-x-4">
      <button
        className={`px-4 py-2 border ${
          currentViewLevel === userView.ME
            ? "bg-blue-600 text-white"
            : "bg-white border-gray-300"
        }`}
        onClick={() => onViewLevelChange(userView.ME)}
      >
        My View
      </button>
      <button
        className={`px-4 py-2 border ${
          currentViewLevel === userView.ADMIN
            ? "bg-blue-600 text-white"
            : "bg-white border-gray-300"
        }`}
        onClick={() => onViewLevelChange(userView.ADMIN)}
      >
        Admin View
      </button>
      <button
        className={`px-4 py-2 border ${
          currentViewLevel === userView.COMPANY
            ? "bg-blue-600 text-white"
            : "bg-white border-gray-300"
        }`}
        onClick={() => onViewLevelChange(userView.COMPANY)}
      >
        Company View
      </button>
    </div>
  );
};

export default ViewMode;
