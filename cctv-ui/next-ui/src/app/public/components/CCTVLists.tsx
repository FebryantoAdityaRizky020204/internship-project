// "use server";

import CCTVCard from "./CCTVCard";

type CCTVListsProps = {
  setVideoSelected: (value: boolean) => void;
};

const CCTVLists = ({ setVideoSelected }: CCTVListsProps) => {
  return (
    <>
      <div className="max-h-screen p-4">
        <div className="flex flex-wrap gap-4 overflow-y-visible pb-6">
          <CCTVCard setVideoSelected={setVideoSelected} />
          <CCTVCard setVideoSelected={setVideoSelected} />
          <CCTVCard setVideoSelected={setVideoSelected} />
          <CCTVCard setVideoSelected={setVideoSelected} />
          <CCTVCard setVideoSelected={setVideoSelected} />
          <CCTVCard setVideoSelected={setVideoSelected} />
          <CCTVCard setVideoSelected={setVideoSelected} />
          <CCTVCard setVideoSelected={setVideoSelected} />
          <CCTVCard setVideoSelected={setVideoSelected} />
        </div>
      </div>
    </>
  );
};

export default CCTVLists;
