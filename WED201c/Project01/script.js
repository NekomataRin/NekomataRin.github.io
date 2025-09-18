const MapIDList = {
    Qualifier: {
        NM: [2141415, 4098609, 2855075],
        HD: [784368, 2417422, 1883834],
        HR: [1850085, 3216883, 4113664],
        DT: [2481649, 1009022, 3799726]
    }
};

const ModValues = {
    NM: 0,
    HD: 8,
    HR: 16,
    DT: 64
};


const GetSong = async (map_id = Number, mod_value = Number) => {
    const MapData = await fetch(`https://osu.direct/api/v2/b/${map_id}`).then(a => a.json());

    const MapSetID = MapData.beatmapset_id;
    const SongData = await fetch(`https://osu.direct/api/v2/s/${MapSetID}`).then(a => a.json());

    const SRCalcURL = (mod_value > 0) ? `https://osu.direct/api/pp/${map_id}?mods=${mod_value}` : `https://osu.direct/api/pp/${map_id}`
    const SRCalc = await fetch(SRCalcURL).then(a => a.json());
    if ([429, 404].includes(SRCalc.code || MapData.code || SongData.code)) return { Checked: false };

    console.log(SRCalc.difficulty.stars);
    const SR = SRCalc.difficulty.stars.toFixed(2);

    const BackgroundURL = `https://b.ppy.sh/thumb/${MapSetID}l.jpg`;
    const obj = {
        Background: BackgroundURL,
        MapURL: MapData.url,
        MapID: MapData.id,
        MapName: `${SongData.title} [${MapData.version}]`,
        Artist: SongData.artist,
        StarRating: SR,
        Checked: true
    }
    console.log(obj.Background)
    return obj
};



const run = async () => {
    let index = 0;
    let total_maps = 0;
    const PreviewList = MapIDList.Qualifier
    const Array = [];
    const Keys = Object.keys(PreviewList)
    for (var i in Keys) {
        for (var j in PreviewList[Keys[i]]) {
            total_maps++;
            Array.push([Keys[i], PreviewList[Keys[i]][j], Number(j) + 1])
        }
    };

    let str = `<tr><th>Mods</th><th>Background</th><th>Map Name</th><th>Star Rating</th></tr>`;
    let cycle = 1;
    while (index < total_maps) {
        cycle += 3;
        const a = await GetSong(Array[index][1], ModValues[Array[index][0]]);
        const str2 = Array[index][0] + Array[index][2];
        setTimeout(function () { }, 1000)
        console.log(a)
        if (a.Checked) index++;
        str += `<tr><td class="center"><b>${str2}</b></td><td class="image"><img src="${a.Background}" alt="${a.MapID}l.png" width="200" height="100"></td><td><a = href="${a.MapURL}">${a.Artist} - ${a.MapName}</a></td><td class="center"><b>${a.StarRating}</b></td></tr>`;
        if (cycle > 1000) {
            document.getElementById("PoolTable").innerHTML = `<p> Cannot fetch the API at this moment due to the rate limiting, please try again later. </p>`;
            break;
        }
    }
    if (index === total_maps) return document.getElementById("PoolTable").innerHTML = str;
}


async function Click() {
    const value = "Qualifier";
    if (value) await run();
}

