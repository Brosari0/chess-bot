/*
*https://www.chess.com/clubs/forum/view/guide-unofficial-api-documentation
*https://www.chess.com/callback/member/stats/hikaru
*https://www.chess.com/news/view/published-data-api
*/
/* https://www.chess.com/news/view/published-data-api#pubapi-clients */

class PlayerChessDotCom {
    constructor() {
        this.player_id = null;
        this["@id"] = null;
        this.url = null;
        this.username = null;
        this.followers = null;
        this.country = null;
        this.last_online = null;
        this.joined = null;
        this.status = null;
        this.is_streamer = null;
        this.verified = null;
        this.archives = null;
    }
}

class GameChessDotCom {
    constructor() {
        this.meta = {
            pgn: null,
            time_control: null,
            end_time: null,
            rated: null,
            accuracies: null,
            tcn: null,
            uuid: null,
            initial_setup: null,
            fen: null,
            time_class: null,
            rules: null,
            white: null,
            black: null
        }
        this.id = null;
        this.archive = null;
        this.Event = null;
        this.Site = null;
        this.Date = null;
        this.Round = null;
        this.White = null;
        this.Black = null;
        this.Result = null;
        this.CurrentPosition = null;
        this.Timezone = null;
        this.ECO = null;
        this.ECOUrl = null;
        this.UTCDate = null;
        this.UTCTime = null;
        this.WhiteElo = null;
        this.BlackElo = null;
        this.TimeControl = null;
        this.Termination = null;
        this.StartTime = null;
        this.EndDate = null;
        this.EndTime = null;
        this.moves = null;
    }
}

export class PlayerChessDotComFactory {
    constructor(username) {
        this.username = username;
        this.player = null;
    }
    async create() {
        this.player = new PlayerChessDotCom();
        const url = `https://api.chess.com/pub/player/${this.username}`;
        const data = await fetch(url).then(r => r.json());
        for (const [key, value] of Object.entries(data)) {
            this.player[key] = value
        }
    }

    async loadArchives() {
        const url = `https://api.chess.com/pub/player/${this.username}/games/archives`;
        const response = await fetch(url).then(r => r.json());

        const archives = [];
        response.archives.forEach(url => {
            const data = url.split("/");
            archives.push({
                index: archives.length,
                games: null,
                month: +data.pop(),
                year: +data.pop(),
                url
            })
        });
        this.player.archives = archives;
    }

    async loadGamesFromArchive(month, year) {
        const archives = this.player.archives.filter(item => item.month === month && item.year === year);
        if (archives.length !== 1) return;
        await loadArchiveGames(archives);
    }

    async loadGamesFromArchivesDates(month, year) {

    }
}

async function loadArchiveGames(archives) {
    const results = await Promise.all(archives.map((archive) => fetch(archive.url).then((r) => r.json())));
    for (let i = 0; i < results.length; i++) {

        const gameResponse = results[i];
        const games = [];
        gameResponse.games.forEach(chessDotComGameResponse => {
            const game = createGameChessDotCom(chessDotComGameResponse, archives[i].url);
            games.push(game);
        });
        archives[i].games = games;
    }
}

function createGameChessDotCom(chessDotComGameResponse, archiveUrl) {
    const game = new GameChessDotCom();
    game.archive = archiveUrl;

    assignMeta();
    const lines = chessDotComGameResponse.pgn.split(`\n`);

    for (let i = 0; i < 21; i++) {
        const line = lines[i];
        const data = parseLine(line);
        game[data.key] = data.value;
    }

    game.moves = getGameMoves(lines[22]);
    game.id = getChessDotComIDFromUrl(game.Link);

    return game;
    function parseLine(line) {
        const data = line.substring(line.indexOf("[") + 1, line.indexOf("]"));
        return { key: data.substr(0, data.indexOf(" ")), value: data.substr(data.indexOf(" ") + 2).slice(0, -1) }
    }

    function assignMeta() {
        for (const [key, value] of Object.entries(chessDotComGameResponse)) {
            if (key != "pgn")
                game.meta[key] = value;
        }
    }
}

function getGameMoves(pgnLine22) {

    const results = pgnLine22.split(`}`);

    for (let i = 0; i < results.length - 1; i++) {
        if (results[i].indexOf(']') > 0)
            results[i] = rowData(results[i], i);
    }

    return results

    function rowData(item, index) {
        const data = item.split(" ");
        const number = index === 0 ? data[0] : data[1];
        const move = index === 0 ? data[1] : data[2];
        const time = index === 0 ? data[3].slice(0, -1) : data[4].slice(0, -1);
        const color = index % 2 === 0 ? "White" : "Black";
        return { number, move, time }
    }

}

export function getChessDotComIDFromUrl(url) {
    let m = null;
    try {
        m = url.match(/(\d+)(?=\?)|(\d+)/);
        return m[0];
    } catch (error) {
        console.log(error, url)
    }
}


export async function testPlayerChessDotComFactory() {
    const factory = new PlayerChessDotComFactory('tinzina');
    await factory.create();
    await factory.loadArchives();
    await factory.loadGamesFromArchive(11, 2022);
    await factory.loadGamesFromArchive(12, 2022);
    await factory.loadGamesFromArchive(1, 2023);
    return factory.player;
}

export async function getTestPlayer() {
    const url = `js/mock data/player.json`;
    const player = await fetch(url).then((r) => r.json());
    return player;
}

export function getPlayerGamesChessDotCom(player) {
    let games = [];
    player.archives.forEach(archive => {
        if (archive.games)
            games = [...games, ...archive.games];
    });
    return games;
}