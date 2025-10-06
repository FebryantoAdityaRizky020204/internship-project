import { Play } from "@/icons";
import { TypeLocation } from "../type";

type CCTVListsProps = {
  setVideoSelected: (value: boolean) => void;
  location: TypeLocation;
  setLocationSelected: (value: TypeLocation) => void;
};

const CCTVCard = ({
  setVideoSelected,
  location,
  setLocationSelected,
}: CCTVListsProps) => {
  return (
    <div
      onClick={() => {
        setVideoSelected(true);
        setLocationSelected(location);
      }}
      className="flex w-fit max-w-[400px] flex-row items-center justify-between rounded-2xl border border-gray-300 bg-gray-50 p-3 align-middle shadow-gray-500 hover:cursor-pointer dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div className="flex h-[50px] max-h-[50px] min-h-[50px] min-w-[50px] items-center justify-center rounded-xl bg-gray-300 py-3 dark:bg-gray-700">
        <Play />
      </div>
      <h5 className="truncate px-4 font-bold text-gray-800 dark:text-white/90">
        {location.name}
      </h5>
    </div>
  );
};

export default CCTVCard;
