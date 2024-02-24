import Barcode from "react-barcode";

import { useContestantsContext } from "../context/ContestantsContext";
import "../print.css";

export function Contestants() {
  const { contestants } = useContestantsContext();

  return (
    <div className="flex flex-col mx-auto w-2/3 print-container">
      <div className="grid grid-cols-3 mb-4 mt-4 header-row-print">
        <div className="flex items-center justify-center text-lg text-gray-400 font-bold">
          Name
        </div>
        <div className="flex items-center justify-center text-lg text-gray-400 font-bold">
          Barcode
        </div>
        <div className="flex items-center justify-center text-lg text-gray-400 font-bold">
          Barcode
        </div>
      </div>

      {contestants.map((contestant, index) => {
        return (
          <div
            key={contestant.place}
            className={`grid grid-cols-3  row-print ${
              index % 8 === 0 ? "page-break" : ""
            }`}
          >
            <div className="flex items-center justify-center text-lg text-gray-400 font-bold col-print">
              {contestant.name}
            </div>
            <div className="flex items-center justify-center col-print">
              <Barcode
                value={contestant.barcode}
                displayValue={false}
                width={2.5}
                height={130}
                fontSize={60}
              />
            </div>
            <div className="flex items-center justify-center col-print">
              <Barcode
                value={contestant.barcode}
                displayValue={false}
                width={2.5}
                height={125}
                fontSize={60}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
