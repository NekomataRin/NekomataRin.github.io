const escapeRegex = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const paraStyle = (pID, strList) => {
    const p = document.getElementById(pID);
    let text = p.textContent;

    strList.forEach(a => {
        const regex = new RegExp("\\b" + escapeRegex(a.txt) + "\\b", "gi")
        //console.log(regex)
        text = text.replace(regex, `<span class="${a.color} txt-bold">${a.txt}</span>`)
    })

    p.innerHTML = text;
}

const mediaPut = (pID, ctxList) => {
    const p = document.getElementById(pID)

    let text = ''
    ctxList.forEach((item, index) => {
        text += `
        <a href="${item.url}" target="_blank" class="media-link">
            <img src="${item.icon}" alt="${item.text} icon">
            ${item.text}
        </a>`;

        if (index < ctxList.length - 1) {
            text += `<span class="separator">|</span>`;
        }
    })

    p.innerHTML = text
}