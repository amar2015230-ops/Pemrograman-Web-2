import "./App.css";
import profile from "./assets/profile.jpeg";

import film1 from "./assets/film1.jpg";
import film2 from "./assets/film2.jpg";
import film3 from "./assets/film3.jpg";
import film4 from "./assets/film4.jpg";
import film5 from "./assets/film5.jpg";

import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function App() {
  const nama = "Mohamad Amar Maulana Nurhuda";
  const NIM = "25552012019";
  const pekerjaan = "Design Graphic";
  const tanggalLahir = "11 September 1999";

  const [darkMode, setDarkMode] = useState(false);

  const films = [
    { title: "Perang Kota", image: film1 },
    { title: "The Raid", image: film2 },
    { title: "Triple Threat", image: film3 },
    { title: "HigH & Low The Worst", image: film4 },
    { title: "Fast & Furious", image: film5 },
  ];

  // Hitung umur otomatis
  const hitungUmur = () => {
    const lahir = new Date(tanggalLahir);
    const sekarang = new Date();

    let umur = sekarang.getFullYear() - lahir.getFullYear();

    const bulan = sekarang.getMonth() - lahir.getMonth();

    if (
      bulan < 0 ||
      (bulan === 0 && sekarang.getDate() < lahir.getDate())
    ) {
      umur--;
    }

    return umur;
  };

  const getZodiac = () => {
    const birthDate = new Date(tanggalLahir);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
      return "♈ Aries";

    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
      return "♉ Taurus";

    if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
      return "♊ Gemini";

    if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
      return "♋ Cancer";

    if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
      return "♌ Leo";

    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return "♍ Virgo";

    if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
      return "♎ Libra";

    if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
      return "♏ Scorpio";

    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
      return "♐ Sagittarius";

    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
      return "♑ Capricorn";

    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return "♒ Aquarius";

    return "♓ Pisces";
  };

  const cekZodiac = () => {
    alert(`Zodiac Anda adalah ${getZodiac()}`);
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <button
        className="theme-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <div className="profile-card">
        <img src={profile} alt="profile" className="profile-img" />

        <h1>{nama}</h1>

        <p>NIM : {NIM}</p>

        <p>Pekerjaan : {pekerjaan}</p>

        <p>Tanggal Lahir : {tanggalLahir}</p>

        <p>Umur : {hitungUmur()} Tahun</p>

        <button onClick={cekZodiac}>
          Lihat Zodiac
        </button>
      </div>

      <h2>🎬 5 Film Favorit Saya</h2>

      <div className="film-container">
        {films.map((film, index) => (
          <div className="film-card" key={index}>
            <img src={film.image} alt={film.title} />
            <h3>{film.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;