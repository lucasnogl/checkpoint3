import React, { useState, useRef, useEffect, useMemo } from "react";
import "./styles.css";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Search,
  Volume2,
  Plus,
  Music,
  Shuffle,
  Repeat2,
  X,
} from "lucide-react";

const musicasIniciais = [
  {
    id: 1,
    titulo: "Midnight City",
    artista: "M83",
    capa: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=150&h=150&fit=crop",
    duracao: 255,
  },
  {
    id: 2,
    titulo: "Starlight",
    artista: "Muse",
    capa: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=150&h=150&fit=crop",
    duracao: 300,
  },
  {
    id: 3,
    titulo: "Neon Lights",
    artista: "Demi Lovato",
    capa: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=150&fit=crop",
    duracao: 200,
  },
  {
    id: 4,
    titulo: "Baby",
    artista: "Justin Bieber",
    capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmjpx4eckEOElkFYLEm6B0awh4JtZ1nY_l-w&s",

    duracao: 200,
  },
  {
    id: 5,
    titulo: "Amar Amei",
    artista: "Mc Don Juan",
    capa: "https://i.scdn.co/image/ab67616d0000b273a6b2fea7cd30d11cd74407ed",

    duracao: 200,
  },
  {
    id: 6,
    titulo: "Pray For Me",
    artista: "The Weeknd",
    capa: "https://musicainstantanea.com.br/wp-content/uploads/2018/02/b0ef6cfffeb8c493ca2344f8358e741a.960x960x1-700x700.jpg",
    duracao: 200,
  },
  {
    id: 7,
    titulo: "Paparazzi",
    artista: "Lady Gaga",
    capa: "https://i.scdn.co/image/ab67616d0000b273e691217483df8798445c82e2",

    duracao: 200,
  },
  {
    id: 8,
    titulo: "Mad",
    artista: "Ne-Yo",
    capa: "https://upload.wikimedia.org/wikipedia/pt/d/d3/Ne_-_Yo_-_Year_of_the_Gentleman.jpg",

    duracao: 200,
  },
  {
    id: 9,
    titulo: "With You",
    artista: "Chris Brown",
    capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCYTRsPfYEqAYWpjeD5TQ4P3VRXMlANs51uQ&s",

    duracao: 200,
  },
  {
    id: 10,
    titulo: "Resenha Lá Em Casa",
    artista: "MC Kevin O Chris, POCAH",
    capa: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/da/78/11/da7811d6-1b4c-8e4b-59dd-b69e2e1ae32b/190296867729.jpg/1200x630bb.jpg",
    duracao: 200,
  },
  {
    id: 11,
    titulo: "Deixa Acontecer",
    artista: "Grupo Revelação",
    capa: "https://i1.sndcdn.com/artworks-000075692683-ypkw0f-t500x500.jpg",
    duracao: 200,
  },
  {
    id: 12,
    titulo: "Me Apaixonei Pela Pessoa Errada",
    artista: "Exaltasamba",
    capa: "https://i.scdn.co/image/ab67616d0000b2738cec0aa6e29f88c2ef88f0ba",
    duracao: 200,
  },
];

const Sidebar = ({
  playlists,
  onAddPlaylist,
  activePlaylist,
  setActivePlaylist,
}) => {
  const [inputVal, setInputVal] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onAddPlaylist(inputVal.trim());
      setInputVal("");
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <Music size={28} style={{ marginRight: 10 }} /> Brasify
      </div>
      <div className="playlist-box">
        <h3>Playlists</h3>
        {/* BOTÃO DE INÍCIO / TODAS AS MÚSICAS */}
        <button
          className={`playlist-link ${
            activePlaylist === "library" ? "active" : ""
          }`}
          onClick={() => setActivePlaylist("library")}
          style={{ marginBottom: "10px", fontSize: "15px", fontWeight: "bold" }}
        >
          🏠 Início
        </button>
        {/* FIM DO BOTÃO DE INÍCIO */}
        <form onSubmit={handleSubmit} className="form-playlist">
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Nova playlist..."
          />
          <button type="submit">
            <Plus size={16} />
          </button>
        </form>
        <ul>
          {playlists.map((p) => (
            <li
              key={p.id}
              className={`playlist-link ${
                activePlaylist === p.id ? "active" : ""
              }`}
              onClick={() => setActivePlaylist(p.id)}
            >
              {p.nome}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Header = ({ onSearch, openModal }) => (
  <div className="header">
    <div className="search-wrapper">
      <Search size={20} color="#000" />
      <input
        type="text"
        placeholder="O que você quer ouvir?"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  </div>
);

const ListaMusicas = ({
  musicas,
  onPlay,
  favoritos,
  toggleFav,
  currentSongId,
}) => (
  <div className="grid-musicas">
    {musicas.map((m) => (
      <div
        key={m.id}
        className={`card ${currentSongId === m.id ? "playing-card" : ""}`}
        onClick={() => onPlay(m)}
      >
        <img src={m.capa} alt={m.titulo} />
        <div className="card-info">
          <strong>{m.titulo}</strong>
          <span>{m.artista}</span>
        </div>
        <button
          className={`fav-btn ${favoritos.includes(m.id) ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFav(m.id);
          }}
        >
          <Heart
            size={20}
            fill={favoritos.includes(m.id) ? "currentColor" : "none"}
          />
        </button>
      </div>
    ))}
    {musicas.length === 0 && (
      <p style={{ color: "#b3b3b3" }}>Nenhuma música encontrada.</p>
    )}
  </div>
);

const Player = ({
  current,
  isPlaying,
  onTogglePlay,
  progress,
  duration,
  onSeek,
  volume,
  setVolume,
  onNext,
  onPrev,
  isShuffling,
  toggleShuffle,
  isRepeating,
  toggleRepeat,
}) => {
  const formatTime = (t) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="footer-player">
      <div className="footer-left">
        {current && (
          <>
            <img src={current.capa} alt="" />
            <div>
              <div className="f-title">{current.titulo}</div>
              <div className="f-artist">{current.artista}</div>
            </div>
          </>
        )}
      </div>

      <div className="footer-center">
        <div className="controls">
          <button
            className={`icon-btn ${isShuffling ? "active" : ""}`}
            onClick={toggleShuffle}
          >
            <Shuffle size={20} />
          </button>
          <button className="icon-btn" onClick={onPrev} disabled={!current}>
            <SkipBack size={20} />
          </button>

          <button
            className="play-btn"
            onClick={onTogglePlay}
            disabled={!current}
          >
            {isPlaying ? (
              <Pause size={20} />
            ) : (
              <Play size={20} style={{ marginLeft: 2 }} />
            )}
          </button>

          <button className="icon-btn" onClick={onNext} disabled={!current}>
            <SkipForward size={20} />
          </button>
          <button
            className={`icon-btn ${isRepeating ? "active" : ""}`}
            onClick={toggleRepeat}
          >
            <Repeat2 size={20} />
          </button>
        </div>

        <div className="progress-bar-container">
          <small>{formatTime(progress)}</small>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={(e) => onSeek(Number(e.target.value))}
            disabled={!current}
            className="progress-slider"
          />
          <small>{formatTime(duration)}</small>
        </div>
      </div>

      <div className="footer-right">
        <Volume2 size={18} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

const AddSongModal = ({ isVisible, closeModal, onAddSong }) => {
  const [form, setForm] = useState({
    id: Date.now(),
    titulo: "",
    artista: "",
    url: "",
    capa: "",
  });
};

export default function SpotifyClone() {
  const [musicas, setMusicas] = useState(musicasIniciais);
  const [playlists, setPlaylists] = useState([
    { id: "fav", nome: "❤️ Músicas Curtidas", songs: [] },
    {
      id: 101,
      nome: "🎸 Rock Clássico",
      songs: [
        musicasIniciais[0].id,
        musicasIniciais[1].id,
        musicasIniciais[2].id,
      ],
    },
    {
      id: 102,
      nome: "🎤 Pop",
      songs: [
        musicasIniciais[2].id,
        musicasIniciais[3].id,
        musicasIniciais[6].id,
      ],
    },
    {
      id: 103,
      nome: "✨ R&B Alternativo",
      songs: [
        musicasIniciais[5].id,
        musicasIniciais[7].id,
        musicasIniciais[8].id,
      ],
    },
    {
      id: 104,
      nome: "🔥 Funk",
      songs: [musicasIniciais[4].id, musicasIniciais[9].id],
    },
    {
      id: 105,
      nome: "🥁 Pagode",
      songs: [musicasIniciais[10].id, musicasIniciais[11].id],
    },
  ]);
  const [favoritos, setFavoritos] = useState([]);
  const [activePlaylist, setActivePlaylist] = useState("library");
  const [filtro, setFiltro] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const audioRef = useRef(null);

  const musicasParaReproducao = useMemo(() => {
    let baseMusics = musicas;

    if (filtro) {
      baseMusics = baseMusics.filter(
        (m) =>
          m.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
          m.artista.toLowerCase().includes(filtro.toLowerCase())
      );
    }

    if (activePlaylist !== "library") {
      const targetPlaylist = playlists.find((p) => p.id === activePlaylist);

      if (activePlaylist === "fav") {
        baseMusics = baseMusics.filter((m) => favoritos.includes(m.id));
      } else if (targetPlaylist && targetPlaylist.songs.length > 0) {
        baseMusics = baseMusics.filter((m) =>
          targetPlaylist.songs.includes(m.id)
        );
      } else {
        baseMusics = [];
      }
    }

    return baseMusics;
  }, [musicas, filtro, activePlaylist, playlists, favoritos]);

  const addPlaylist = (nome) => {
    setPlaylists([...playlists, { id: Date.now(), nome: nome, songs: [] }]);
  };

  const addSongToCatalog = (newSong) => {
    setMusicas((prev) => [...prev, newSong]);
  };

  const toggleFavorite = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === "fav"
          ? {
              ...p,
              songs: p.songs.includes(id)
                ? p.songs.filter((x) => x !== id)
                : [...p.songs, id],
            }
          : p
      )
    );
  };

  const playMusic = (music) => {
    if (currentSong?.id === music.id) {
      setIsPlaying(!isPlaying);
    } else {
      const index = musicasParaReproducao.findIndex((m) => m.id === music.id);
      setCurrentSong(music);
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    if (musicasParaReproducao.length === 0) return;

    let nextIndex;
    if (isRepeating && currentSongIndex !== -1) {
      nextIndex = currentSongIndex;
    } else if (isShuffling) {
      nextIndex = Math.floor(Math.random() * musicasParaReproducao.length);
    } else {
      nextIndex = (currentSongIndex + 1) % musicasParaReproducao.length;
    }

    const nextSong = musicasParaReproducao[nextIndex];
    if (nextSong) {
      setCurrentSong(nextSong);
      setCurrentSongIndex(nextIndex);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const playPrev = () => {
    if (musicasParaReproducao.length === 0) return;

    let prevIndex;
    if (isShuffling) {
      prevIndex = Math.floor(Math.random() * musicasParaReproducao.length);
    } else {
      prevIndex =
        (currentSongIndex - 1 + musicasParaReproducao.length) %
        musicasParaReproducao.length;
    }

    const prevSong = musicasParaReproducao[prevIndex];
    if (prevSong) {
      setCurrentSong(prevSong);
      setCurrentSongIndex(prevIndex);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (currentSong && audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.error("Erro ao reproduzir:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="app-container">
      {/* Elemento de Áudio */}
      <audio
        ref={audioRef}
        src={currentSong?.url}
        onTimeUpdate={(e) => {
          setProgress(e.target.currentTime);
          if (isNaN(e.target.duration)) {
            setDuration(currentSong.duracao);
          } else {
            setDuration(e.target.duration);
          }
        }}
        onEnded={playNext}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      />

      <Sidebar
        playlists={playlists}
        onAddPlaylist={addPlaylist}
        activePlaylist={activePlaylist}
        setActivePlaylist={setActivePlaylist}
      />

      <main className="main-content">
        <Header onSearch={setFiltro} openModal={() => setIsModalOpen(true)} />
        <h2 style={{ margin: "20px 0" }}>Músicas Populares</h2>

        <ListaMusicas
          musicas={musicasParaReproducao}
          onPlay={playMusic}
          favoritos={favoritos}
          toggleFav={toggleFavorite}
          currentSongId={currentSong?.id}
        />
      </main>

      <Player
        current={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        progress={progress}
        duration={duration}
        onSeek={(t) => {
          audioRef.current.currentTime = t;
          setProgress(t);
        }}
        volume={volume}
        setVolume={setVolume}
        onNext={playNext}
        onPrev={playPrev}
        isShuffling={isShuffling}
        toggleShuffle={() => setIsShuffling(!isShuffling)}
        isRepeating={isRepeating}
        toggleRepeat={() => setIsRepeating(!isRepeating)}
      />

      <AddSongModal
        isVisible={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onAddSong={addSongToCatalog}
      />
    </div>
  );
}
