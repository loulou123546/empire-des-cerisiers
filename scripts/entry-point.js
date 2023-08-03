import { PlayerActor } from "./characters/player.js";
import { PlayerActorSheet } from "./characters/player-sheet.js";
import { RegisterHandlebars } from "./handlebars.js";


Hooks.once("init", async () => {

    console.log("Empire-des-cerisiers | Initializing Empire-des-cerisiers System");

    CONFIG.Actor.documentClass = PlayerActor;
    CONFIG.Actor.entityClass = PlayerActor;
    CONFIG.Actor.sheetClasses = PlayerActorSheet;

    RegisterHandlebars();
    await loadTemplates(PlayerActorSheet.templateFiles);

    Actors.registerSheet("empire-des-cerisiers", PlayerActorSheet, {
        types: ["character", "player"],
        label: "PlayerActorSheet.title",
        makeDefault: true
    });

    console.log("Empire-des-cerisiers | Empire-des-cerisiers System Initialized");
});

