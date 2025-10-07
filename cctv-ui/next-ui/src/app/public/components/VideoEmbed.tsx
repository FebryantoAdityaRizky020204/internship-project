import { TypeLocation } from "../type";

type VideoEmbedProps = {
  locationSelected: TypeLocation;
};

const VideoEmbed = ({ locationSelected }: VideoEmbedProps) => {
  return (
    <div className="h-60% w-full overflow-hidden rounded-lg md:h-[280px] md:w-full">
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
