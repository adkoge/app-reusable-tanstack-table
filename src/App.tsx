import { useState } from "react";
import BaseTable from "./components/BaseTable";
import TotalEmployeesTable from "./components/TotalEmployeesTable";

export default function App() {
  const [version, setVersion] = useState("v1");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setVersion("v1")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Version 1
        </button>
        <button
          onClick={() => setVersion("v2")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Version 2
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        {version === "v1" && <BaseTable />}
        {version === "v2" && <TotalEmployeesTable />}
      </div>
    </div>
  );
}
