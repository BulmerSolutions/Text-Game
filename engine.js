const Player = require('./player');

/**
 * @typedef {Room} Engine.rooms
 */
class Engine {

    /**
     * @description Creates a new game engine instance
     * @param {JSON} game Game data from JSON
     */
    constructor(game) {

        /**
         * @name Engine#title
         * @type String
         */
        this.title = game.title;

        /**
         * @name Engine#author
         * @type String
         */
        this.author = game.meta.author;

        this.player = new Player();

        /**
         * @name Engine#currentRoom
         * @type Room
         */
        this.currentRoom;

        /**
         * @name Engine#rooms
         * @type Room[]
         */
        this.rooms = [];

        this.end = false;

        this.init(game);
    }

    /**
     * @description Initializes the game.
     * @param {JSON} game Game json object
     */
    init(game) {
        // Create room objects from game json
        for (let r = 0; r < game.rooms.length; r++) {
            this.rooms.push(new Room(game.rooms[r]));
        }

        this.currentRoom = this.rooms[0];
    }

    goto(direction) {
        let index = null;

        // find the desired room
        for (let i = 0; i < this.currentRoom.exits.length; i++) {
            if (this.currentRoom.exits[i].direction === direction) {
                index = this.currentRoom.exits[i].index;
            }
        }

        if (index !== null) {
            // change room
            this.currentRoom = this.rooms[index];

            // Give the context of the room.
            if (typeof this.currentRoom.context === "string") {
                console.log("\n" + color.cyanBright(' ? ') + this.currentRoom.context);
            } else {
                console.log();
                for (let i = 0; i < this.currentRoom.context.length; i++) {
                    console.log(color.cyanBright(' ? ') + this.currentRoom.context[i]);
                }
            }
            return null;
        } else {
            return "That is not an avalible direction.";
        }
    }

}

class Room {

    /**
     * @description Creates a room object
     * @param {{'location': string 'context': string | string[] 'help': string 'enemies': [] 'exits': [{ 'direction': string 'index': number 'context': string }] 'collectables': [{ 'type': string 'name': string }]}} room Room object within game
     */
    constructor(room) {
        this.location = room.location;
        this.context = room.context;
        this.help = room.help;
        this.exits = room.exits;
        this.collectables = room.collectables;
        this.enemies = room.enemies;
    }

}

module.exports = { 'Engine': Engine, 'Room': Room };