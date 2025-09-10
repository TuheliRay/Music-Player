import { useState } from "react";

function SearchPage({ tracks, setCurrentTrackIndex }) {
  const [query, setQuery] = useState("");

  // Filter tracks based on query
  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-center sm:text-left">
        Search
      </h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for songs or artists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
      />

      {/* Results */}
      <div className="mt-6 space-y-2">
        {filteredTracks.length > 0 ? (
          filteredTracks.map((track, index) => (
            <div
              key={index}
              onClick={() => setCurrentTrackIndex(tracks.indexOf(track))}
              className="p-2 sm:p-3 rounded-lg bg-gray-900 hover:bg-gray-700 cursor-pointer flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0"
            >
              <span className="text-white text-sm sm:text-base truncate">
                {track.title}
              </span>
              <span className="text-gray-400 text-xs sm:text-sm truncate">
                {track.artist}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4 text-center sm:text-left">
            No results found.
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
