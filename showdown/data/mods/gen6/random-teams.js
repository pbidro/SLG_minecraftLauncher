"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var random_teams_exports = {};
__export(random_teams_exports, {
  RandomGen6Teams: () => RandomGen6Teams,
  default: () => random_teams_default
});
module.exports = __toCommonJS(random_teams_exports);
var import_random_teams2 = __toESM(require("../gen7/random-teams"));
var import_lib = require("../../../lib");
var import_dex = require("../../../sim/dex");
const RECOVERY_MOVES = [
  "healorder",
  "milkdrink",
  "moonlight",
  "morningsun",
  "recover",
  "roost",
  "slackoff",
  "softboiled",
  "synthesis"
];
const PHYSICAL_SETUP = [
  "bellydrum",
  "bulkup",
  "coil",
  "curse",
  "dragondance",
  "honeclaws",
  "howl",
  "meditate",
  "poweruppunch",
  "screech",
  "swordsdance"
];
const SPECIAL_SETUP = [
  "calmmind",
  "chargebeam",
  "geomancy",
  "nastyplot",
  "quiverdance",
  "tailglow"
];
const SPEED_SETUP = [
  "agility",
  "autotomize",
  "flamecharge",
  "rockpolish"
];
const SETUP = [
  "acidarmor",
  "agility",
  "autotomize",
  "bellydrum",
  "bulkup",
  "calmmind",
  "coil",
  "curse",
  "dragondance",
  "flamecharge",
  "focusenergy",
  "geomancy",
  "growth",
  "honeclaws",
  "howl",
  "irondefense",
  "meditate",
  "nastyplot",
  "poweruppunch",
  "quiverdance",
  "raindance",
  "rockpolish",
  "shellsmash",
  "shiftgear",
  "swordsdance",
  "tailglow",
  "workup"
];
const NO_STAB = [
  "aquajet",
  "bulletpunch",
  "clearsmog",
  "dragontail",
  "eruption",
  "explosion",
  "fakeout",
  "flamecharge",
  "futuresight",
  "iceshard",
  "icywind",
  "incinerate",
  "machpunch",
  "nuzzle",
  "pluck",
  "poweruppunch",
  "pursuit",
  "quickattack",
  "rapidspin",
  "reversal",
  "selfdestruct",
  "shadowsneak",
  "skyattack",
  "skydrop",
  "snarl",
  "suckerpunch",
  "uturn",
  "watershuriken",
  "vacuumwave",
  "voltswitch",
  "waterspout"
];
const HAZARDS = [
  "spikes",
  "stealthrock",
  "stickyweb",
  "toxicspikes"
];
const PROTECT_MOVES = [
  "kingsshield",
  "protect",
  "spikyshield"
];
const PIVOT_MOVES = [
  "partingshot",
  "uturn",
  "voltswitch"
];
const MOVE_PAIRS = [
  ["lightscreen", "reflect"],
  ["sleeptalk", "rest"],
  ["protect", "wish"],
  ["spikyshield", "wish"],
  ["leechseed", "substitute"],
  ["perishsong", "protect"],
  ["solarbeam", "sunnyday"]
];
const PRIORITY_POKEMON = [
  "aegislashblade",
  "banette",
  "breloom",
  "cacturne",
  "doublade",
  "dusknoir",
  "honchkrow",
  "scizor",
  "scizormega",
  "shedinja"
];
class RandomGen6Teams extends import_random_teams2.default {
  constructor(format, prng) {
    super(format, prng);
    this.randomSets = require("./random-sets.json");
    this.randomFactorySets = require("./factory-sets.json");
    this.noStab = NO_STAB;
    this.priorityPokemon = PRIORITY_POKEMON;
    this.moveEnforcementCheckers = {
      Bug: (movePool, moves, abilities, types, counter) => ["megahorn", "pinmissile"].some((m) => movePool.includes(m)) || !counter.get("Bug") && abilities.has("Tinted Lens"),
      Dark: (movePool, moves, abilities, types, counter) => !counter.get("Dark"),
      Dragon: (movePool, moves, abilities, types, counter) => !counter.get("Dragon"),
      Electric: (movePool, moves, abilities, types, counter) => !counter.get("Electric"),
      Fairy: (movePool, moves, abilities, types, counter) => !counter.get("Fairy"),
      Fighting: (movePool, moves, abilities, types, counter) => !counter.get("Fighting"),
      Fire: (movePool, moves, abilities, types, counter) => !counter.get("Fire"),
      Flying: (movePool, moves, abilities, types, counter, species) => !counter.get("Flying") && !["aerodactylmega", "charizardmegay", "mantine", "murkrow"].includes(species.id) && !movePool.includes("hiddenpowerflying"),
      Ghost: (movePool, moves, abilities, types, counter) => !counter.get("Ghost"),
      Grass: (movePool, moves, abilities, types, counter, species) => !counter.get("Grass") && (species.baseStats.atk >= 100 || movePool.includes("leafstorm")),
      Ground: (movePool, moves, abilities, types, counter) => !counter.get("Ground"),
      Ice: (movePool, moves, abilities, types, counter) => !counter.get("Ice") || movePool.includes("blizzard") || abilities.has("Refrigerate") && (movePool.includes("return") || movePool.includes("hypervoice")),
      Normal: (movePool) => movePool.includes("boomburst"),
      Poison: (movePool, moves, abilities, types, counter) => !counter.get("Poison"),
      Psychic: (movePool, moves, abilities, types, counter) => !counter.get("Psychic") && (types.has("Fighting") || movePool.includes("calmmind")),
      Rock: (movePool, moves, abilities, types, counter, species) => !counter.get("Rock") && (species.baseStats.atk >= 95 || abilities.has("Rock Head")),
      Steel: (movePool, moves, abilities, types, counter, species) => !counter.get("Steel") && species.baseStats.atk >= 100,
      Water: (movePool, moves, abilities, types, counter) => !counter.get("Water")
    };
  }
  cullMovePool(types, moves, abilities, counter, movePool, teamDetails, species, isLead, isDoubles, preferredType, role) {
    let hasHiddenPower = false;
    for (const move of moves) {
      if (move.startsWith("hiddenpower"))
        hasHiddenPower = true;
    }
    if (hasHiddenPower) {
      let movePoolHasHiddenPower = true;
      while (movePoolHasHiddenPower) {
        movePoolHasHiddenPower = false;
        for (const moveid of movePool) {
          if (moveid.startsWith("hiddenpower")) {
            this.fastPop(movePool, movePool.indexOf(moveid));
            movePoolHasHiddenPower = true;
            break;
          }
        }
      }
    }
    if (moves.size + movePool.length <= this.maxMoveCount)
      return;
    if (moves.size === this.maxMoveCount - 2) {
      const unpairedMoves = [...movePool];
      for (const pair of MOVE_PAIRS) {
        if (movePool.includes(pair[0]) && movePool.includes(pair[1])) {
          this.fastPop(unpairedMoves, unpairedMoves.indexOf(pair[0]));
          this.fastPop(unpairedMoves, unpairedMoves.indexOf(pair[1]));
        }
      }
      if (unpairedMoves.length === 1) {
        this.fastPop(movePool, movePool.indexOf(unpairedMoves[0]));
      }
    }
    if (moves.size === this.maxMoveCount - 1) {
      for (const pair of MOVE_PAIRS) {
        if (movePool.includes(pair[0]) && movePool.includes(pair[1])) {
          this.fastPop(movePool, movePool.indexOf(pair[0]));
          this.fastPop(movePool, movePool.indexOf(pair[1]));
        }
      }
    }
    if (teamDetails.screens && movePool.length >= this.maxMoveCount + 2) {
      if (movePool.includes("reflect"))
        this.fastPop(movePool, movePool.indexOf("reflect"));
      if (movePool.includes("lightscreen"))
        this.fastPop(movePool, movePool.indexOf("lightscreen"));
      if (moves.size + movePool.length <= this.maxMoveCount)
        return;
    }
    if (teamDetails.stickyWeb) {
      if (movePool.includes("stickyweb"))
        this.fastPop(movePool, movePool.indexOf("stickyweb"));
      if (moves.size + movePool.length <= this.maxMoveCount)
        return;
    }
    if (teamDetails.stealthRock) {
      if (movePool.includes("stealthrock"))
        this.fastPop(movePool, movePool.indexOf("stealthrock"));
      if (moves.size + movePool.length <= this.maxMoveCount)
        return;
    }
    if (teamDetails.defog || teamDetails.rapidSpin) {
      if (movePool.includes("defog"))
        this.fastPop(movePool, movePool.indexOf("defog"));
      if (movePool.includes("rapidspin"))
        this.fastPop(movePool, movePool.indexOf("rapidspin"));
      if (moves.size + movePool.length <= this.maxMoveCount)
        return;
    }
    if (teamDetails.toxicSpikes) {
      if (movePool.includes("toxicspikes"))
        this.fastPop(movePool, movePool.indexOf("toxicspikes"));
      if (moves.size + movePool.length <= this.maxMoveCount)
        return;
    }
    if (teamDetails.spikes && teamDetails.spikes >= 2) {
      if (movePool.includes("spikes"))
        this.fastPop(movePool, movePool.indexOf("spikes"));
      if (moves.size + movePool.length <= this.maxMoveCount)
        return;
    }
    const badWithSetup = ["defog", "dragontail", "haze", "healbell", "nuzzle", "pursuit", "rapidspin", "toxic"];
    const statusMoves = this.dex.moves.all().filter((move) => move.category === "Status").map((move) => move.id);
    const incompatiblePairs = [
      // These moves don't mesh well with other aspects of the set
      [statusMoves, ["healingwish", "memento", "switcheroo", "trick"]],
      [SETUP, PIVOT_MOVES],
      [SETUP, HAZARDS],
      [SETUP, badWithSetup],
      [PHYSICAL_SETUP, PHYSICAL_SETUP],
      [SPEED_SETUP, ["quickattack", "suckerpunch"]],
      ["defog", HAZARDS],
      [["fakeout", "uturn"], ["switcheroo", "trick"]],
      ["substitute", PIVOT_MOVES],
      ["leechseed", "dragontail"],
      ["rest", "substitute"],
      [PHYSICAL_SETUP, "dracometeor"],
      [SPECIAL_SETUP, "knockoff"],
      // These attacks are redundant with each other
      ["psychic", "psyshock"],
      ["scald", ["hydropump", "originpulse", "waterpulse"]],
      ["return", ["bodyslam", "doubleedge"]],
      [["fierydance", "lavaplume"], ["fireblast", "magmastorm"]],
      [["flamethrower", "flareblitz"], ["fireblast", "overheat"]],
      ["hornleech", "woodhammer"],
      [["gigadrain", "leafstorm"], ["leafstorm", "petaldance", "powerwhip"]],
      ["wildcharge", "thunderbolt"],
      ["gunkshot", "poisonjab"],
      [["drainpunch", "focusblast"], ["closecombat", "highjumpkick", "superpower"]],
      ["stoneedge", "headsmash"],
      ["dracometeor", "dragonpulse"],
      ["dragonclaw", "outrage"],
      ["knockoff", ["darkpulse", "foulplay"]],
      // Status move incompatibilities
      ["toxic", "toxicspikes"],
      ["taunt", "disable"],
      ["defog", ["leechseed", "substitute"]],
      // Assorted hardcodes go here:
      // Lunatone
      ["moonlight", "rockpolish"],
      // Smeargle
      ["destinybond", "whirlwind"],
      // Liepard
      ["copycat", "uturn"],
      // Seviper
      ["switcheroo", "suckerpunch"],
      // Jirachi
      ["bodyslam", "healingwish"]
    ];
    for (const pair of incompatiblePairs)
      this.incompatibleMoves(moves, movePool, pair[0], pair[1]);
    if (!types.includes("Dark") && preferredType !== "Dark") {
      this.incompatibleMoves(moves, movePool, "knockoff", ["pursuit", "suckerpunch"]);
    }
    const statusInflictingMoves = ["thunderwave", "toxic", "willowisp", "yawn"];
    if (!abilities.has("Prankster")) {
      this.incompatibleMoves(moves, movePool, statusInflictingMoves, statusInflictingMoves);
    }
    if (species.id === "beedrillmega") {
      this.incompatibleMoves(moves, movePool, "drillrun", "knockoff");
    }
  }
  // Generate random moveset for a given species, role, preferred type.
  randomMoveset(types, abilities, teamDetails, species, isLead, isDoubles, movePool, preferredType, role) {
    const moves = /* @__PURE__ */ new Set();
    let counter = this.newQueryMoves(moves, species, preferredType, abilities);
    this.cullMovePool(
      types,
      moves,
      abilities,
      counter,
      movePool,
      teamDetails,
      species,
      isLead,
      isDoubles,
      preferredType,
      role
    );
    if (movePool.length <= this.maxMoveCount) {
      while (movePool.length) {
        const moveid = this.sample(movePool);
        counter = this.addMove(
          moveid,
          moves,
          types,
          abilities,
          teamDetails,
          species,
          isLead,
          isDoubles,
          movePool,
          preferredType,
          role
        );
      }
      return moves;
    }
    const runEnforcementChecker = (checkerName) => {
      if (!this.moveEnforcementCheckers[checkerName])
        return false;
      return this.moveEnforcementCheckers[checkerName](
        movePool,
        moves,
        abilities,
        new Set(types),
        counter,
        species,
        teamDetails
      );
    };
    if (species.requiredMove) {
      const move = this.dex.moves.get(species.requiredMove).id;
      counter = this.addMove(
        move,
        moves,
        types,
        abilities,
        teamDetails,
        species,
        isLead,
        isDoubles,
        movePool,
        preferredType,
        role
      );
    }
    if (movePool.includes("facade") && abilities.has("Guts")) {
      counter = this.addMove(
        "facade",
        moves,
        types,
        abilities,
        teamDetails,
        species,
        isLead,
        isDoubles,
        movePool,
        preferredType,
        role
      );
    }
    for (const moveid of ["seismictoss", "spore", "stickyweb"]) {
      if (movePool.includes(moveid)) {
        counter = this.addMove(
          moveid,
          moves,
          types,
          abilities,
          teamDetails,
          species,
          isLead,
          isDoubles,
          movePool,
          preferredType,
          role
        );
      }
    }
    if (movePool.includes("thunderwave") && abilities.has("Prankster")) {
      counter = this.addMove(
        "thunderwave",
        moves,
        types,
        abilities,
        teamDetails,
        species,
        isLead,
        isDoubles,
        movePool,
        preferredType,
        role
      );
    }
    if (movePool.includes("shadowsneak") && species.id === "kecleon") {
      counter = this.addMove(
        "shadowsneak",
        moves,
        types,
        abilities,
        teamDetails,
        species,
        isLead,
        isDoubles,
        movePool,
        preferredType,
        role
      );
    }
    if (role === "Bulky Support" && !teamDetails.defog && !teamDetails.rapidSpin) {
      if (movePool.includes("rapidspin")) {
        counter = this.addMove(
          "rapidspin",
          moves,
          types,
          abilities,
          teamDetails,
          species,
          isLead,
          isDoubles,
          movePool,
          preferredType,
          role
        );
      }
      if (movePool.includes("defog")) {
        counter = this.addMove(
          "defog",
          moves,
          types,
          abilities,
          teamDetails,
          species,
          isLead,
          isDoubles,
          movePool,
          preferredType,
          role
        );
      }
    }
    if (["Bulky Attacker", "Bulky Setup"].includes(role) || this.priorityPokemon.includes(species.id)) {
      const priorityMoves = [];
      for (const moveid of movePool) {
        const move = this.dex.moves.get(moveid);
        const moveType = this.getMoveType(move, species, abilities, preferredType);
        if (types.includes(moveType) && move.priority > 0 && (move.basePower || move.basePowerCallback)) {
          priorityMoves.push(moveid);
        }
      }
      if (priorityMoves.length) {
        const moveid = this.sample(priorityMoves);
        counter = this.addMove(
          moveid,
          moves,
          types,
          abilities,
          teamDetails,
          species,
          isLead,
          isDoubles,
          movePool,
          preferredType,
          role
        );
      }
    }
    for (const type of types) {
      const stabMoves = [];
      for (const moveid of movePool) {
        const move = this.dex.moves.get(moveid);
        const moveType = this.getMoveType(move, species, abilities, preferredType);
        if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && type === moveType) {
          stabMoves.push(moveid);
        }
      }
      while (runEnforcementChecker(type)) {
        if (!stabMoves.length)
          break;
        const moveid = this.sampleNoReplace(stabMoves);
        counter = this.addMove(
          moveid,
          moves,
          types,
          abilities,
          teamDetails,
          species,
          isLead,
          isDoubles,
          movePool,
          preferredType,
          role
        );
      }
    }
    if (!counter.get("preferred")) {
      const stabMoves = [];
      for (const moveid of movePool) {
        const move = this.dex.moves.get(moveid);
        const moveType = this.getMoveType(move, species, abilities, preferredType);
        if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && preferredType === moveType) {
          stabMoves.push(moveid);
        }
      }
      if (stabMoves.length) {
        const moveid = this.sample(stabMoves);
        counter = this.addMove(
          moveid,
          moves,
          types,
          abilities,
          teamDetails,
          species,
          isLead,
          isDoubles,
          movePool,
          preferredType,
          role
        );
      }
    }
    if (!counter.get("stab")) {
      const stabMoves = [];
      for (const moveid of movePool) {
        const move = this.dex.moves.get(moveid);
        const moveType = this.getMoveType(move, species, abilities, preferredType);
        if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && types.includes(moveType)) {
          stabMoves.push(moveid);
        }
      }
      if (stabMoves.length) {
        const moveid = this.sample(stabMoves);
        counter = this.addMove(
          moveid,
          moves,
          types,
          abilities,
          teamDetails,
          species,
          isLead,
          isDoubles,
          movePool,
          preferredType,
          role
        );
      } else {
        if (movePool.includes("uturn") && types.includes("Bug")) {
          counter = this.addMove(
            "uturn",
            moves,
            types,
            abilities,
            teamDetails,
            species,
            isLead,
            isDoubles,
            movePool,
            preferredType,
            role
          );
        }
      }
    }
    if (["Bulky Support", "Bulky Attacker", "Bulky Setup", "Staller"].includes(role)) {
      const recoveryMoves = movePool.filter((moveid) => RECOVERY_MOVES.includes(moveid));
      if (recoveryMoves.length) {
        const moveid = this.sample(recoveryMoves);
        counter = this.addMove(
          moveid,
          moves,
          types,
          abilities,
          teamDetails,
          species,
          isLead,
          isDoubles,
          movePool,
          preferredType,
          role
        );
      }
    }
    if (role === "Staller") {
      const enforcedMoves = [...PROTECT_MOVES, "toxic", "wish"];
      for (const move of enforcedMoves) {
        if (movePool.includes(move)) {
          counter = this.addMove(
            move,
            moves,
            types,
            abilities,
            teamDetails,
            species,
            isLead,
            isDoubles,
            movePool,
            preferredType,
            role
          );
        }
      }
    }
    if (role.includes("Setup")) {
      const setupMoves = movePool.filter((moveid) => SETUP.includes(moveid));
      if (setupMoves.length) {
        const moveid = this.sample(setupMoves);
        counter = this.addMove(
          moveid,
          moves,
          types,
          abilities,
          teamDetails,
          species,
          isLead,
          isDoubles,
          movePool,
          preferredType,
          role
        );
      }
    }
    if (!counter.damagingMoves.size && !(moves.has("uturn") && types.includes("Bug"))) {
      const attackingMoves = [];
      for (const moveid of movePool) {
        const move = this.dex.moves.get(moveid);
        if (!this.noStab.includes(moveid) && move.category !== "Status")
          attackingMoves.push(moveid);
      }
      if (attackingMoves.length) {
        const moveid = this.sample(attackingMoves);
        counter = this.addMove(
          moveid,
          moves,
          types,
          abilities,
          teamDetails,
          species,
          isLead,
          isDoubles,
          movePool,
          preferredType,
          role
        );
      }
    }
    if (["Fast Attacker", "Setup Sweeper", "Bulky Attacker", "Wallbreaker"].includes(role)) {
      if (counter.damagingMoves.size === 1) {
        const currentAttackType = counter.damagingMoves.values().next().value.type;
        const coverageMoves = [];
        for (const moveid of movePool) {
          const move = this.dex.moves.get(moveid);
          const moveType = this.getMoveType(move, species, abilities, preferredType);
          if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback)) {
            if (currentAttackType !== moveType)
              coverageMoves.push(moveid);
          }
        }
        if (coverageMoves.length) {
          const moveid = this.sample(coverageMoves);
          counter = this.addMove(
            moveid,
            moves,
            types,
            abilities,
            teamDetails,
            species,
            isLead,
            isDoubles,
            movePool,
            preferredType,
            role
          );
        }
      }
    }
    while (moves.size < this.maxMoveCount && movePool.length) {
      const moveid = this.sample(movePool);
      counter = this.addMove(
        moveid,
        moves,
        types,
        abilities,
        teamDetails,
        species,
        isLead,
        isDoubles,
        movePool,
        preferredType,
        role
      );
      for (const pair of MOVE_PAIRS) {
        if (moveid === pair[0] && movePool.includes(pair[1])) {
          counter = this.addMove(
            pair[1],
            moves,
            types,
            abilities,
            teamDetails,
            species,
            isLead,
            isDoubles,
            movePool,
            preferredType,
            role
          );
        }
        if (moveid === pair[1] && movePool.includes(pair[0])) {
          counter = this.addMove(
            pair[0],
            moves,
            types,
            abilities,
            teamDetails,
            species,
            isLead,
            isDoubles,
            movePool,
            preferredType,
            role
          );
        }
      }
    }
    return moves;
  }
  shouldCullAbility(ability, types, moves, abilities, counter, movePool, teamDetails, species, isDoubles, preferredType, role) {
    switch (ability) {
      case "Flare Boost":
      case "Gluttony":
      case "Harvest":
      case "Hyper Cutter":
      case "Ice Body":
      case "Magician":
      case "Moody":
      case "Pressure":
      case "Sand Veil":
      case "Snow Cloak":
      case "Steadfast":
        return true;
      case "Aerilate":
      case "Pixilate":
      case "Refrigerate":
        return ["doubleedge", "hypervoice", "return"].every((m) => !moves.has(m));
      case "Chlorophyll":
        return species.baseStats.spe > 100 || moves.has("petaldance") || !moves.has("sunnyday") && !teamDetails.sun;
      case "Competitive":
        return !counter.get("Special");
      case "Compound Eyes":
      case "No Guard":
        return !counter.get("inaccurate");
      case "Contrary":
      case "Skill Link":
      case "Strong Jaw":
        return !counter.get((0, import_dex.toID)(ability));
      case "Defiant":
      case "Justified":
      case "Moxie":
        return !counter.get("Physical");
      case "Guts":
        return !moves.has("facade") && !moves.has("sleeptalk");
      case "Hustle":
        return counter.get("Physical") < 2;
      case "Hydration":
      case "Rain Dish":
      case "Swift Swim":
        return species.baseStats.spe > 100 || !moves.has("raindance") && !teamDetails.rain || !moves.has("raindance") && ["Rock Head", "Water Absorb"].some((abil) => abilities.has(abil));
      case "Intimidate":
        return moves.has("bodyslam") || species.id === "staraptor";
      case "Iron Fist":
        return !counter.get((0, import_dex.toID)(ability)) || species.id === "golurk";
      case "Lightning Rod":
        return types.has("Ground") || (!!teamDetails.rain || moves.has("raindance")) && species.id === "seaking";
      case "Magic Guard":
      case "Speed Boost":
        return abilities.has("Tinted Lens") && role === "Wallbreaker";
      case "Mold Breaker":
        return species.baseSpecies === "Basculin" || species.id === "pangoro" || abilities.has("Sheer Force");
      case "Oblivious":
      case "Prankster":
        return !counter.get("Status");
      case "Overgrow":
        return !counter.get("Grass");
      case "Synchronize":
        return counter.get("Status") < 2 || !!counter.get("recoil") || !!species.isMega;
      case "Regenerator":
        return species.id === "mienshao" || species.id === "reuniclus";
      case "Reckless":
      case "Rock Head":
        return !counter.get("recoil") || !!species.isMega;
      case "Sand Force":
      case "Sand Rush":
        return !teamDetails.sand;
      case "Scrappy":
        return !types.has("Normal");
      case "Serene Grace":
        return !counter.get("serenegrace");
      case "Sheer Force":
        return !counter.get("sheerforce") || moves.has("doubleedge") || abilities.has("Guts") || !!species.isMega;
      case "Simple":
        return !counter.get("setup");
      case "Snow Warning":
        return moves.has("hypervoice");
      case "Solar Power":
        return !counter.get("Special") || !teamDetails.sun || !!species.isMega;
      case "Sturdy":
        return !!counter.get("recoil") && !counter.get("recovery") || species.id === "steelix" && !!counter.get("sheerforce");
      case "Swarm":
        return !counter.get("Bug") || !!species.isMega;
      case "Technician":
        return !counter.get("technician") || moves.has("tailslap") || !!species.isMega;
      case "Tinted Lens":
        return ["illumise", "sigilyph", "yanmega"].some((m) => species.id === m) && role !== "Wallbreaker";
      case "Torrent":
        return !counter.get("Water") || !!species.isMega;
      case "Unaware":
        return role !== "Bulky Support" && role !== "Staller";
      case "Unburden":
        return !!species.isMega || !counter.get("setup") && !moves.has("acrobatics");
      case "Water Absorb":
        return moves.has("raindance") || ["Drizzle", "Unaware", "Volt Absorb"].some((abil) => abilities.has(abil));
    }
    return false;
  }
  getAbility(types, moves, abilities, counter, movePool, teamDetails, species, isDoubles, preferredType, role) {
    if (species.battleOnly && !species.requiredAbility) {
      abilities = new Set(Object.values(this.dex.species.get(species.battleOnly).abilities));
    }
    const abilityData = Array.from(abilities).map((a) => this.dex.abilities.get(a));
    import_lib.Utils.sortBy(abilityData, (abil) => -abil.rating);
    if (abilityData.length <= 1)
      return abilityData[0].name;
    if (abilities.has("Guts") && !abilities.has("Quick Feet") && (moves.has("facade") || moves.has("sleeptalk") && moves.has("rest")))
      return "Guts";
    if (species.id === "starmie")
      return role === "Wallbreaker" ? "Analytic" : "Natural Cure";
    if (species.id === "ninetales")
      return "Drought";
    if (species.id === "ninjask" || species.id === "seviper")
      return "Infiltrator";
    if (species.id === "arcanine")
      return "Intimidate";
    if (species.id === "rampardos" && role === "Bulky Attacker")
      return "Mold Breaker";
    if (species.baseSpecies === "Altaria")
      return "Natural Cure";
    if (species.id === "ambipom" && !counter.get("technician"))
      return "Pickup";
    if (["dusknoir", "vespiquen", "wailord"].includes(species.id))
      return "Pressure";
    if (species.id === "druddigon" && role === "Bulky Support")
      return "Rough Skin";
    if (species.id === "stunfisk")
      return "Static";
    if (species.id === "breloom")
      return "Technician";
    if (species.id === "zangoose")
      return "Toxic Boost";
    if (species.id === "porygon2")
      return "Trace";
    if (abilities.has("Harvest") && (role === "Bulky Support" || role === "Staller"))
      return "Harvest";
    if (abilities.has("Moxie") && counter.get("Physical") > 3)
      return "Moxie";
    if (abilities.has("Regenerator") && role === "AV Pivot")
      return "Regenerator";
    if (abilities.has("Shed Skin") && moves.has("rest") && !moves.has("sleeptalk"))
      return "Shed Skin";
    if (abilities.has("Sniper") && moves.has("focusenergy"))
      return "Sniper";
    if (abilities.has("Unburden") && ["acrobatics", "bellydrum"].some((m) => moves.has(m)))
      return "Unburden";
    let abilityAllowed = [];
    for (const ability of abilityData) {
      if (ability.rating >= 1 && !this.shouldCullAbility(
        ability.name,
        types,
        moves,
        abilities,
        counter,
        movePool,
        teamDetails,
        species,
        isDoubles,
        preferredType,
        role
      )) {
        abilityAllowed.push(ability);
      }
    }
    if (!abilityAllowed.length) {
      for (const ability of abilityData) {
        if (ability.rating > 0)
          abilityAllowed.push(ability);
      }
      if (!abilityAllowed.length)
        abilityAllowed = abilityData;
    }
    if (abilityAllowed.length === 1)
      return abilityAllowed[0].name;
    if (abilityAllowed[2] && abilityAllowed[0].rating - 0.5 <= abilityAllowed[2].rating) {
      if (abilityAllowed[1].rating <= abilityAllowed[2].rating) {
        if (this.randomChance(1, 2))
          [abilityAllowed[1], abilityAllowed[2]] = [abilityAllowed[2], abilityAllowed[1]];
      } else {
        if (this.randomChance(1, 3))
          [abilityAllowed[1], abilityAllowed[2]] = [abilityAllowed[2], abilityAllowed[1]];
      }
      if (abilityAllowed[0].rating <= abilityAllowed[1].rating) {
        if (this.randomChance(2, 3))
          [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
      } else {
        if (this.randomChance(1, 2))
          [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
      }
    } else {
      if (abilityAllowed[0].rating <= abilityAllowed[1].rating) {
        if (this.randomChance(1, 2))
          [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
      } else if (abilityAllowed[0].rating - 0.5 <= abilityAllowed[1].rating) {
        if (this.randomChance(1, 3))
          [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
      }
    }
    return abilityAllowed[0].name;
  }
  getPriorityItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role) {
    if (species.requiredItems)
      return this.sample(species.requiredItems);
    if (role === "AV Pivot")
      return "Assault Vest";
    if (species.name === "Farfetch\u2019d")
      return "Stick";
    if (species.name === "Latias" || species.name === "Latios")
      return "Soul Dew";
    if (species.name === "Marowak")
      return "Thick Club";
    if (species.name === "Pikachu")
      return "Light Ball";
    if (species.name === "Shedinja" || species.name === "Smeargle")
      return "Focus Sash";
    if (species.name === "Talonflame")
      return "Sharp Beak";
    if (species.name === "Unfezant" || moves.has("focusenergy"))
      return "Scope Lens";
    if (species.name === "Unown")
      return "Choice Specs";
    if (species.name === "Wobbuffet")
      return "Custap Berry";
    if (species.name === "Shuckle")
      return "Mental Herb";
    if (ability === "Harvest" || ability === "Cheek Pouch")
      return "Sitrus Berry";
    if (species.name === "Ditto")
      return "Choice Scarf";
    if (ability === "Poison Heal")
      return "Toxic Orb";
    if (ability === "Speed Boost")
      return "Life Orb";
    if (species.nfe)
      return species.name === "Scyther" && role === "Fast Attacker" ? "Choice Band" : "Eviolite";
    if (["healingwish", "memento", "switcheroo", "trick"].some((m) => moves.has(m))) {
      if (species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && role !== "Wallbreaker") {
        return "Choice Scarf";
      } else {
        return counter.get("Physical") > counter.get("Special") ? "Choice Band" : "Choice Specs";
      }
    }
    if (moves.has("bellydrum"))
      return "Sitrus Berry";
    if (moves.has("geomancy") || moves.has("skyattack"))
      return "Power Herb";
    if (moves.has("shellsmash")) {
      return ability === "Solid Rock" && !!counter.get("priority") ? "Weakness Policy" : "White Herb";
    }
    if (moves.has("psychoshift"))
      return "Flame Orb";
    if ((ability === "Guts" || moves.has("facade")) && !moves.has("sleeptalk")) {
      return species.name === "Conkeldurr" ? "Flame Orb" : "Toxic Orb";
    }
    if (ability === "Magic Guard" && role !== "Bulky Support") {
      return moves.has("counter") ? "Focus Sash" : "Life Orb";
    }
    if (ability === "Sheer Force" && counter.get("sheerforce"))
      return "Life Orb";
    if (ability === "Unburden")
      return "Sitrus Berry";
    if (moves.has("acrobatics"))
      return "";
    if (moves.has("lightscreen") && moves.has("reflect"))
      return "Light Clay";
    if (moves.has("rest") && !moves.has("sleeptalk") && !["Hydration", "Natural Cure", "Shed Skin"].includes(ability)) {
      return "Chesto Berry";
    }
    if (role === "Staller")
      return "Leftovers";
  }
  getItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role) {
    const defensiveStatTotal = species.baseStats.hp + species.baseStats.def + species.baseStats.spd;
    const scarfReqs = role !== "Wallbreaker" && species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && !counter.get("priority") && !moves.has("pursuit");
    if (moves.has("pursuit") && moves.has("suckerpunch") && counter.get("Dark") && !this.priorityPokemon.includes(species.id))
      return "Black Glasses";
    if (counter.get("Special") === 4) {
      return scarfReqs && species.baseStats.spa >= 90 && this.randomChance(1, 2) ? "Choice Scarf" : "Choice Specs";
    }
    if (counter.get("Special") === 3 && moves.has("uturn"))
      return "Choice Specs";
    if (counter.get("Physical") === 4 && species.id !== "jirachi" && ["dragontail", "fakeout", "flamecharge", "nuzzle", "rapidspin"].every((m) => !moves.has(m))) {
      return scarfReqs && (species.baseStats.atk >= 100 || ability === "Pure Power" || ability === "Huge Power") && this.randomChance(1, 2) ? "Choice Scarf" : "Choice Band";
    }
    if (ability === "Sturdy" && moves.has("explosion") && !counter.get("speedsetup"))
      return "Custap Berry";
    if (types.includes("Normal") && moves.has("fakeout") && !!counter.get("Normal"))
      return "Silk Scarf";
    if (role === "Bulky Setup" && !!counter.get("speedsetup") && !moves.has("swordsdance")) {
      return "Weakness Policy";
    }
    if (species.id === "palkia")
      return "Lustrous Orb";
    if (species.id === "archeops")
      return "Expert Belt";
    if (!counter.get("Status") && (["Fast Support", "Bulky Support", "Bulky Attacker"].some((m) => role === m) || moves.has("rapidspin"))) {
      return "Assault Vest";
    }
    if (moves.has("outrage") && counter.get("setup"))
      return "Lum Berry";
    if (ability === "Rough Skin" || species.id !== "hooh" && ability === "Regenerator" && species.baseStats.hp + species.baseStats.def >= 180 && this.randomChance(1, 2))
      return "Rocky Helmet";
    if (["kingsshield", "protect", "spikyshield", "substitute"].some((m) => moves.has(m)))
      return "Leftovers";
    if (this.dex.getEffectiveness("Ground", species) >= 2 && ability !== "Levitate") {
      return "Air Balloon";
    }
    if ((role === "Fast Support" || moves.has("stickyweb")) && isLead && defensiveStatTotal < 255 && !counter.get("recovery") && !moves.has("defog") && (!counter.get("recoil") || ability === "Rock Head") && ability !== "Regenerator")
      return "Focus Sash";
    if (role === "Fast Support") {
      return counter.get("Physical") + counter.get("Special") >= 3 && ["nuzzle", "rapidspin", "uturn", "voltswitch"].every((m) => !moves.has(m)) && this.dex.getEffectiveness("Rock", species) < 2 ? "Life Orb" : "Leftovers";
    }
    if (!counter.get("Status")) {
      return (moves.has("uturn") || moves.has("voltswitch")) && !counter.get("Dragon") && !counter.get("Normal") ? "Expert Belt" : "Life Orb";
    }
    if (["Fast Attacker", "Setup Sweeper", "Wallbreaker"].some((m) => role === m) && this.dex.getEffectiveness("Rock", species) < 2 && ability !== "Sturdy")
      return "Life Orb";
    return "Leftovers";
  }
  randomSet(species, teamDetails = {}, isLead = false, isDoubles = false) {
    species = this.dex.species.get(species);
    let forme = species.name;
    if (typeof species.battleOnly === "string") {
      forme = species.battleOnly;
    }
    if (species.cosmeticFormes) {
      forme = this.sample([species.name].concat(species.cosmeticFormes));
    }
    const sets = this.randomSets[species.id]["sets"];
    const possibleSets = [];
    for (const set2 of sets)
      possibleSets.push(set2);
    const set = this.sampleIfArray(possibleSets);
    const role = set.role;
    const movePool = Array.from(set.movepool);
    const preferredTypes = set.preferredTypes;
    const preferredType = this.sampleIfArray(preferredTypes) || "";
    let ability = "";
    let item = void 0;
    const evs = { hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85 };
    const ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };
    const types = species.types;
    const abilities = new Set(Object.values(species.abilities));
    if (species.unreleasedHidden)
      abilities.delete(species.abilities.H);
    const moves = this.randomMoveset(
      types,
      abilities,
      teamDetails,
      species,
      isLead,
      isDoubles,
      movePool,
      preferredType,
      role
    );
    const counter = this.newQueryMoves(moves, species, preferredType, abilities);
    ability = this.getAbility(
      new Set(types),
      moves,
      abilities,
      counter,
      movePool,
      teamDetails,
      species,
      false,
      preferredType,
      role
    );
    item = this.getPriorityItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);
    if (item === void 0) {
      item = this.getItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);
    }
    if (item === "Leftovers" && types.includes("Poison")) {
      item = "Black Sludge";
    }
    const level = this.adjustLevel || this.randomSets[species.id]["level"] || (species.nfe ? 90 : 80);
    if (!counter.get("Physical") && !moves.has("copycat") && !moves.has("transform")) {
      evs.atk = 0;
      ivs.atk = 0;
    }
    let hasHiddenPower = false;
    for (const move of moves) {
      if (move.startsWith("hiddenpower"))
        hasHiddenPower = true;
    }
    if (hasHiddenPower) {
      let hpType;
      for (const move of moves) {
        if (move.startsWith("hiddenpower"))
          hpType = move.substr(11);
      }
      if (!hpType)
        throw new Error(`hasHiddenPower is true, but no Hidden Power move was found.`);
      const HPivs = ivs.atk === 0 ? import_random_teams2.ZeroAttackHPIVs[hpType] : this.dex.types.get(hpType).HPivs;
      let iv;
      for (iv in HPivs) {
        ivs[iv] = HPivs[iv];
      }
    }
    const srImmunity = ability === "Magic Guard";
    let srWeakness = srImmunity ? 0 : this.dex.getEffectiveness("Rock", species);
    if (["highjumpkick", "jumpkick"].some((m) => moves.has(m)))
      srWeakness = 2;
    while (evs.hp > 1) {
      const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
      if (moves.has("substitute") && item === "Sitrus Berry") {
        if (hp % 4 === 0)
          break;
      } else if (moves.has("bellydrum") && item === "Sitrus Berry") {
        if (hp % 2 === 0)
          break;
      } else {
        if (srWeakness <= 0 || ability === "Regenerator" || ["Black Sludge", "Leftovers", "Life Orb"].includes(item))
          break;
        if (item !== "Sitrus Berry" && hp % (4 / srWeakness) > 0)
          break;
        if (item === "Sitrus Berry" && hp % (4 / srWeakness) === 0)
          break;
      }
      evs.hp -= 4;
    }
    if (["gyroball", "metalburst", "trickroom"].some((m) => moves.has(m))) {
      evs.spe = 0;
      ivs.spe = hasHiddenPower && level < 100 ? ivs.spe - 30 : 0;
    }
    const shuffledMoves = Array.from(moves);
    this.prng.shuffle(shuffledMoves);
    return {
      name: species.baseSpecies,
      species: forme,
      gender: species.gender,
      shiny: this.randomChance(1, 1024),
      level,
      moves: shuffledMoves,
      ability,
      evs,
      ivs,
      item,
      role
    };
  }
  randomFactorySet(species, teamData, tier) {
    const id = (0, import_dex.toID)(species.name);
    const setList = this.randomFactorySets[tier][id].sets;
    const itemsMax = { choicespecs: 1, choiceband: 1, choicescarf: 1 };
    const movesMax = {
      rapidspin: 1,
      batonpass: 1,
      stealthrock: 1,
      defog: 1,
      spikes: 1,
      toxicspikes: 1
    };
    const requiredMoves = { stealthrock: "hazardSet", rapidspin: "hazardClear", defog: "hazardClear" };
    const weatherAbilitiesRequire = {
      hydration: "raindance",
      swiftswim: "raindance",
      leafguard: "sunnyday",
      solarpower: "sunnyday",
      chlorophyll: "sunnyday",
      sandforce: "sandstorm",
      sandrush: "sandstorm",
      sandveil: "sandstorm",
      snowcloak: "hail"
    };
    const weatherAbilities = ["drizzle", "drought", "snowwarning", "sandstream"];
    let effectivePool = [];
    const priorityPool = [];
    for (const curSet of setList) {
      if (this.forceMonotype && !species.types.includes(this.forceMonotype))
        continue;
      const itemData = this.dex.items.get(curSet.item);
      if (teamData.megaCount && teamData.megaCount > 0 && itemData.megaStone)
        continue;
      if (itemsMax[itemData.id] && teamData.has[itemData.id] >= itemsMax[itemData.id])
        continue;
      const abilityState = this.dex.abilities.get(curSet.ability);
      if (weatherAbilitiesRequire[abilityState.id] && teamData.weather !== weatherAbilitiesRequire[abilityState.id])
        continue;
      if (teamData.weather && weatherAbilities.includes(abilityState.id))
        continue;
      let reject = false;
      let hasRequiredMove = false;
      const curSetVariants = [];
      for (const move of curSet.moves) {
        const variantIndex = this.random(move.length);
        const moveId = (0, import_dex.toID)(move[variantIndex]);
        if (movesMax[moveId] && teamData.has[moveId] >= movesMax[moveId]) {
          reject = true;
          break;
        }
        if (requiredMoves[moveId] && !teamData.has[requiredMoves[moveId]]) {
          hasRequiredMove = true;
        }
        curSetVariants.push(variantIndex);
      }
      if (reject)
        continue;
      effectivePool.push({ set: curSet, moveVariants: curSetVariants });
      if (hasRequiredMove)
        priorityPool.push({ set: curSet, moveVariants: curSetVariants });
    }
    if (priorityPool.length)
      effectivePool = priorityPool;
    if (!effectivePool.length) {
      if (!teamData.forceResult)
        return null;
      for (const curSet of setList) {
        effectivePool.push({ set: curSet });
      }
    }
    const setData = this.sample(effectivePool);
    const moves = [];
    for (const [i, moveSlot] of setData.set.moves.entries()) {
      moves.push(setData.moveVariants ? moveSlot[setData.moveVariants[i]] : this.sample(moveSlot));
    }
    return {
      name: setData.set.name || species.baseSpecies,
      species: setData.set.species,
      gender: setData.set.gender || species.gender || (this.randomChance(1, 2) ? "M" : "F"),
      item: setData.set.item || "",
      ability: setData.set.ability || species.abilities["0"],
      shiny: typeof setData.set.shiny === "undefined" ? this.randomChance(1, 1024) : setData.set.shiny,
      level: this.adjustLevel || 100,
      happiness: typeof setData.set.happiness === "undefined" ? 255 : setData.set.happiness,
      evs: setData.set.evs || { hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84 },
      ivs: setData.set.ivs || { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      nature: setData.set.nature || "Serious",
      moves
    };
  }
  randomFactoryTeam(side, depth = 0) {
    this.enforceNoDirectCustomBanlistChanges();
    const forceResult = depth >= 12;
    if (!this.factoryTier)
      this.factoryTier = this.sample(["Uber", "OU", "UU", "RU", "NU", "PU"]);
    const chosenTier = this.factoryTier;
    const pokemon = [];
    const pokemonPool = Object.keys(this.randomFactorySets[chosenTier]);
    const teamData = {
      typeCount: {},
      typeComboCount: {},
      baseFormes: {},
      megaCount: 0,
      has: {},
      forceResult,
      weaknesses: {},
      resistances: {}
    };
    const requiredMoveFamilies = ["hazardSet", "hazardClear"];
    const requiredMoves = { stealthrock: "hazardSet", rapidspin: "hazardClear", defog: "hazardClear" };
    const weatherAbilitiesSet = {
      drizzle: "raindance",
      drought: "sunnyday",
      snowwarning: "hail",
      sandstream: "sandstorm"
    };
    const resistanceAbilities = {
      dryskin: ["Water"],
      waterabsorb: ["Water"],
      stormdrain: ["Water"],
      flashfire: ["Fire"],
      heatproof: ["Fire"],
      lightningrod: ["Electric"],
      motordrive: ["Electric"],
      voltabsorb: ["Electric"],
      sapsipper: ["Grass"],
      thickfat: ["Ice", "Fire"],
      levitate: ["Ground"]
    };
    while (pokemonPool.length && pokemon.length < this.maxTeamSize) {
      const species = this.dex.species.get(this.sampleNoReplace(pokemonPool));
      if (!species.exists)
        continue;
      const speciesFlags = this.randomFactorySets[chosenTier][species.id].flags;
      if (teamData.baseFormes[species.baseSpecies])
        continue;
      if (!teamData.megaCount)
        teamData.megaCount = 0;
      if (teamData.megaCount >= 1 && speciesFlags.megaOnly)
        continue;
      const limitFactor = Math.round(this.maxTeamSize / 6) || 1;
      const types = species.types;
      let skip = false;
      for (const type of types) {
        if (teamData.typeCount[type] >= 2 * limitFactor && this.randomChance(4, 5)) {
          skip = true;
          break;
        }
      }
      if (skip)
        continue;
      const set = this.randomFactorySet(species, teamData, chosenTier);
      if (!set)
        continue;
      let typeCombo = types.slice().sort().join();
      if (set.ability === "Drought" || set.ability === "Drizzle") {
        typeCombo = set.ability;
      }
      if (teamData.typeComboCount[typeCombo] >= 1 * limitFactor)
        continue;
      pokemon.push(set);
      for (const type of types) {
        if (type in teamData.typeCount) {
          teamData.typeCount[type]++;
        } else {
          teamData.typeCount[type] = 1;
        }
      }
      teamData.typeComboCount[typeCombo] = teamData.typeComboCount[typeCombo] + 1 || 1;
      teamData.baseFormes[species.baseSpecies] = 1;
      const itemData = this.dex.items.get(set.item);
      if (itemData.megaStone)
        teamData.megaCount++;
      if (itemData.id in teamData.has) {
        teamData.has[itemData.id]++;
      } else {
        teamData.has[itemData.id] = 1;
      }
      const abilityState = this.dex.abilities.get(set.ability);
      if (abilityState.id in weatherAbilitiesSet) {
        teamData.weather = weatherAbilitiesSet[abilityState.id];
      }
      for (const move of set.moves) {
        const moveId = (0, import_dex.toID)(move);
        if (moveId in teamData.has) {
          teamData.has[moveId]++;
        } else {
          teamData.has[moveId] = 1;
        }
        if (moveId in requiredMoves) {
          teamData.has[requiredMoves[moveId]] = 1;
        }
      }
      for (const typeName of this.dex.types.names()) {
        if (teamData.resistances[typeName] >= 1)
          continue;
        if (resistanceAbilities[abilityState.id]?.includes(typeName) || !this.dex.getImmunity(typeName, types)) {
          teamData.resistances[typeName] = (teamData.resistances[typeName] || 0) + 1;
          if (teamData.resistances[typeName] >= 1)
            teamData.weaknesses[typeName] = 0;
          continue;
        }
        const typeMod = this.dex.getEffectiveness(typeName, types);
        if (typeMod < 0) {
          teamData.resistances[typeName] = (teamData.resistances[typeName] || 0) + 1;
          if (teamData.resistances[typeName] >= 1)
            teamData.weaknesses[typeName] = 0;
        } else if (typeMod > 0) {
          teamData.weaknesses[typeName] = (teamData.weaknesses[typeName] || 0) + 1;
        }
      }
    }
    if (pokemon.length < this.maxTeamSize)
      return this.randomFactoryTeam(side, ++depth);
    if (!teamData.forceResult) {
      for (const requiredFamily of requiredMoveFamilies) {
        if (!teamData.has[requiredFamily])
          return this.randomFactoryTeam(side, ++depth);
      }
      for (const type in teamData.weaknesses) {
        if (teamData.weaknesses[type] >= 3)
          return this.randomFactoryTeam(side, ++depth);
      }
    }
    return pokemon;
  }
}
var random_teams_default = RandomGen6Teams;
//# sourceMappingURL=random-teams.js.map
