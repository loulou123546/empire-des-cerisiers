export class PlayerActor extends Actor {

    static async create(docData, options = {}) {

        // Set some properties
        docData.prototypeToken = docData.prototypeToken || {};
        foundry.utils.mergeObject(
            docData.prototypeToken,
            {
                actorLink: true,
                disposition: 0, // -1: Hostile, 0: neutral, 1: friendly
                displayBars: 40, // 40 is Always for the owner
                displayName: 30, // 30 is Hovered by anyone
                bar1: {
                    attribute: "wounds",
                },
            },
            { overwrite: false }
        );

        return super.create(docData, options);
    }

}
