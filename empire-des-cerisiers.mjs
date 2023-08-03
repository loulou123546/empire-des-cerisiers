/**
 * The DnD5e game system for Foundry Virtual Tabletop
 * A system for playing the fifth edition of the world's most popular role-playing game.
 * Author: Atropos
 * Software License: MIT
 * Content License: https://www.dndbeyond.com/attachments/39j2li89/SRD5.1-CCBY4.0License.pdf
 * Repository: https://github.com/foundryvtt/dnd5e
 * Issue Tracker: https://github.com/foundryvtt/dnd5e/issues
 */

// Import Configuration
import EDC from "./module/config.mjs";
import registerSystemSettings from "./module/settings.mjs";

// Import Submodules
// import * as applications from "./module/applications/_module.mjs";
// import * as dataModels from "./module/data/_module.mjs";
// import * as documents from "./module/documents/_module.mjs";


import { PlayerActor } from "./scripts/characters/player.js";
import { PlayerActorSheet } from "./scripts/characters/player-sheet.js";
import { PlayerActorSheetDND } from "./scripts/characters/player-sheet-dnd.js";
import { preloadHandlebarsTemplates, registerHandlebarsHelpers } from "./scripts/handlebars.js";

/* -------------------------------------------- */
/*  Define Module Structure                     */
/* -------------------------------------------- */

globalThis.edc = {
  // applications,
  config: EDC,
  // dataModels,
  // documents
};

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", function() {
  console.log(`Empire des Cerisiers | Initializing the EDC Game System`);

  // Record Configuration Values
  CONFIG.EDC = EDC;
  CONFIG.Actor.documentClass = PlayerActor;
  // CONFIG.Item.documentClass = documents.ItemEDC;
  game.edc.isV10 = game.release.generation < 11;

  // Configure trackable attributes.
  // _configureTrackableAttributes();

  // Register System Settings
  registerSystemSettings();


  // Hook up system data types
  // const modelType = game.dnd5e.isV10 ? "systemDataModels" : "dataModels";
  // CONFIG.Actor[modelType] = dataModels.actor.config;
  // CONFIG.Item[modelType] = dataModels.item.config;
  // CONFIG.JournalEntryPage[modelType] = dataModels.journal.config;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("empire-des-cerisiers", PlayerActorSheet, {
    types: ["character", "player"],
    makeDefault: true,
    label: "DND5E.SheetClassCharacter"
  });
  Actors.registerSheet("empire-des-cerisiers", PlayerActorSheetDND, {
    types: ["character", "player"],
    makeDefault: false,
    label: "DND5E.SECOND_TEST"
  });

  // Items.unregisterSheet("core", ItemSheet);
  // Items.registerSheet("empire-des-cerisiers", applications.item.ItemSheet5e, {
  //   makeDefault: true,
  //   label: "DND5E.SheetClassItem"
  // });
  // DocumentSheetConfig.registerSheet(JournalEntryPage, "empire-des-cerisiers", applications.journal.JournalClassPageSheet, {
  //   label: "DND5E.SheetClassClassSummary",
  //   types: ["class"]
  // });

  // Preload Handlebars helpers & partials
  registerHandlebarsHelpers();
  preloadHandlebarsTemplates();
});

/**
 * Configure explicit lists of attributes that are trackable on the token HUD and in the combat tracker.
 * @internal
 */
function _configureTrackableAttributes() {
  const common = {
    bar: [],
    value: [
      ...Object.keys(DND5E.abilities).map(ability => `abilities.${ability}.value`),
      ...Object.keys(DND5E.movementTypes).map(movement => `attributes.movement.${movement}`),
      "attributes.ac.value", "attributes.init.total"
    ]
  };

  const creature = {
    bar: [...common.bar, "attributes.hp"],
    value: [
      ...common.value,
      ...Object.keys(DND5E.skills).map(skill => `skills.${skill}.passive`),
      ...Object.keys(DND5E.senses).map(sense => `attributes.senses.${sense}`),
      "attributes.spelldc"
    ]
  };

  CONFIG.Actor.trackableAttributes = {
    character: {
      bar: [...creature.bar, "resources.primary", "resources.secondary", "resources.tertiary", "details.xp"],
      value: [...creature.value]
    },
    npc: {
      bar: [...creature.bar, "resources.legact", "resources.legres"],
      value: [...creature.value, "details.cr", "details.spellLevel", "details.xp.value"]
    },
    vehicle: {
      bar: [...common.bar, "attributes.hp"],
      value: [...common.value]
    },
    group: {
      bar: [],
      value: []
    }
  };
}

/* -------------------------------------------- */
/*  Bundled Module Exports                      */
/* -------------------------------------------- */

export {
  // applications,
  // dataModels,
  // documents,
  EDC
};
