
import { PlayerActorSheet } from "./characters/player-sheet.js";

export async function preloadHandlebarsTemplates() {
    const partials = [
        PlayerActorSheet.templateFiles,
    ].flat()
  
    const paths = {};
    for ( const path of partials ) {
      paths[path] = path;
      paths[`edc.${path.split("/").pop().replace(".html", "")}`] = path;
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
