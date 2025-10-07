import { Play } from "@/icons";
import { TypeLocation } from "../type";

type CCTVListsProps = {
  setVideoSelected: (value: boolean) => void;
  location: TypeLocation;
  setLocationSelected: (value: TypeLocation) => void;
  locationSelected: TypeLocation | undefined;
};

const CCTVCard = ({
  setVideoSelected,
  location,
  setLocationSelected,
  locationSelected,
}: CCTVListsProps) => {
  return (
    <div
      onClick={() => {
        setVideoSelected(true);
        setLocationSelected(location);
      }}
      className={`flex w-fit max-w-[400px] flex-row items-center justify-between rounded-2xl border ${locationSelected?.id === location.id ? "border-blue-300 dark:border-blue-300" : "border-gray-300 shadow-gray-500 dark:border-gray-800"} bg-gray-50 p-3 align-middle shadow-gray-500 hover:cursor-pointer dark:bg-white/[0.03]`}
    >
      {/* <div className="flex h-[50px] max-h-[50px] min-h-[50px] min-w-[50px] items-center justify-center rounded-xl  py-3"> */}
      <div
        className={`flex h-[50px] max-h-[50px] min-h-[50px] min-w-[50px] items-center justify-center rounded-xl ${locationSelected?.id === location.id ? "bg-blue-300 text-white" : "bg-gray-300 dark:bg-gray-700"} py-3`}
      >
        <Play />
      </div>
      <h5
        className={`truncate px-4 font-bold ${locationSelected?.id === location.id ? "text-blue-300" : "text-gray-800 dark:text-white/90"} `}
      >
        {/* <h5 className="truncate px-4 font-bold"> */}
        {location.name}
      </h5>
    </div>
  );
};

export default CCTVCard;
