const songData = [
    { icon: "icon0.png", alt: "PRAGMATISM -RESURRECTION-", constant: 11.2 },
    { icon: "icon1.png", alt: "Arcana Eden", constant: 11.6 },
    { icon: "icon2.png", alt: "Pentiment", constant: 11.5 },
    { icon: "icon3.png", alt: "World Ender", constant: 11.1 },
    { icon: "icon4.png", alt: "Testify", constant: 12.0 },
    { icon: "icon5.png", alt: "Fracture Ray", constant: 11.1 },
    { icon: "icon6.png", alt: "Grievous Lady", constant: 11.1 },
    { icon: "icon7.png", alt: "ALTER EGO", constant: 11.3 },
    { icon: "icon8.png", alt: "Abstruse Dilemma", constant: 11.3 },
    { icon: "icon9.png", alt: "Arghena", constant: 11.3 },
    { icon: "icon10.png", alt: "Undying Macula", constant: 11.0 },
    { icon: "icon11.png", alt: "Lament Rain", constant: 11.4 },
    { icon: "icon12.png", alt: "Designant.", constant: 11.9 },
    { icon: "icon13.png", alt: "Aether Crest: Astral", constant: 11.5 },
    { icon: "icon14.png", alt: "LAMIA", constant: 11.0 },
    { icon: "icon15.png", alt: "Aegleseeker", constant: 11.2 },
    { icon: "icon16.png", alt: "Extradimensional Cosmic Phenomenon", constant: 11.3 },
    { icon: "icon17.png", alt: "SAIKYO STRONGER", constant: 11.0 },
    { icon: "icon18.png", alt: "Tempestissimo", constant: 11.7 },
    { icon: "icon19.png", alt: "#1f1e33", constant: 11.1 },
    { icon: "icon20.png", alt: "Vicious [ANTi] Heroism", constant: 11.2 }
];

const gridContainer = document.querySelector(".grid");
const imagePath = "./images/";

songData.sort((a, b) => b.constant - a.constant);

gridContainer.innerHTML = "";

songData.forEach(song => {
    const figure = document.createElement("figure");
    
    const constantOverlay = document.createElement("span");
    constantOverlay.textContent = song.constant.toFixed(1);
    constantOverlay.classList.add("constant-overlay");

    const img = document.createElement("img");
    img.src = imagePath + song.icon;
    img.alt = song.alt;
    img.width = 200;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = song.alt;

    figure.appendChild(constantOverlay);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gridContainer.appendChild(figure);
});