'use strict';

// get game items
const GAMEDATA = require('./game.json');
const player = require('./player.js');

// get NodeJS items
const util = require('util');
const color = require('cli-color');
const input = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// setup ongoing game data
const game = {
    end: false,
    room: GAMEDATA.rooms[0]
};

// Clear console
process.stdout.write(color.erase.screen);

// Print out the title
process.title = GAMEDATA.title;
console.log("\n " + color.bold.whiteBright(GAMEDATA.title) + " \n");

// Give the context of the room.
if (typeof game.room.context === "string") {
    console.log(color.cyanBright(' ? ') + game.room.context);
} else {
    for (let i = 0; i < game.room.context.length; i++) {
        console.log(color.cyanBright(' ? ') + game.room.context[i]);
    }
}

// The game loop
let update = () => {

    // Ask what the player wants to do.
    input.question("\n" + color.whiteBright(" > "), (res) => {
        // receive message and chop it up
        let messege = res.split(" ");

        let output = "\n ";

        // decide what the player wants to do
        if (messege[0] !== '') {
            switch (messege[0]) {
                case "look": // look for something
                    if (messege.length >= 3) {
                        output += player.look(game.room, messege[2]);
                    } else {
                        output += player.look(game.room, 'items');
                    }
                    break;
                case "pickup": // pickup an item
                    if (messege.length >= 2) {
                        let item = player.pickup(game.room, messege[1]);
                        output += "You picked up a " + item.name;
                    }
                    break;
                case "quit":
                    process.exit();
                    break;
                case "goto":
                    if (messege.length >= 1) {
                        let index = null;

                        // find the desired room
                        for (let i = 0; i < game.room.exits.length; i++) {
                            if (game.room.exits[i].direction === messege[1]) {
                                index = game.room.exits[i].index;
                            }
                        }

                        if (index !== null) {
                            // change room
                            game.room = GAMEDATA.rooms[index];

                            // Give the context of the room.
                            if (typeof game.room.context === "string") {
                                console.log("\n" + color.cyanBright(' ? ') + game.room.context);
                            } else {
                                console.log();
                                for (let i = 0; i < game.room.context.length; i++) {
                                    console.log(color.cyanBright(' ? ') + game.room.context[i]);
                                }
                            }
                            output = null;
                        } else {
                            output += "That is not an avalible direction.";
                        }
                    } else {
                        output += "Please enter a direction.";
                    }
                    break;
            }

            // print the output
            if (output) {
                console.log(output.padStart(4));
            }
            update();
        } else {
            // print a default output
            console.log("You stare at " + game.room.location);
            update();
        }
    });
};

// Start up the game
update();
