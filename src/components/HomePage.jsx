import { FaPlay } from "react-icons/fa";
import format from "../data/FormatTime";

function HomePage({
  tracks,
  currentTrackIndex,
  setCurrentTrackIndex,
  isPlaying,
  duration,
}) {
  const currentTrack = tracks[currentTrackIndex];

  return (
    <>
      {/* Playlist Header */}
      <div className="p-4 sm:p-8 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 text-center sm:text-left">
        <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center text-3xl sm:text-5xl font-bold">
          {currentTrack.title.substring(0, 3)}
        </div>
        <div className="flex flex-col">
          <h2 className="text-4xl sm:text-7xl font-bold tracking-tighter">
            Vibes
          </h2>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">
            A collection of awesome tracks to get you in the zone.
          </p>
        </div>
      </div>

      {/* Track List */}
      <div className="px-4 sm:px-8 py-4">
        {/* Header Row (hidden on mobile) */}
        <div className="hidden sm:grid grid-cols-12 gap-4 text-gray-400 border-b border-gray-800 pb-2 mb-2 text-sm">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">Title</div>
          <div className="col-span-4">Artist</div>
          <div className="col-span-2">Time</div>
        </div>

        {/* Tracks */}
        {tracks.map((track, index) => (
          <div
            key={index}
            onClick={() => setCurrentTrackIndex(index)}
            className={`grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-4 items-center p-2 rounded-lg cursor-pointer group hover:bg-white/10 ${
              index === currentTrackIndex ? "bg-white/20" : ""
            }`}
          >
            {/* Number / Play */}
            <div
              className={`col-span-1 text-center ${
                index === currentTrackIndex
                  ? "text-indigo-400"
                  : "text-gray-400"
              }`}
            >
              {index === currentTrackIndex && isPlaying ? (
                <FaPlay />
              ) : (
                index + 1
              )}
            </div>

            {/* Title */}
            <div className="col-span-3 sm:col-span-5 truncate">
              <strong
                className={`block text-sm sm:text-lg truncate ${
                  index === currentTrackIndex ? "text-indigo-400" : "text-white"
                }`}
              >
                {track.title}
              </strong>
            </div>

            {/* Artist */}
            <div className="col-span-2 sm:col-span-4 text-xs sm:text-base text-gray-300 group-hover:text-white truncate">
              {track.artist}
            </div>

            {/* Time (hidden on mobile) */}
            <div className="hidden sm:block col-span-2 text-gray-300 group-hover:text-white">
              {format(duration[index])}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
