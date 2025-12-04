const Characters = [
    {
        id: "ayu",
        name: "Ayu",
        isAwaken: true,
        avatar: {
            default: "./Assets/Images/Avatars/ayu.png",
            awaken: "./Assets/Images/Avatars/ayu-awaken.png"
        },
        icon: {
            default: "./Assets/Images/Icons/ayu.png",
            awaken: "./Assets/Images/Icons/ayu-awaken.png"
        },
        stats: {
            type: ["Balance", "Balance"],
            frag: ["50 (50)", "50 (50)"],
            step: ["45 (83)", "83 (93)"],
            over: ["12 (49)", "49 (59)"]
        },
        skill: [
            "Random fragment bonus upon completing song",
            "World Mode progress randomly increased or decreased between +5 and -5"
        ]
    },
    {
        id: "eto-and-lunar-winter",
        name: "Eto & Lunar (Winter)",
        isAwaken: false,
        avatar: "./Assets/Images/Avatars/eto-and-lunar-winter.png",
        icon: "./Assets/Images/Icons/eto-and-lunar-winter.png",
        stats: {
            type: "Support",
            frag: "52 (86)",
            step: "24 (40)",
            over: "39 (64)",
        },

        skill: "EASY + Recollection Gauge starts at 30%<br>Reduced Recollection Rate gain per note"
    },
    {
        id: "lethe-apophenia",
        name: "Lethe (Apophenia)",
        isAwaken: false,
        avatar: "./Assets/Images/Avatars/lethe-apophenia.png",
        icon: "./Assets/Images/Icons/lethe-apophenia.png",
        stats: {
            type: "Challenge",
            frag: "57 (80)",
            step: "70 (100)",
            over: "39 (64)",
        },

        skill: "HARD + MIRROR - Track Lost when Recollection Rate reaches 0%"
    },
    {
        id: "shirabe",
        name: "Shirabe",
        isAwaken: true,
        avatar: {
            default: "./Assets/Images/Avatars/shirabe.png",
            awaken: "./Assets/Images/Avatars/shirabe-awaken.png"
        },
        icon: {
            default: "./Assets/Images/Icons/shirabe.png",
            awaken: "./Assets/Images/Icons/shirabe-awaken.png"
        },
        stats: {
            type: ["Balance", "Balance"],
            frag: ["56 (82)", "82 (92)"],
            step: ["46 (68)", "68 (78)"],
            over: ["31 (58)", "58 (68)"]
        },
        skill: [
            "(Lv8) Earn +5 Fragments when playing a 'Conflict Side' song",
            "Pay the chart level in Fragments on start<br>Earn +10 Fragments on EX or above"
        ]
    },
    {
        id: "sia",
        name: "Sia",
        isAwaken: false,
        avatar: "./Assets/Images/Avatars/sia.png",
        icon: "./Assets/Images/Icons/sia.png",
        stats: {
            type: "Balance",
            frag: "52 (87)",
            step: "51 (64)",
            over: "37 (63)",
        },
        skill: "Randomly triggers MIRROR - Gain +5 Fragments on MIRROR"
    },
    {
        id: "vita-wanderer",
        name: "Vita (Wanderer)",
        isAwaken: false,
        avatar: "./Assets/Images/Avatars/vita-wanderer.png",
        icon: "./Assets/Images/Icons/vita-wanderer.png",
        stats: {
            type: "Balance",
            frag: "34 (52)",
            step: "43 (64)",
            over: "73 (110)",
        },
        skill: "Recollection Gauge and OVER reduced by 1 for every 2 FAR notes"
    }
];

let currentAwaken = 0;


function renderSidebar() {
    const list = document.getElementById("partnerList");
    list.innerHTML = "";
    
    const clearActive = () => {
        document.querySelectorAll(".partner-item").forEach(i => i.classList.remove("active"));
    };

    Characters.forEach(char => {
        const item = document.createElement("div");
        item.className = "partner-item";
        item.dataset.id = char.id;
        item.setAttribute('tabindex', '0');

        const iconSrc = typeof char.icon === 'string' ? char.icon : char.icon.default;

        item.innerHTML = `
            <img class="partner-icon" src="${iconSrc}">
            <div class="partner-name">${char.name}</div>
        `;

        const iconElement = item.querySelector(".partner-icon");
        
        iconElement.addEventListener("mouseover", () => iconElement.classList.add('hovered'));
        iconElement.addEventListener("mouseout", () => iconElement.classList.remove('hovered'));
        
        item.addEventListener("focus", () => {
            console.log(`[LOG] Focus triggered on: ${char.name}`); 
            clearActive();
            item.classList.add("active");
            currentAwaken = 0;
            updateAwakenButtons(char.isAwaken);
            renderCharacter(char.id);
        });
        
        item.addEventListener("blur", () => {
        });
        
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); 
                clearActive();
                item.classList.add("active");
                currentAwaken = 0;
                updateAwakenButtons(char.isAwaken);
                renderCharacter(char.id);
            }
        });

        item.addEventListener("click", () => {
            clearActive();
            item.classList.add("active");
            currentAwaken = 0;
            updateAwakenButtons(char.isAwaken);
            renderCharacter(char.id);
        });

        list.appendChild(item);
    });
    
    
    const avatarImg = document.getElementById("avatar-display");
    avatarImg.setAttribute('tabindex', '0');
    
    const modal = document.getElementById('avatarModal');
    const modalAvatar = document.getElementById('modalAvatar');
    const modalFileName = document.getElementById('modalFileName');
    const body = document.body;
    
    const getFileName = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    const closeModal = () => {
        modal.classList.remove('visible');
        body.classList.remove('blurred');
        avatarImg.classList.remove('clicked'); 
    };

    avatarImg.addEventListener("click", () => {
        if (document.querySelector(".avatar-box").classList.contains("has-image")) {
            modalAvatar.src = avatarImg.src;
            modalFileName.textContent = getFileName(avatarImg.src); 
            
            modal.classList.add('visible');
            body.classList.add('blurred');
            
            console.log(`[LOG] Opened Modal for: ${modalAvatar.src}`);
        }
    });

    modal.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === 'Escape' && modal.classList.contains('visible')) {
            closeModal();
        }
    });


    const btnDefault = document.getElementById("btn-default");
    const btnAwaken = document.getElementById("btn-awaken");
    
    if (btnDefault) btnDefault.setAttribute('tabindex', '0');
    if (btnAwaken) btnAwaken.setAttribute('tabindex', '0');

}

function getDesc(id, mode = 0) {
    const c = Characters.find(x => x.id === id);
    if (!c) return "";
    
    const type = Array.isArray(c.stats.type) ? c.stats.type[mode] : c.stats.type;
    const frag = Array.isArray(c.stats.frag) ? c.stats.frag[mode] : c.stats.frag;
    const step = Array.isArray(c.stats.step) ? c.stats.step[mode] : c.stats.step;
    const over = Array.isArray(c.stats.over) ? c.stats.over[mode] : c.stats.over;
    const skillText = Array.isArray(c.skill) ? c.skill[mode] : c.skill;

    const monospaceID = `<span class="stats-value">${c.id}</span>`;
    const monospaceFrag = `<span class="stats-value">${frag}</span>`;
    const monospaceStep = `<span class="stats-value">${step}</span>`;
    const monospaceOver = `<span class="stats-value">${over}</span>`;


    return `
        <div class="info-name">${c.name}</div>
        <div class="info-title">ID: ${monospaceID}</div>

        <div class="info-section">
            <strong>TYPE:</strong> ${type}
        </div>

        <div class="info-section">
            <strong>FRAG:</strong> ${monospaceFrag}
        </div>

        <div class="info-section">
            <strong>STEP:</strong> ${monospaceStep}
        </div>

        <div class="info-section">
            <strong>OVER:</strong> ${monospaceOver}
        </div>

        <div class="info-section">
            <strong>SKILL:</strong>
            <div class="skill-text">${skillText}</div>
        </div>
    `;
}


function renderCharacter(id) {
    const c = Characters.find(ch => ch.id === id);
    if (!c) return;

    const avatarSrc = c.isAwaken 
        ? (currentAwaken === 0 ? c.avatar.default : c.avatar.awaken)
        : c.avatar;
    
    const iconSrc = c.isAwaken
        ? (currentAwaken === 0 ? c.icon.default : c.icon.awaken)
        : c.icon;

    document.getElementById("avatar-display").src = avatarSrc;
    document.querySelector(".avatar-box").classList.add("has-image");
    
    const activePartnerItem = document.querySelector(`.partner-item.active .partner-icon`);
    if (activePartnerItem) {
        activePartnerItem.src = iconSrc;
    }
    
    document.getElementById("avatar-display").classList.remove('clicked');


    document.getElementById("info-box").innerHTML = getDesc(id, currentAwaken);
    document.getElementById("info-box").classList.remove("empty");


    console.log(`[LOG] Rendered: ${id}, Mode = ${currentAwaken === 0 ? "Default" : "Awaken"}`);
}


function updateAwakenButtons(active) {
    document.getElementById("modeButtons").style.display = active ? "flex" : "none";
}

document.getElementById("btn-default").addEventListener("click", () => {
    const activePartner = document.querySelector(".partner-item.active");
    if (activePartner) {
        currentAwaken = 0;
        renderCharacter(activePartner.dataset.id);
    }
});

document.getElementById("btn-awaken").addEventListener("click", () => {
    const activePartner = document.querySelector(".partner-item.active");
    if (activePartner) {
        currentAwaken = 1;
        renderCharacter(activePartner.dataset.id);
    }
});


window.onload = () => {
    renderSidebar();
    
    const avatarBox = document.querySelector(".avatar-box");
    if (avatarBox) {
        avatarBox.classList.remove("has-image");
    }
    const infoBox = document.getElementById("info-box");
    if (infoBox) {
        infoBox.classList.add("empty");
        infoBox.innerHTML = "Please Pick A Partner To See Their Information";
    }
    
    document.getElementById("modeButtons").style.display = "none";
};