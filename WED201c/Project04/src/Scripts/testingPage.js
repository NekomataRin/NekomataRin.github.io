const MapIDList = {
    RO16: {
        NM: [2527582, 3606457, 1897317],
        HD: [1169774, 1926301],
        HR: [462736, 4587414],
        DT: [3665005, 49101, 646713],
        TB: [2533715]
    }
};

const ModValues = {
    NM: 0,
    HD: 8,
    HR: 16,
    DT: 64,
    TB: [0, 16],
    FM: [0, 16]
};


const GetSong = async (map_id = Number, mod_value = Number) => {
    const MapData = await fetch(`https://osu.direct/api/v2/b/${map_id}`).then(a => a.json());

    const MapSetID = MapData.beatmapset_id;
    const SongData = await fetch(`https://osu.direct/api/v2/s/${MapSetID}`).then(a => a.json());

    const SRCalcURL = (mod_value > 0) ? `https://osu.direct/api/pp/${map_id}?mods=${mod_value}` : `https://osu.direct/api/pp/${map_id}`
    const SRCalc = await fetch(SRCalcURL).then(a => a.json());
    if ([429, 404].includes(SRCalc.code || MapData.code || SongData.code)) return { Checked: false };

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
    };
    return obj;
};



const run = async () => {
    const PreviewList = MapIDList.RO16
    const MapArray = [];
    let mapsProcessed = 0;
    
    for (const modKey in PreviewList) {
        const mapIDs = PreviewList[modKey];
        const modSetting = ModValues[modKey];
        const isDualMod = Array.isArray(modSetting);
        
        for (let i = 0; i < mapIDs.length; i++) {
            const mapId = mapIDs[i];
            const mapIndex = i + 1;
            
            let mapData = null;
            let srValues = [];

            if (isDualMod) {
                const [resultNM, resultHR] = await Promise.all([
                    GetSong(mapId, modSetting[0]),
                    GetSong(mapId, modSetting[1])
                ]);

                if (resultNM.Checked && resultHR.Checked) {
                    mapData = resultNM;
                    srValues = [resultNM.StarRating, resultHR.StarRating];
                }
            } else {
                const result = await GetSong(mapId, modSetting);
                if (result.Checked) {
                    mapData = result;
                    srValues = result.StarRating;
                }
            }

            if (mapData) {
                mapsProcessed++;
                
                let modDisplayString = modKey;
                if (modKey !== 'TB') {
                    modDisplayString += mapIndex;
                }
                
                mapData.modDisplay = modDisplayString;
                mapData.modKey = modKey;
                mapData.isDualSR = isDualMod;
                mapData.StarRating = srValues; 
                MapArray.push(mapData);
            }
        }
    };
    
    let str = `<tr><th>Mods</th><th>Background</th><th>Map Name</th><th>Star Rating</th></tr>`;
    
    for (let i = 0; i < MapArray.length; i++) {
        const currentMap = MapArray[i];
        const colorKey = currentMap.modKey; 
        
        let rowClass = currentMap.isDualSR ? " dual-sr" : "";
        
        let srContent = ``;
        if (currentMap.isDualSR) {
            srContent = `<span class="sr-default"><b>${currentMap.StarRating[0]}</b></span><span class="sr-hover"><b>${currentMap.StarRating[1]}</b></span>`;
        } else {
            srContent = `<b>${currentMap.StarRating}</b>`;
        }
        
        str += `<tr class="map-row${rowClass}">
                    <td class="center color-${colorKey}"><b>${currentMap.modDisplay}</b></td>
                    <td class="image"><img src="${currentMap.Background}" alt="${currentMap.MapID}l.png" width="200" height="100"></td>
                    <td><a href="${currentMap.MapURL}">${currentMap.Artist} - ${currentMap.MapName}</a></td>
                    <td class="center sr-cell">${srContent}</td>
                </tr>`;
    }
    
    if (mapsProcessed === MapArray.length) {
        document.getElementById("PoolTable").innerHTML = str;
    } else {
         document.getElementById("PoolTable").innerHTML = `<p> An error occurred during map display. </p>`;
    }
};


async function Click() {
    const value = "RO16";
    if (value) await run();
}