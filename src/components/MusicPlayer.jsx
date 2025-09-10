import tracks from "../data/Tracks";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import Sidebar from "./Sidebar";
import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
} from "react-icons/fa";

function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDurations] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [activePage, setActivePage] = useState("home");
  const audioRef = useRef(null);

  const currentTrack = tracks[currentTrackIndex];

  // Play/Pause toggle
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Progress bar update
  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [audioRef.current]);

  // Next/Prev
  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? tracks.length - 1 : prev - 1
    );
  };

  // Auto play on track change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.error("Autoplay was prevented: ", e);
          setIsPlaying(false);
        });
    }
  }, [currentTrackIndex]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Update duration when track changes
  useEffect(() => {
    tracks.forEach((track, index) => {
      const audio = new Audio(track.src);
      audio.addEventListener("loadedmetadata", () => {
        setDurations((prev) => ({
          ...prev,
          [index]: audio.duration,
        }));
      });
    });
  }, []);

  return (
    <div className="h-screen bg-[#0d1117] text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR (LEFT) */}
        <div className="hidden md:block bg-black">
        <Sidebar setActivePage={setActivePage} />
        </div>

        {/* MAIN CONTENT (PLAYLIST) */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-indigo-900 via-[#121212] to-[#121212] p-4 sm:p-6">
          {activePage === "home" && (
            <HomePage
              tracks={tracks}
              currentTrackIndex={currentTrackIndex}
              setCurrentTrackIndex={setCurrentTrackIndex}
              isPlaying={isPlaying}
              duration={duration}
            />
          )}

          {activePage === "search" && <SearchPage tracks={tracks} setCurrentTrackIndex={setCurrentTrackIndex} />}
        </main>
      </div>

      {/* BOTTOM PLAYER (FULL WIDTH) */}
      <div className="bg-[#181818] p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-t border-gray-800 flex-shrink-0">
        {/* Now Playing Info */}
        <div className="flex items-center gap-4 w-full sm:w-1/4 justify-center sm:justify-start">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-xs font-bold">
            {currentTrack.title.substring(0, 3)}
          </div>
          <div>
            <p className="font-semibold">{currentTrack.title}</p>
            <p className="text-sm text-gray-400">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Controls & Progress Bar */}
        <div className="flex flex-col items-center w-full sm:w-1/2">
          <div className="flex items-center gap-6 mb-2">
            <button
              onClick={playPrev}
              className="text-gray-400 hover:text-white"
            >
              <FaStepBackward size={20} />
            </button>

            <button onClick={togglePlay} className="bg-white text-black p-3 rounded-full hover:scale-105 transition-transform">
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>

            <button onClick={playNext}  className="text-gray-400 hover:text-white">
              <FaStepForward size={20} />
            </button>
          </div>

          <div className="w-full bg-gray-700 h-1 rounded-full group">
            <div className="bg-white group-hover:bg-indigo-400 h-1 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 w-full sm:w-1/4 justify-center sm:justify-end">
          <FaVolumeUp className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-32 h-1 accent-white hover:accent-indigo-400"
          />
        </div>

        {/* Hidden Audio */}
        <audio ref={audioRef} onEnded={playNext}>
          <source src={currentTrack.src} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}

export default MusicPlayer;
