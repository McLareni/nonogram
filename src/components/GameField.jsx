import DUMMY_APPLE from "../scripts/DUMMY_APPLE.js";
import {
  GetRowsTabsHorizontal,
  GetRowsTabsVertical,
} from "../scripts/GetRowsTabs.js";

import Table from "../components/Table.jsx";
import InfoField from "../components/InfoField.jsx";

const infoLineVertical = GetRowsTabsVertical(DUMMY_APPLE.grid).tabList;
const infoLineHorizontal = GetRowsTabsHorizontal(DUMMY_APPLE.grid).tabList;

export default function GameField({emptyRow, emptyCol}) {
  return (
      <div>
        <section id="table" className="">
          <table className="border-2 border-black border-separate border-spacing-0">
            <tbody className="w-full h-full">
              <tr className="h-1/3">
                <td className="max-w-fit max-h-fit">
                  <Table scale={10} info={true} />
                </td>
                <td className="flex items-end w-full h-full">
                  <InfoField direction="vertical" infoTabs={infoLineVertical} />
                </td>
                <td className=""></td>
              </tr>
              <tr className="h-1/3">
                <td className="flex justify-end h-full w-full">
                  <InfoField
                    direction="horizontal"
                    infoTabs={infoLineHorizontal}
                  />
                </td>
                <td className="">
                  <Table emptyCol={emptyCol} emptyRow={emptyRow} />
                </td>
                <td></td>
              </tr>
              <tr className="h-1/3">
                <td></td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
  );
}
