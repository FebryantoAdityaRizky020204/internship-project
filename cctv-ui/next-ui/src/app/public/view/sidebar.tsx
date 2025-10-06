import CCTVCard from "../components/CCTVCard";
import VideoEmbed from "../components/VideoEmbed";
import { TypeLocation } from "../type";

type SelectedSidebarProps = {
  setVideoSelected: (value: boolean) => void;
  videoSelected: boolean;
  setLocationSelected: (value: TypeLocation | undefined) => void;
  locationSelected: TypeLocation | undefined;
  locationList: TypeLocation[];
};

const Sidebar = ({
  setVideoSelected,
  videoSelected,
  locationSelected,
  setLocationSelected,
  locationList,
}: SelectedSidebarProps) => {
  return (
    <>
      {videoSelected && locationSelected && (
        <div className="col-span-3 row-span-4">
          <div
            className={`static m-2 max-h-[calc(100%-20px)] min-h-[calc(100%-20px)] overflow-hidden rounded-sm border border-gray-300 bg-gray-50 p-2 dark:border-gray-800 dark:bg-white/[0.03]`}
          >
            <VideoEmbed locationSelected={locationSelected} />
            <div className="mt-2 flex flex-row justify-between rounded-sm p-3 font-bold">
              <h3>{locationSelected.name}</h3>
              <button
                type="button"
                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition"
                onClick={() => {
                  setVideoSelected(false);
                  setLocationSelected(undefined);
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={` ${videoSelected ? "col-span-3 row-span-2 row-start-5" : "col-span-3 col-start-1 row-span-6 row-start-1"} p-1 transition-all duration-300 ease-in-out`}
      >
        <div
          className={`m-0.5 max-h-[calc(100%-10px)] w-full overflow-auto rounded-sm border border-gray-300 p-2 dark:border-gray-800 dark:bg-white/[0.03]`}
        >
          {/* <CCTVLists setVideoSelected={setVideoSelected} /> */}
          <div className="max-h-screen p-4">
            <div className="flex flex-wrap gap-4 overflow-y-visible">
              {locationList.map((location) => (
                <CCTVCard
                  setVideoSelected={setVideoSelected}
                  location={location}
                  setLocationSelected={setLocationSelected}
                  key={location.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
