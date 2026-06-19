document.addEventListener('DOMContentLoaded', function () {
const shoeboxMessage = document.querySelector('.shoeboxmessage');
const shoeboxTrigger = document.querySelector('.shoeboxmessage span');
const shoes = document.querySelectorAll('.shoes');

if (shoeboxMessage) shoeboxMessage.style.display = 'none';

if (shoeboxTrigger) {
  shoeboxTrigger.addEventListener('click', function () {
    shoes.forEach(shoe => {
      const isVisible = shoe.style.display === 'block';
      shoe.style.display = isVisible ? 'none' : 'block';
    });

    saveState();
  });
}

  const container = document.querySelector('.items');
  const listContainer = document.querySelector('.active-list');
  const activeDisplay = document.querySelector('.active-display');
  const bubbleTwo = document.querySelector('.bubble.two');
  const queen = document.querySelector('.queen');
  const resetBtn = document.getElementById('showLidBtn');
  const lidImg = document.querySelector('img.lid');
  if (!container || !listContainer || !activeDisplay || !bubbleTwo || !queen || !lidImg) return;

  const activeTitleEl = activeDisplay.querySelector('.active-title');
  const activeDescEl = activeDisplay.querySelector('.active-description');

  if (lidImg && resetBtn) {
    resetBtn.style.display = 'none';

  lidImg.addEventListener('click', () => {
    lidImg.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    saveState();
  });

resetBtn.addEventListener('click', () => {
  if (!confirm("Tu es sûre de vouloir réinitialiser la page?")) {
    return;
  }

      Object.keys(imageMap).forEach(cls => {
        const img = container.querySelector(`.${cls}`);
        if (!img) return;

        img.style.display = 'block';
        img.src = imageMap[cls].normal;
        img.style.filter = '';
        img.style.transform = '';
        img.style.position = '';
        img.style.left = '';
        img.style.top = '';
        img.style.zIndex = '';
      });

      const filmsDiv = document.querySelector('.films');
      if (filmsDiv) {
        filmsDiv.style.position = '';
        filmsDiv.style.left = '';
        filmsDiv.style.top = '';
      }

      perImageState = {};
      currentActive = { className: null, imgEl: null, state: 'hidden' };
      hasSentToList = false;
      listEntries.forEach(el => el.remove());
      listEntries.clear();
      positions = {};
      Object.keys(sequenceStep).forEach(key => sequenceStep[key] = 0);

      activeTitleEl.innerHTML = '';
      activeDescEl.innerHTML = '';

      clearedImages.clear();
      if (shoeboxMessage) shoeboxMessage.style.display = 'none';
      shoes.forEach(shoe => shoe.style.display = 'none');

      updateBubbleTwo();
      updateQueen();
      updateShoeboxMessage();

      localStorage.removeItem('scrapbookState');
      localStorage.removeItem('positions');

      container.offsetHeight;

      lidImg.style.display = 'block';
      resetBtn.style.display = 'none';
      saveState();
    });
  }

  const imageMap = {
    Mot1: {
      normal: "box/motsoleilmaman.JPG",
      active: "box/motsoleilmaman.JPG",
      title: `<h2>Mot de ta maman</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> ?</p>
            <p>Un mot écrit par ta maman :).</p>
        </div>
      `
    },
    LettreMarraine: {
      normal: "box/longmotmarraineiguess.JPG",
      active: "box/longmotmarraineiguess.JPG",
      title: `<h2>Lettre de ta marraine</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2024</p>
            <p>Une lettre de ta marraine.</p>
        </div>
      `
    },
    LettreMargot: {
      normal: "box/lettremargot.JPG",
      active: "box/lettremargot.JPG",
      title: `<h2>Lettre de Margot</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2025</p>
            <p>Une lettre d'anniversaire écrite par Margot.</p>
        </div>
      `
    },
    LettreLéane: {
      normal: "box/lettreléane.JPG",
      active: "box/lettreléane.JPG",
      title: `<h2>Lettre de Léane</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> ?</p>
            <p>Une lettre écrite par Léane.</p>
        </div>
      `
    },
    LettreChloé: {
      normal: "box/lettreannivchloé.JPG",
      active: "box/lettreannivchloé.JPG",
      title: `<h2>Lettre de Chloé</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2025?</p>
            <p>Une lettre écrite par Chloé pour ton anniversaire.</p>
        </div>
      `
    },
    Foya: {
      normal: "box/foya.JPG",
      active: "box/foya.JPG",
      title: `<h2>Linogravure de Foya</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2025</p>
            <p>Un print d'une linogravure faite par Chloé de Foya.</p>
        </div>
      `
    },
    jumpstreet1: {
      normal: "/scrapbook/oddbox/img/jumpstreet1.gif",
      active: "/scrapbook/oddbox/img/jumpstreet2.gif",
      title: `<h2>22 Jump Street Ticket</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2014</p>
        </div>
      `
    },
    badneighbors1: {
      normal: "/scrapbook/oddbox/img/badneighbors1.gif",
      active: "/scrapbook/oddbox/img/badneighbors2.gif",
      title: `<h2>Bad Neighbors Ticket</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2014</p>
        </div>
      `
    },
    fault1: {
      normal: "/scrapbook/oddbox/img/fault1.gif",
      active: "/scrapbook/oddbox/img/fault2.gif",
      title: `<h2>The Fault in Our Stars Ticket</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2014</p>
        </div>
      `
    },
    spiderman1: {
      normal: "/scrapbook/oddbox/img/spiderman1.gif",
      active: "/scrapbook/oddbox/img/spiderman2.gif",
      title: `<h2>The Amazing Spider-Man 2 Ticket</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2014</p>
        </div>
      `
    },
    transformers1: {
      normal: "/scrapbook/oddbox/img/transformers1.gif",
      active: "/scrapbook/oddbox/img/transformers2.gif",
      title: `<h2>Transformers: Age of Exctinction Ticket</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2014</p>
        </div>
      `
    },
    melbourne1: {
      normal: "/scrapbook/oddbox/img/melbourne1.gif",
      active: "/scrapbook/oddbox/img/melbourne2.gif",
      title: `<h2>Melbourne Cup Day Ticket</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2013</p>
            <p>I didn't even go to this. I'm pretty sure my mum got this ticket from work. I don't know why I still have this.</p>
        </div>
      `
    },
    justicecrew1: {
      normal: "/scrapbook/oddbox/img/justicecrew1.gif",
      active: "/scrapbook/oddbox/img/justicecrew2.gif",
      title: `<h2>Justice Crew Ticket</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2012</p>
            <p>I only went for Justice Crew. Who is Reece Mastin even? I left immediately after Justice Crew got off the stage.</p>
        </div>
      `
    },
    nightcrawler1: {
      normal: "/scrapbook/oddbox/img/nightcrawler1.gif",
      active: "/scrapbook/oddbox/img/nightcrawler2.gif",
      title: `<h2>Nightcrawler Ticket</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2014</p>
        </div>
      `
    },
    socialnetwork1: {
      normal: "/scrapbook/oddbox/img/socialnetwork1.gif",
      active: "/scrapbook/oddbox/img/socialnetwork2.gif",
      title: `<h2>The Social Network Ticket</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2010</p>
            <p>My oldest movie ticket stub, 15 years old as of writing this. Held together by a piece of tape.</p>
        </div>
      `
    },
    Poussin1: {
      normal: "box/poussincrochet.png",
      active: "box/poussincrochet.png",
      title: `<h2>Poussin au crochet</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2024?</p>
            <p>Un poussin fait au crochet par Margot pour ton anniversaire.</p>
        </div>
      `
    },
    Postitorange: {
      normal: "box/postitorangemaman.JPG",
      active: "box/postitorangemaman.JPG",
      title: `<h2>Post-it orange</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> ?</p>
        </div>
      `
    },
    PostitJaune: {
      normal: "box/postitjaune.JPG",
      active: "box/postitjaune.JPG",
      title: `<h2>Post-it jaune</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> ?</p>
        </div>
      `
    },
    PostitBleu: {
      normal: "box/postitbleuléane.JPG",
      active: "box/postitbleuléane.JPG",
      title: `<h2>Post-it</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> ?</p>
            <p>Post-it de Léna.</p>
        </div>
      `
    },
    PeachRiot: {
      normal: "box/poppypeachriot.png",
      active: "box/poppypeachriot.png",
      title: `<h2>Poppy (Peach Riot!)</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2025</p>
            <p>Achetée dans une blind box à Berlin</p>
        </div>
      `
    },
    Photo2: {
      normal: "box/photo2.JPG",
      active: "box/photo2.JPG",
      title: `<h2>Photo n°2</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> ?</p>
        </div>
      `
    },
    Photo1: {
      normal: "box/photo1.JPG",
      active: "box/photo1.JPG",
      title: `<h2>Photo n°1</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> ?</p>
        </div>
      `
    },
    PapierAnonyme: {
      normal: "box/papierannéecool.JPG",
      active: "box/papierannéecool.JPG",
      title: `<h2>Papier anonyme</h2>`,
      description: `
        <div class="desc-wrapper">
            <p><strong>Acquis:</strong> ?</p>
            <p>Un petit mot remerciant l'année passée ensemble.</p>
        </div>
      `
    },

    CartePostaleMargot: {
      normal: "box/cartegrauduroimoi.JPG",
      active: "box/cartegrauduroimoi.JPG",
      title: `<h2>Carte postale de Margot n°1</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> 2023</p>
          <p>Une carte postale de Margot envoyée depuis le sud, au Grau du Roi.</p></div>`
    },
    CarteUSA: {
      normal: "box/carteusa.JPG",
      active: "box/carteusa.JPG",
      title: `<h2>Carte des USA</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> 2018</p>
          <p>Une carte envoyée par Isolde des USA</p></div>`
    },
    CartePostaleParrain: {
      normal: "box/cartepostaleparrain.JPG",
      active: "box/cartepostaleparrain.JPG",
      title: `<h2>Carte postale du parrain</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> ?</p>
          <p>Une carte postale envoyée par ton parrain depuis l'Italie!</p></div>`
    },
    CartePostaleMargot2: {
      normal: "box/cartepostalepaimpolmargot.JPG",
      active: "box/cartepostalepaimpolmargot.JPG",
      title: `<h2>Carte postale de Margot</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> 2025</p>
          <p>Une carte postale envoyée depuis Paimpol par Margot.</p></div>`
    },
    CarteFleur: {
      normal: "box/cartepostalefleurcéline.JPG",
      active: "box/cartepostalefleurcéline.JPG",
      title: `<h2>Carte de Céline n°5</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> 2016</p>
          <p>Une carte postale envoyée par Céline.</p></div>`
    },
    CartePlume: {
      normal: "box/carteplumecéline.JPG",
      active: "box/carteplumecéline.JPG",
      title: `<h2>Carte de Céline n°4</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> 2023</p>
          <p>Une carte d'anniversaire envoyée par Céline.</p></div>`
    },
    CartePlanterParrain: {
      normal: "box/carteplanterparrain.JPG",
      active: "box/carteplanterparrain.JPG",
      title: `<h2>Carte du parrain... encore!</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> ?</p>
          <p>Une carte à planter envoyée par ton parrain pour Noël.</p></div>`
    },
    CartePlanterMargot: {
      normal: "box/carteplantermargot.JPG",
      active: "box/carteplantermargot.JPG",
      title: `<h2>Carte de Margot</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> 2023</p>
          <p>Une carte à planter envoyée par Margot depuis la Bretagne (la Fresnais).</p></div>`
    },
    CarteMissElise: {
      normal: "box/carteparrainmisselise.JPG",
      active: "box/carteparrainmisselise.JPG",
      title: `<h2>Encore une carte de ton parrain?!</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> ?</p>
          <p>Ca fait beaucoup de cartes de ton parrain.</p></div>`
    },
    CarteParrain: {
      normal: "box/carteparrainkarine.JPG",
      active: "box/carteparrainkarine.JPG",
      title: `<h2>Carte autre du parrain et de Karine</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> ?</p>
          <p>Une carte écrite par ton parrain et Karine.</p></div>`
    },
    CarteNoël: {
      normal: "box/cartenoelcéline.JPG",
      active: "box/cartenoelcéline.JPG",
      title: `<h2>Carte de Céline n°3</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> ?</p>
          <p>Une carte de Noël envoyée par Céline</p></div>`
    },
    ConanGray: {
      normal: "nobackground/conangray.png",
      active: "nobackground/conangray.png",
      title: `<h2>Une carte de Conan Gray signée</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquise:</strong> en 2025</p>
          <p>I received a polaroid camera as a gift on my 18th birthday.</p></div>`
    },
    CarteLulu: {
      normal: "box/cartelulu.JPG",
      active: "box/cartelulu.JPG",
      title: `<h2>Carte de Lucie</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> 29 mars</p>
          <p>Une carte de Lulu </p></div>`
    },
    CarteLouise: {
      normal: "box/cartelchatouise.JPG",
      active: "box/cartelchatouise.JPG",
      title: `<h2>Carte Louise</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> 2024</p>
          <p>Une cart avec un dessin de chat.</p></div>`
    },
    CarteIsolde: {
      normal: "box/carteisolde.JPG",
      active: "box/carteisolde.JPG",
      title: `<h2>Carte d'Isolde n°1</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> 2018</p>
          <p>Une carte d'Isolde depuis l'Italie! Stylé</p></div>`
    },
    CarteClochette: {
      normal: "box/carteféeclochette.gif",
      active: "box/carteféeclochette.gif",
      title: `<h2>Carte fée Clochette</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> ?</p>
          <p>Une carte fée Clochette du parrain</p></div>`
    },
    Dessins: {
      normal: "box/cartedessins.gif",
      active: "box/cartedessins.gif",
      title: `<h2>Papier dessiné</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> lycée</p>
          <p>Un papier avec pleins de petits dessins et mots.</p></div>`
    },
    CarteCéline: {
      normal: "box/cartecélineclasseverte.JPG",
      active: "box/cartecélineclasseverte.JPG",
      title: `<h2>Carte Céline n°1</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> 2019</p>
          <p>Une autre carte de Céline de mars 2019.</div>`
    },
    CarteChien: {
      normal: "/box/cartechienrose.JPG",
      active: "box/cartechienrose.JPG",
      title: `<h2>Carte et photo du chien</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> Aucune idée</p>
          <p>Une carte de Lion avec une photo de son chien :)</p></div>`
    },
    CarteCéline2: {
      normal: "box/cartecéline.gif",
      active: "box/cartecéline.gif",
      title: `<h2>Carte de Céline n°2</h2>`,
      description: `
          <div class="desc-wrapper">
            <p><strong>Acquis:</strong> 2018</p>
            <p> Une petite carte de Céline envoyée depuis Berlin.</p>
        </div>`
    },
    MarquePage: {
      normal: "nobackground/marquepage.png",
      active: "nobackground/marquepage.png",
      title: `<h2>Marque page</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong>2023 ?</p>
          <p>Le rappel est important.</p></div>`
    },
    CarteAnonyme: {
      normal: "box/carteanonymepaillette.gif",
      active: "box/carteanonymepaillette.gif",
      title: `<h2>Une carte anonyme omg so mysterious</h2>`,
      description: `<div class="desc-wrapper"><p><strong>Acquis:</strong> 2025 ou 2024? idk sorry</p></div>`
    }
  };

  const sequenceMap = {
    Dessins: [
      "box/cartedessins.gif",
      "/scrapbook/oddbox/img/flowerboxnote11.gif",
      "/scrapbook/oddbox/img/flowerboxnote2.gif",
      "/scrapbook/oddbox/img/flowerboxnote22.gif"
    ],
    CarteNoël: [
      "/scrapbook/oddbox/img/CarteNoël.gif",
      "/scrapbook/oddbox/img/venus2.gif",
      "/scrapbook/oddbox/img/venus3.gif",
      "/scrapbook/oddbox/img/venus4.gif"
    ],
    CarteParrain: [
      "/scrapbook/oddbox/img/CarteParrain.gif",
      "/scrapbook/oddbox/img/perfectnote2.gif",
      "/scrapbook/oddbox/img/perfectnote3.gif",
      "/scrapbook/oddbox/img/perfectnote4.gif"
    ],
    CarteFleur: [
      "/scrapbook/oddbox/img/CarteFleur.gif",
      "/scrapbook/oddbox/img/pinbox2.gif",
      "/scrapbook/oddbox/img/kangaroopin1.gif"
    ],
    CartePlanterParrain: [
      "/scrapbook/oddbox/img/CartePlanterParrain1.gif",
      "/scrapbook/oddbox/img/CartePlanterParrain2.gif",
      "/scrapbook/oddbox/img/CartePlanterParrain3.gif",
      "/scrapbook/oddbox/img/CartePlanterParrain4.gif"
    ]
  };
  const sequenceStep = {};

  let perImageState = {};
  let currentActive = { className: null, imgEl: null, state: 'hidden' };
  let listEntries = new Map();
  let hasSentToList = false;
  let positions = JSON.parse(localStorage.getItem('positions') || '{}');
  let topZ = 1;

  let clearedImages = new Set();

  function updateBubbleTwo() {
    bubbleTwo.style.display = currentActive.imgEl && (currentActive.state === 'normal' || currentActive.state === 'active') ? 'block' : 'none';
  }

  function updateQueen() {
    queen.style.display = hasSentToList ? 'block' : 'none';
  }

  function updateShoeboxMessage() {
    if (!shoeboxMessage) return;
    const total = Object.keys(imageMap).length;
    if (clearedImages.size >= total) {
      shoeboxMessage.style.display = 'block';
    } else {
      shoeboxMessage.style.display = 'none';
    }
  }

  function createListEntry(img, className) {
    if (listEntries.has(className)) return;
    const listEl = document.createElement('div');
    listEl.className = 'list-entry';
    listEl.dataset.imageClass = className;
    listEl.textContent = img.alt || className;
    listEl.addEventListener('click', () => activateImage(img, className));
    listContainer.appendChild(listEl);
    listEntries.set(className, listEl);
    saveState();
  }

function refreshListHighlights() {
  listEntries.forEach((el, cls) => {
    if (perImageState[cls] && perImageState[cls] !== 'hidden') {
      el.classList.add('active');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      el.classList.remove('active');
    }
  });
}

function saveState() {
  const state = {
    perImageState,
    currentActive: { className: currentActive.className, state: currentActive.state },
    listEntries: Array.from(listEntries.keys()),
    hasSentToList,
    positions,
    clearedImages: Array.from(clearedImages),
    lidVisible: lidImg && lidImg.style.display !== 'none',
    shoesVisible: Array.from(shoes).some(shoe => shoe.style.display !== 'none') // âœ…
  };
  localStorage.setItem('scrapbookState', JSON.stringify(state));
}

function loadState() {
  const state = JSON.parse(localStorage.getItem('scrapbookState') || '{}');

  if (!state || Object.keys(state).length === 0) {
    lidImg.style.display = 'block';
    resetBtn.style.display = 'none';
    shoes.forEach(shoe => shoe.style.display = 'none');
    queen.style.display = 'none';

    perImageState = {};
    hasSentToList = false;
    clearedImages = new Set();
    currentActive = { className: null, imgEl: null, state: 'hidden' };
    listEntries.clear();
    positions = {};
  } else {
    if (state.shoesVisible) {
      shoes.forEach(shoe => shoe.style.display = 'block');
    } else {
      shoes.forEach(shoe => shoe.style.display = 'none');
    }

    perImageState = state.perImageState || {};
    hasSentToList = state.hasSentToList || false;
    clearedImages = new Set(state.clearedImages || []);

    if (state.lidVisible) {
      lidImg.style.display = 'block';
      resetBtn.style.display = 'none';
    } else {
      lidImg.style.display = 'none';
      resetBtn.style.display = 'inline-block';
    }

    updateQueen();

    (state.listEntries || []).forEach(cls => {
      const img = container.querySelector(`.${cls}`);
      if (!img) return;
      createListEntry(img, cls);
    });

    for (const [cls, pos] of Object.entries(state.positions || {})) {
      const el = container.querySelector(`.${cls}`);
      if (el) {
        el.style.position = 'absolute';
        el.style.left = pos.left;
        el.style.top = pos.top;
      }
    }

    Object.entries(perImageState).forEach(([cls, st]) => {
      const img = container.querySelector(`.${cls}`);
      if (!img) return;
      img.style.display = st === 'hidden' ? 'none' : 'block';
      img.src = st === 'active' ? imageMap[cls].active : imageMap[cls].normal;
      img.style.filter = '';
      img.style.transform = '';
    });

    if (state.currentActive && state.currentActive.className) {
      const cls = state.currentActive.className;
      const st = state.currentActive.state;
      const img = container.querySelector(`.${cls}`);
      if (img && st !== 'hidden') {
        currentActive = { className: cls, imgEl: img, state: st };
        activeTitleEl.innerHTML = imageMap[cls].title;
        activeDescEl.innerHTML = imageMap[cls].description;
      }
    }
  }

  updateBubbleTwo();
  updateShoeboxMessage();
  refreshListHighlights();
}

  function getMaxZIndex() {
    const imgs = document.querySelectorAll('.items img');
    let max = 0;
    imgs.forEach(i => {
      const z = parseInt(window.getComputedStyle(i).zIndex) || 0;
      if (z > max) max = z;
    });
    return max;
  }

  function activateImage(img, className) {
    if (currentActive.imgEl && currentActive.className !== className) {
      currentActive.imgEl.style.display = 'none';
      perImageState[currentActive.className] = 'hidden';
      clearedImages.add(currentActive.className);
      updateShoeboxMessage();
    }

    img.style.display = 'block';
    img.src = imageMap[className].normal;
    img.style.filter = 'unset';
    img.style.transform = 'unset';
    img.style.zIndex = getMaxZIndex() + 1;

    currentActive = { className, imgEl: img, state: 'normal' };
    perImageState[className] = 'normal';

    activeTitleEl.innerHTML = imageMap[className].title;
    activeDescEl.innerHTML = imageMap[className].description;

    updateBubbleTwo();

    if (!listEntries.has(className)) {
      if (!hasSentToList) hasSentToList = true;
      updateQueen();
      createListEntry(img, className);
    }

    refreshListHighlights();
    updateShoeboxMessage();
    saveState();
  }

container.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const img = e.target.closest('img');
  if (!img) return;
  const className = [...img.classList].find(c => imageMap[c]);
  if (!className) return;

    if (currentActive.className && currentActive.className !== className) {
      currentActive.imgEl.style.display = 'none';
      perImageState[currentActive.className] = 'hidden';
      clearedImages.add(currentActive.className);
      updateShoeboxMessage();
    }

if (sequenceMap[className]) {
  const frames = sequenceMap[className];
  let step = sequenceStep[className] ?? 0;
  const currentSrc = img.getAttribute('src') || '';

  if (step === 0 && (currentSrc === frames[0] || currentSrc.endsWith(frames[0]))) {
    step = 1;
  }

  if (step < frames.length) {
    img.style.display = 'block';
    img.style.zIndex = getMaxZIndex() + 1;
    img.src = frames[step];

    perImageState[className] = 'active';
    currentActive = { className, imgEl: img, state: 'active' };
    activeTitleEl.innerHTML = imageMap[className].title;
    activeDescEl.innerHTML = imageMap[className].description;

    img.style.filter = 'unset';
    img.style.transform = 'unset';

    updateBubbleTwo();
    saveState();

    sequenceStep[className] = step + 1;
  } else {
    img.style.display = 'none';
    perImageState[className] = 'hidden';
    sequenceStep[className] = 0;
    clearedImages.add(className);

    if (currentActive.className === className) {
      currentActive.state = 'hidden';
      activeTitleEl.innerHTML = '';
      activeDescEl.innerHTML = '';
    }

    updateBubbleTwo();
    updateShoeboxMessage();
    saveState();
  }
  refreshListHighlights();
  return;
}

    if (currentActive.className === className) {
      if (currentActive.state === 'normal') {
        img.src = imageMap[className].active;
        currentActive.state = 'active';
      } else if (currentActive.state === 'active') {
        img.style.display = 'none';
        currentActive.state = 'hidden';
        clearedImages.add(className);
        updateShoeboxMessage();
      } else {
        img.style.display = 'block';
        img.src = imageMap[className].normal;
        currentActive.state = 'normal';
      }
    } else {
      img.style.display = 'block';
      img.src = imageMap[className].normal;
      currentActive = { className, imgEl: img, state: 'normal' };
    }

    if (currentActive.state !== 'hidden') {
      img.style.filter = 'unset';
      img.style.transform = 'unset';
    }

    perImageState[className] = currentActive.state;
    activeTitleEl.innerHTML = currentActive.state !== 'hidden' ? imageMap[className].title : '';
    activeDescEl.innerHTML = currentActive.state !== 'hidden' ? imageMap[className].description : '';

    updateBubbleTwo();
    refreshListHighlights();
    updateShoeboxMessage();
    saveState();
  });

Object.keys(imageMap).forEach(className => {
  const img = container.querySelector(`.${className}`);
  if (!img) return;
  img.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (!currentActive.className || currentActive.className !== className) {
      activateImage(img, className);
    }
  });
});

let draggingEl = null;
let startX = 0, startY = 0, origLeft = 0, origTop = 0;

container.addEventListener('pointerdown', (e) => {
  if (e.button !== 0) return;
  const target = e.target.closest('.items > *');
  if (!target) return;
  
  draggingEl = target;
  topZ++;
  draggingEl.style.zIndex = topZ;

  container.classList.add('dragging');

  const style = getComputedStyle(draggingEl);
  const rect = draggingEl.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  startX = e.clientX;
  startY = e.clientY;
  origLeft = parseFloat(style.left) || rect.left - containerRect.left;
  origTop = parseFloat(style.top) || rect.top - containerRect.top;

  if (style.position === 'static') {
    draggingEl.style.position = 'absolute';
    draggingEl.style.left = origLeft + 'px';
    draggingEl.style.top = origTop + 'px';
  }

  draggingEl.setPointerCapture(e.pointerId);
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerup', onPointerUp, { once: true });
  container.addEventListener('pointercancel', onPointerUp, { once: true });
  e.preventDefault();
});

function onPointerMove(e) {
  if (!draggingEl) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  draggingEl.style.left = origLeft + dx + 'px';
  draggingEl.style.top = origTop + dy + 'px';
}

function onPointerUp(e) {
  if (!draggingEl) return;
  draggingEl.releasePointerCapture(e.pointerId);

  container.classList.remove('dragging');

  positions[draggingEl.classList[0]] = { left: draggingEl.style.left, top: draggingEl.style.top };
  saveState();
  draggingEl = null;
  container.removeEventListener('pointermove', onPointerMove);
}

  container.addEventListener('contextmenu', (e) => e.preventDefault());

  container.addEventListener('click', () => {
    refreshListHighlights();
  });

  loadState();
});