import { useState } from "react";
import ViewMode from "../ViewMode";
import TotalEmployeesTable from "./TotalEmployeesTable";
import { dataView, userView } from "../../config/viewModes";

export default function Table() {
  const [currentViewLevel, setCurrentViewLevel] = useState(userView.ME);

  const handleViewLevelChange = (viewLevel: string) => {
    setCurrentViewLevel(viewLevel);
  };

  return (
    <div className="container mx-auto">
      <ViewMode
        currentViewLevel={currentViewLevel}
        onViewLevelChange={handleViewLevelChange}
      />

      <TotalEmployeesTable
        dataView={dataView.TABLE}
        userView={currentViewLevel}
      />
    </div>
  );
}
