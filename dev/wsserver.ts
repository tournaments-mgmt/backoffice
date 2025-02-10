import { WebSocketServer } from "ws";
import {
  fifaBackgroundImage,
  fifaLogoImage,
  fortniteBackground,
  fortniteLogoImage,
  platformImage,
} from "./images";
import { randomFillSync } from "crypto";
import * as util from "util";
import videojs from "video.js";
import options = videojs.options;

const randomHexColorCode = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

function randomInt(max: number) {
  return Math.floor(Math.random() * (max + 1)); // The maximum is inclusive and the minimum is inclusive
}

function generateEntrant(count: number) {
  const entrants = [];
  for (let i = 0; i < count; i++) {
    entrants.push({
      name: (Math.random() + 1).toString(36).substring(7),
      color: randomHexColorCode(),
      type: "player",
    });
  }
  return entrants;
}

function generateTeams(count: number) {
  const entrants = [];
  for (let i = 0; i < count; i++) {
    entrants.push({
      name: (Math.random() + 1).toString(36).substring(7),
      color: randomHexColorCode(),
      type: "team",
      entrants: generateEntrant(2),
    });
  }
  return entrants;
}

function generateFortniteMatches(
  count: number,
  opt: { status?: string; attempts?: number } = { status: "done", attempts: 1 }
) {
  const matches = [];
  for (let i = 0; i < count; i++) {
    const attempts = Array(opt.attempts).fill([randomInt(20), randomInt(100)]);
    matches.push({
      entrants: generateEntrant(1),
      scores: [attempts],
      scoresLabels: ["Kill", "Pos"],
      scoresCount: 2,
      bestScores: [],
      attempts: opt.attempts,
      scoreBoolean: false,
      status: opt.status,
      scheduledStartTime: new Date().getTime(),
      realStartTime: new Date().getTime() + 10000,
      scheduledEndTime: new Date().getTime() + 20000,
      realEndTime: new Date().getTime() + 30000,
    });
  }
  return matches;
}

const fortnite_matches = generateFortniteMatches(100, {
  status: "done",
  attempts: 1,
});
const fortnite_tournament_matches = {
  type: "pane",
  data: {
    type: "tournament_single_matches",
    duration: 20000,
    params: {
      name: "Fortnite Giocomix",
      matches: fortnite_matches,
      backgroundImage: fortniteBackground,
      platformImage: platformImage,
      gameLogoImage: fortniteLogoImage,
      resultsLabels: ["Pos", "Kill"],
      itemsPerColumn: 16,
      columnPerView: 3,
      singleEntrant: true,
    },
  },
};

function generateFifaMatches(
  count: number,
  opt: { status?: string; bestOf?: number } = { status: "done", bestOf: 1 }
) {
  const matches = [];
  for (let i = 0; i < count; i++) {
    matches.push({
      entrants: generateEntrant(2),
      scores: [
        Array(opt.bestOf).fill([randomInt(5)]),
        Array(opt.bestOf).fill([randomInt(5)]),
      ],
      scoresLabels: [],
      scoresCount: 1,
      entrantCount: 2,
      bestScores: [],
      scoreBoolean: false,
      status: opt.status,
      scheduledStartTime: new Date().getTime(),
      realStartTime: new Date().getTime() + 10000,
      scheduledEndTime: new Date().getTime() + 20000,
      realEndTime: new Date().getTime() + 30000,
      winner: randomInt(1),
    });
  }
  return matches;
}

function generateFifaBracketMatches(
  phase: number,
  scoreBoolean: boolean = false
) {
  return generateFifaMatches(phase).map((m) => ({
    ...m,
    ...{ phase: phase, step: Math.log2(phase) },
  }));
}

function generateLoLMatches(
  count: number,
  opt: { status?: string; bestOf?: number, scoreBoolean?: boolean } = { status: "done", bestOf: 1, scoreBoolean: true}
) {
  const matches = [];
  for (let i = 0; i < count; i++) {
    matches.push({
      entrants: generateEntrant(2),
      scores: [
        Array(opt.bestOf).fill([randomInt(2), randomInt(2), randomInt(2)]),
        Array(opt.bestOf).fill([randomInt(2), randomInt(2), randomInt(2)]),
      ],
      scoresLabels: ["Tow", "CS", "Kill"],
      showScoresLabels: true,
      scoresCount: 3,
      bestOf: opt.bestOf,
      entrantCount: 2,
      bestScores: [],
      scoreBoolean: opt.scoreBoolean,
      status: opt.status,
      scheduledStartTime: new Date().getTime(),
      realStartTime: new Date().getTime() + 10000,
      scheduledEndTime: new Date().getTime() + 20000,
      realEndTime: new Date().getTime() + 30000,
      winner: randomInt(1),
    });
  }
  return matches;
}

function generateLoLBracketMatches(
  phase: number,
  opt: {scoreBoolean?: boolean, bestOf?: number, status: string} = {scoreBoolean: true, bestOf: 1, status: "done"}
) {
  return generateLoLMatches(phase, opt).map((m) => ({
    ...m,
    ...{ phase: phase, step: Math.log2(phase) },
  }));
}

function generateTekkenMatches(
  count: number,
  opt: { status?: string; bestOf?: number } = { status: "done", bestOf: 3 }
) {
  const matches = [];
  for (let i = 0; i < count; i++) {
    const entrantAResults = [
      [!!randomInt(1)],
      [!!randomInt(1)],
      [!!randomInt(1)],
    ];
    const entrantBResults = [
      [!entrantAResults[0][0]],
      [!entrantAResults[1][0]],
      [!entrantAResults[2][0]],
    ];
    matches.push({
      entrants: generateEntrant(2),
      scores: [entrantAResults, entrantBResults],
      scoresLabels: ["Win"],
      showScoresLabels: false,
      scoresCount: 1,
      entrantCount: 2,
      bestOf: opt.bestOf,
      bestScores: [],
      scoreBoolean: true,
      status: opt.status,
      scheduledStartTime: new Date().getTime(),
      realStartTime: new Date().getTime() + 10000,
      scheduledEndTime: new Date().getTime() + 20000,
      realEndTime: new Date().getTime() + 30000,
      winner: randomInt(1),
    });
  }
  return matches;
}

const fifa_matches = generateFifaMatches(25);

const fifa_tournament_matches = {
  type: "pane",
  data: {
    type: "tournament_single_matches",
    duration: 20000,
    params: {
      name: "Fortnite Giocomix",
      matches: fifa_matches,
      backgroundImage: fifaBackgroundImage,
      platformImage: platformImage,
      gameLogoImage: fifaLogoImage,
      itemsPerColumn: 16,
      columnPerView: 3,
      singleEntrant: false,
    },
  },
};

const ROUNDS = 5;
const fifa_brackets_matches = [];
for (let r = ROUNDS - 1; r >= 0; r--) {
  fifa_brackets_matches.push(...generateFifaBracketMatches(Math.pow(2, r)));
}
fifa_brackets_matches.push(...generateFifaBracketMatches(1));

const fifa_tournament_brackets_matches = {
  type: "pane",
  data: {
    type: "tournament_brackets",
    duration: 20000,
    params: {
      name: "Fifa Giocomix",
      matches: fifa_brackets_matches,
      backgroundImage: fifaBackgroundImage,
      platformImage: platformImage,
      gameLogoImage: fifaLogoImage,
      round: ROUNDS - 1,
    },
  },
};

const lol_matches = generateLoLMatches(25, { status: "done" });

const lol_tournament_matches = {
  type: "pane",
  data: {
    type: "tournament_best_of_matches",
    duration: 20000,
    params: {
      name: "LoL Giocomix",
      matches: lol_matches,
      backgroundImage: fifaBackgroundImage,
      platformImage: platformImage,
      gameLogoImage: fifaLogoImage,
      itemsPerColumn: 10,
      columnPerView: 3,
      singleEntrant: false,
    },
  },
};

const lol_brackets_matches = [];
for (let r = ROUNDS - 1; r >= 0; r--) {
  lol_brackets_matches.push(...generateLoLBracketMatches(Math.pow(2, r)));
}
lol_brackets_matches.push(...generateLoLBracketMatches(1, { bestOf: 3, scoreBoolean: true, status: "done" }));

const lol_tournament_brackets_matches = {
  type: "pane",
  data: {
    type: "tournament_brackets",
    duration: 20000,
    params: {
      name: "LoL Giocomix",
      matches: lol_brackets_matches,
      backgroundImage: fortniteBackground,
      platformImage: platformImage,
      gameLogoImage: fortniteLogoImage,
      round: ROUNDS - 1,
    },
  },
};

const fortnite_classification = generateEntrant(10).map((e, index) => {
  return {
    ...e,
    ...{
      results: [randomInt(10), randomInt(100), randomInt(150)],
      position: index + 1,
    },
  };
});

const fortnite_tournament_classification = {
  type: "pane",
  data: {
    type: "tournament_classification",
    duration: 20000,
    params: {
      name: "Fortnite Giocomix Classification",
      entrants: fortnite_classification,
      resultsLabels: ["Kill", "Pos", "Pts"],
      backgroundImage: fortniteBackground,
      platformImage: platformImage,
      gameLogoImage: fortniteLogoImage,
    },
  },
};

const tekken_matches = generateTekkenMatches(10);

const tekken_tournament_matches = {
  type: "pane",
  data: {
    type: "tournament_best_of_matches",
    duration: 20000,
    params: {
      name: "Tekken Giocomix",
      matches: tekken_matches,
      backgroundImage: fifaBackgroundImage,
      platformImage: platformImage,
      gameLogoImage: fifaLogoImage,
      itemsPerColumn: 16,
      columnPerView: 4,
      singleEntrant: false,
    },
  },
};
console.log(
  "lol_tournament_matches",
  util.inspect(lol_tournament_matches, false, null, true)
);

const mixed_matches = [
  {
    entrants: [],
    scores: [],
    scoresLabels: [],
    scoresCount: 1,
    entrantCount: 2,
    bestScores: [],
    scoreBoolean: false,
    status: "canceled",
    scheduledStartTime: new Date().getTime(),
    realStartTime: new Date().getTime() + 10000,
    scheduledEndTime: new Date().getTime() + 20000,
    realEndTime: new Date().getTime() + 30000,
  },
];

const mixed_tournament_matches = {
  type: "pane",
  data: {
    type: "tournament_single_matches",
    duration: 20000,
    params: {
      name: "Mixed Matches",
      matches: mixed_matches,
      backgroundImage: fifaBackgroundImage,
      platformImage: platformImage,
      gameLogoImage: fifaLogoImage,
      itemsPerColumn: 16,
      columnPerView: 3,
      singleEntrant: false,
    },
  },
};

const entrant_list = generateEntrant(100).map((e) => {
  return { ...e, ...{ available: !!randomInt(1) } };
});

const entrant_list_tournament = {
  type: "pane",
  data: {
    type: "tournament_entrants_list",
    duration: 20000,
    params: {
      name: "Fifa Giocomix",
      entrants: entrant_list,
      backgroundImage: fortniteBackground,
      platformImage: platformImage,
      gameLogoImage: fortniteLogoImage,
      itemsPerColumn: 16,
      columnPerView: 4,
    },
  },
};

const showCaseConfigs: any[] = [
  // tekken_tournament_matches,
  // fortnite_tournament_matches,
  // fortnite_tournament_classification,
  // fifa_tournament_matches,
  // fifa_tournament_brackets_matches,
  // lol_tournament_matches,
  lol_tournament_brackets_matches,
  // mixed_tournament_matches,
  // entrant_list_tournament
];

const wss = new WebSocketServer({
  port: 8000,
});

wss.on("connection", (ws) => {
  console.info(`Client connected`);
  let index = 0;
  ws.send(JSON.stringify(showCaseConfigs[index % showCaseConfigs.length]));
  setInterval(() => {
    ws.send(JSON.stringify(showCaseConfigs[index % showCaseConfigs.length]));
    index++;
  }, 5000);
  ws.on("disconnect", () => {
    console.info(`Client gone`);
  });
});
