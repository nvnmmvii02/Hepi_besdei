import { useState, useEffect, useRef, useCallback } from 'react';

export default function App() {
  const [introHidden, setIntroHidden] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [birthdayVisible, setBirthdayVisible] = useState(false);
  const [partyClicked, setPartyClicked] = useState(false);
  const [noBtnText, setNoBtnText] = useState('B. Nggak 😝');
  const [noBtnTransform, setNoBtnTransform] = useState('translate(0,0)');
  const [flowers, setFlowers] = useState<Array<{
    type: 'flower' | 'leaf';
    left: string;
    top: string;
    scale: string;
    color?: string;
    rotation?: string;
    delay: string;
  }>>([]);

  const partyRef = useRef<HTMLDivElement>(null);
  const flowersRef = useRef<HTMLDivElement>(null);

  // Auto-start after 3.4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!introHidden) {
        startSequence();
      }
    }, 3400);
    return () => clearTimeout(timer);
  }, [introHidden]);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveModal(null);
      }
      if (event.key === 'Enter' || event.key === ' ') {
        if (activeModal !== 'modal4' && birthdayVisible) {
          launchParty();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, birthdayVisible]);

  const startSequence = () => {
    setIntroHidden(true);
    setTimeout(() => {
      setActiveModal('modal1');
    }, 800);
  };

  const showModal = (id: string) => {
    setActiveModal(id);
  };

  const hideAllModals = () => {
    setActiveModal(null);
  };

  const handleYesClick = () => {
    hideAllModals();
    setBirthdayVisible(true);
    createFlowers();
  };

  const handleNoHover = () => {
    if (window.innerWidth > 700) {
      const x = (Math.random() * 120) - 60;
      const y = (Math.random() * 70) - 35;
      setNoBtnTransform(`translate(${x}px, ${y}px)`);
    }
  };

  const handleNoClick = () => {
    const texts = ['B. Coba lagi 😭', 'B. Nggak tega kan? 😂', 'B. Yakin? 😭', 'B. Hmmm... 😏'];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setNoBtnText(randomText);
    setNoBtnTransform('translate(0,0)');
  };

  const createFlowers = () => {
    const flowerColors = ['#ef5350', '#f7b733', '#ffd84d', '#e85aad', '#f45b69'];
    const newFlowers: typeof flowers = [];

    // 38 flowers
    for (let i = 0; i < 38; i++) {
      newFlowers.push({
        type: 'flower',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        scale: (0.55 + Math.random() * 1.2).toFixed(2),
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
        delay: (Math.random() * 2.5).toFixed(2) + 's',
      });
    }

    // 30 leaves
    for (let i = 0; i < 30; i++) {
      newFlowers.push({
        type: 'leaf',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        scale: (0.7 + Math.random() * 1.1).toFixed(2),
        rotation: Math.round(Math.random() * 180 - 90) + 'deg',
        delay: (Math.random() * 3).toFixed(2) + 's',
      });
    }

    setFlowers(newFlowers);
  };

  const launchParty = useCallback(() => {
    setPartyClicked(true);
    const party = partyRef.current;
    if (!party) return;

    const balloonColors = ['#ff5a7d', '#ffd43b', '#5bd1a7', '#65a8ff', '#bf78ff', '#ff8c42', '#f062b7'];
    const sparkColors = ['#ef4d7c', '#ffd43b', '#5bd1a7', '#6aa8ff', '#ae75ef', '#ff8b55'];

    // Balloons
    for (let i = 0; i < 34; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.style.left = Math.random() * 100 + '%';
      balloon.style.bottom = (-90 - Math.random() * 100) + 'px';
      balloon.style.setProperty('--c', balloonColors[Math.floor(Math.random() * balloonColors.length)]);
      balloon.style.setProperty('--dx', (Math.random() * 240 - 120) + 'px');
      balloon.style.setProperty('--rot', (Math.random() * 70 - 35) + 'deg');
      balloon.style.animationDelay = Math.random() * 0.9 + 's';

      const string = document.createElement('div');
      string.className = 'string';
      balloon.appendChild(string);
      party.appendChild(balloon);

      setTimeout(() => balloon.remove(), 5500);
    }

    // Horns
    for (let i = 0; i < 22; i++) {
      const horn = document.createElement('div');
      horn.className = 'horn';
      horn.style.left = Math.random() * 100 + '%';
      horn.style.bottom = (-150 - Math.random() * 80) + 'px';
      horn.style.setProperty('--c1', '#f25473');
      horn.style.setProperty('--c2', '#f7d154');
      horn.style.setProperty('--c3', '#63cf8e');
      horn.style.setProperty('--c4', '#6aa8ff');
      horn.style.setProperty('--dx', (Math.random() * 400 - 200) + 'px');
      horn.style.setProperty('--rot', (Math.random() * 180 - 90) + 'deg');
      horn.style.animationDelay = (0.2 + Math.random() * 1.2) + 's';
      party.appendChild(horn);

      setTimeout(() => horn.remove(), 5000);
    }

    // Sparks
    for (let i = 0; i < 90; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      spark.style.left = 48 + Math.random() * 4 + '%';
      spark.style.top = 48 + Math.random() * 4 + '%';
      spark.style.setProperty('--c', sparkColors[Math.floor(Math.random() * sparkColors.length)]);
      spark.style.setProperty('--x', ((Math.random() * 2 - 1) * 520) + 'px');
      spark.style.setProperty('--y', ((Math.random() * 2 - 1) * 430) + 'px');
      spark.style.animationDelay = Math.random() * 0.55 + 's';
      party.appendChild(spark);

      setTimeout(() => spark.remove(), 2400);
    }
  }, []);

  return (
    <>
      {/* INTRO */}
      <section id="intro" className={introHidden ? 'hide' : ''}>
        <div className="glass">
          <div className="heart">❤️</div>
          <h1 id="introTitle">Ada sesuatu buat kamu...</h1>
          <p className="intro-sub">
            Jangan pergi dulu. Ada beberapa kata yang sengaja aku simpan untuk seseorang yang spesial.
          </p>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <button className="skip" onClick={startSequence}>
            Mulai sekarang ✨
          </button>
        </div>
      </section>

      {/* MODAL 1 */}
      <div className={`modal-layer ${activeModal === 'modal1' ? 'show' : ''}`}>
        <div className="modal">
          <div className="emoji">🎂💗</div>
          <h2>Selamat bertambah usia sayang</h2>
          <p>
            Hari ini bukan sekadar hari biasa. Hari ini adalah hari lahirnya seseorang yang sangat berarti.
          </p>
          <button className="next-btn" onClick={() => showModal('modal2')}>
            Lanjut 💕
          </button>
        </div>
      </div>

      {/* MODAL 2 */}
      <div className={`modal-layer ${activeModal === 'modal2' ? 'show' : ''}`}>
        <div className="modal">
          <div className="emoji">🙏🌷</div>
          <h2>Semoga semua doa di kabulkan</h2>
          <p>
            Semoga setiap harapan baikmu menemukan jalannya, satu per satu, sampai benar-benar menjadi nyata.
          </p>
          <button className="next-btn" onClick={() => showModal('modal3')}>
            Masih ada satu lagi 💌
          </button>
        </div>
      </div>

      {/* MODAL 3 */}
      <div className={`modal-layer ${activeModal === 'modal3' ? 'show' : ''}`}>
        <div className="modal">
          <div className="emoji">👀💞</div>
          <h2>Aku punya pertanyaan buat kamu nih...</h2>
          <p>Siap menjawab dengan jujur?</p>
          <button className="next-btn" onClick={() => showModal('modal4')}>
            Tanya aja 😳
          </button>
        </div>
      </div>

      {/* MODAL 4 - QUESTION */}
      <div className={`modal-layer ${activeModal === 'modal4' ? 'show' : ''}`}>
        <div className="modal">
          <div className="emoji">💘</div>
          <h2>Kamu sayang aku nggak?</h2>
          <p>Pilih salah satu. Jangan asal pencet ya 😆</p>
          <div className="choices">
            <button className="choice-btn" id="yesBtn" onClick={handleYesClick}>
              A. Sayang dong ❤️
            </button>
            <button
              className="choice-btn"
              id="noBtn"
              style={{ transform: noBtnTransform }}
              onMouseEnter={handleNoHover}
              onClick={handleNoClick}
            >
              {noBtnText}
            </button>
          </div>
        </div>
      </div>

      {/* BIRTHDAY PAGE */}
      <section id="birthday" className={birthdayVisible ? 'show' : ''}>
        <div className="pixel-layer" ref={flowersRef}>
          {flowers.map((item, index) =>
            item.type === 'flower' ? (
              <div
                key={index}
                className="pixel-flower"
                style={{
                  left: item.left,
                  top: item.top,
                  '--s': item.scale,
                  '--c': item.color,
                  animationDelay: item.delay,
                } as React.CSSProperties}
              />
            ) : (
              <div
                key={index}
                className="leaf"
                style={{
                  left: item.left,
                  top: item.top,
                  '--s': item.scale,
                  '--r': item.rotation,
                  animationDelay: item.delay,
                } as React.CSSProperties}
              />
            )
          )}
        </div>

        <div className="center">
          <div className="ribbon">💐 Hari spesialmu 💐</div>

          <h1 id="birthdayTitle">
            SELAMAT ULANG TAHUN KE-31
            <br />
            ISTRIKU TERCINTA
            <br />
            AZLENA VIRA SAFITRI ❤️
          </h1>

          <p className="subtitle">
            Semoga hari-harimu selalu penuh cinta, tawa, rezeki, dan hal-hal baik. 🥰
          </p>

          <div className="click-box" onClick={launchParty}>
            {partyClicked ? 'WOOHOO!!! 🎉🎈' : 'KLIK 🎉'}
            {!partyClicked && <small>sentuh di sini untuk kejutan terakhir</small>}
          </div>
        </div>

        <div className="footer-love">
          Dibuat dengan cinta, khusus untukmu ❤️
        </div>
      </section>

      {/* PARTY CONTAINER */}
      <div id="party" ref={partyRef}></div>
    </>
  );
}
