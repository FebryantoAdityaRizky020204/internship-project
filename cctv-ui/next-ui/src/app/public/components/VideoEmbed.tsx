import { TypeLocation } from "../type";

type VideoEmbedProps = {
  locationSelected: TypeLocation;
};

const VideoEmbed = ({ locationSelected }: VideoEmbedProps) => {
  return (
    <div className="h-[280px] w-auto overflow-hidden rounded-lg">
      <iframe
        src={locationSelected.link}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      ></iframe>
    </div>
  );
};

export default VideoEmbed;
