export class PlayerActorSheet extends ActorSheet {

    constructor (object, options) {
        let actor = super(object, options);
        // console.warn("CharacterSheet | constructor | actor");
        // console.log(actor.token);
        return actor;
    }

    get template() {
        return `systems/empire-des-cerisiers/ui/character-sheets/index.html`;
    }

    static get templateFiles () {
        return [
            "systems/empire-des-cerisiers/ui/character-sheets/header.html",
            "systems/empire-des-cerisiers/ui/commons/single_line_50_1000.html",
            "systems/empire-des-cerisiers/ui/character-sheets/capacities.html",
            "systems/empire-des-cerisiers/ui/character-sheets/advantages.html",
            "systems/empire-des-cerisiers/ui/character-sheets/disadvantages.html"
        ];
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["sheet", "character", "player"],
            template: `systems/empire-des-cerisiers/ui/character-sheets/index.html`,
            width: 1200,
            height: 700,
            // tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "skills" }],
            // dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
            dragDrop: [
                { dropSelector: "#droppable-journaux"}
            ],
        });
    }

    async getData(options = {}) {
        const sheetData = await super.getData(options);
        const system = sheetData.data.system;

        sheetData.data.isGM = game.user.isGM;
        
        return sheetData;
    }

    async activateListeners (html) {
        super.activateListeners(html);

        html.find(".clear-journaEntries*").on("click", this._clearJournalEntries.bind(this));
    }

    async _clearJournalEntries (event) {
        event.preventDefault();
        if (!game.user.isGM) return;
        this.actor.update({ "system.journalEntries": [] });
    }

    async _onDrop (event) {
        /* {
            "type":"JournalEntryPage",
            "uuid":"JournalEntry.X9RVyhaeWkjKiRbs.JournalEntryPage.is8OXOwy5stuQGPl",
            "anchor":{"name":"0.\nInventaire"}
        } */
        try {
            let data = JSON.parse(event.dataTransfer?.getData("text/plain"));
            if (data.type === "JournalEntryPage") {
                if (!game.user.isGM) return;
                let name = data.anchor.name.split('\n').pop();
                let newLink = {
                    "name": name,
                    "uuid": data.uuid,
                    "id": data.uuid.split('.').pop(),
                    "type": data.type
                }
                
                let je = this.actor.system?.journalEntries || [];
                this.actor.update({ "system.journalEntries": [...je, newLink] });

                return;
            }
        } catch (error) {}   
        return super._onDrop(event);
    }
        

}
