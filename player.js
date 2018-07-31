const { Room } = require('./engine');

class Player {
    /**
     * @description Creates a new player
     * @param {Engine} game The game object
     * @param {String} name Name of player
     */
    constructor(game, name) {
        this.game = game;
        this.name = name;
        this.health = 100;
        this.energy = 100;
        this.weapon;
        this.inventory = [];
    }

    /**
     * @param {Room} room Room to pickup item from
     * @param {String} item Item to be picked up
     * @returns {{'type': string, 'name': string} | null} Returns the
     */
    pickup(room, item) {
        let isPickedUp = false;
        let itemIndex = -1;

        for (let i = 0; i < room.collectables.length; i++) {
            if (item === room.collectables[i].name) {
                isPickedUp = true;
                itemIndex = i;
            }
        }

        if (isPickedUp) {
            this.inventory.push(room.collectables[itemIndex]);
            let item = room.collectables.splice(itemIndex, 1)[0];
            return item;
        } else {
            return null;
        }
    }

    /**
     * @param {Room} room Room to look in
     * @param {String} action What to look for
     * @returns {String} Returns output text
     */
    look(room, action) {
        let text = "";
        switch (action) {
            case "exit":
                text = "There seems to be an exit to the ";

                if (room.exits.length > 0) {
                    for (let i = 0; i < room.exits.length; i++) {
                        if (i === 0) {
                            text += room.exits[i].direction;
                        } else if (i !== room.exits.length) {
                            text += ' and ' + room.exits[i].direction;
                        } else {
                            text += ', ' + room.exits[i].direction;
                        }
                    }
                } else {
                    text = "There are no exits to be seen.";
                }

                return text;
            case "items":
                text = "There is a ";
                if (room.collectables.length === 1) {
                    text += room.collectables[0].name;
                    return text;
                } else if (room.collectables.length > 0) {
                    for (let i = 0; i < room.collectables.length; i++) {
                        if (i === 0) {
                            text += room.collectables[i].name;
                        } else if (i !== room.collectables.length) {
                            text += ' and a ' + room.collectables[i].name;
                        } else {
                            text += ', ' + room.collectables[i].name;
                        }
                    }
                    return text;
                } else {
                    return "There are no items.";
                }
            case "around":
                if (room.collectables.length >= 1) {
                    if (room.exits.length >= 1) {
                        text += "I can see some items and an exit";
                    } else {
                        text += "I can see some items laying around";
                    }
                } else if (room.exits.length >= 1) {
                    text += "I can see an exit";
                } else {
                    text += "I don't see antthing!";
                }
                return text;
        }
    }
}

module.exports = Player;
