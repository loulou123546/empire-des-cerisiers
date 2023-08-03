
import { PlayerActorSheet } from "./characters/player-sheet.js";

export async function preloadHandlebarsTemplates() {
    const partials = [
        PlayerActorSheet.templateFiles,
        [
            // Shared Partials
            "systems/empire-des-cerisiers/templates/actors/parts/active-effects.hbs",
            "systems/empire-des-cerisiers/templates/apps/parts/trait-list.hbs",
        
            // Actor Sheet Partials
            "systems/empire-des-cerisiers/templates/actors/parts/actor-traits.hbs",
            "systems/empire-des-cerisiers/templates/actors/parts/actor-inventory.hbs",
            "systems/empire-des-cerisiers/templates/actors/parts/actor-features.hbs",
            "systems/empire-des-cerisiers/templates/actors/parts/actor-spellbook.hbs",
            "systems/empire-des-cerisiers/templates/actors/parts/actor-warnings.hbs",
        
            // Item Sheet Partials
            "systems/empire-des-cerisiers/templates/items/parts/item-action.hbs",
            "systems/empire-des-cerisiers/templates/items/parts/item-activation.hbs",
            "systems/empire-des-cerisiers/templates/items/parts/item-advancement.hbs",
            "systems/empire-des-cerisiers/templates/items/parts/item-description.hbs",
            "systems/empire-des-cerisiers/templates/items/parts/item-mountable.hbs",
            "systems/empire-des-cerisiers/templates/items/parts/item-spellcasting.hbs",
            "systems/empire-des-cerisiers/templates/items/parts/item-summary.hbs",
        
            // Journal Partials
            "systems/empire-des-cerisiers/templates/journal/parts/journal-table.hbs",
        
            // Advancement Partials
            "systems/empire-des-cerisiers/templates/advancement/parts/advancement-controls.hbs",
            "systems/empire-des-cerisiers/templates/advancement/parts/advancement-spell-config.hbs"
          ]
    ].flat()
  
    const paths = {};
    for ( const path of partials ) {
        paths[path] = path;
        paths[`edc.${path.split("/").pop().replace(".html", "")}`] = path;
        paths[path.replace(".hbs", ".html")] = path;
        paths[`dnd5e.${path.split("/").pop().replace(".hbs", "")}`] = path;
    }
  
    return loadTemplates(paths);
}


export const registerHandlebarsHelpers = function () {

    Handlebars.registerHelper('calcMalus', function(wounds, block) {
        wounds = Math.abs(Math.max(0, Math.min(35, Number(wounds))));
        let category = Math.floor((wounds -1) / 5);
        switch (category) {
            case 1:
                return "-1";
            case 2:
                return "-3";
            case 3:
                return "-5";
            case 4:
                return "-7";
            case 5:
                return "+3/-9";
            case 6:
                return "K.O";
            default:
                return "aucun";
        }
    });

    Handlebars.registerHelper('calcWounds', function(wounds, block) {
        wounds = Number(wounds);
        return Math.abs(Math.max(0, Math.min(35, wounds)));
    });

};
