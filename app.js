'use strict';

// Get NodeJS items
const util = require('util');
const color = require('cli-color');

// Get game items
const GAMEDATA = require('./game.json');
const { Engine } = require('./engine');

// Setup text-interface for user input
const input = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create the Game object
const game = new Engine(GAMEDATA);

// Clear console
process.stdout.write(color.erase.screen);

// Print out the title and author
process.title = game.title;
console.log("\n " + color.bold.whiteBright(game.title));
console.log(color.italic("  By: " + game.author) + " \n");

let dashes = "";
for (let d = 0; d < game.title.length - 2; d++) {
    dashes += "-";
}

console.log("  " + dashes + " \n");

// Give the context of the room.
if (typeof game.currentRoom.context === "string") {
    console.log(color.cyanBright(' ? ') + game.currentRoom.context);
} else {
    for (let i = 0; i < game.currentRoom.context.length; i++) {
        console.log(color.cyanBright(' ? ') + game.currentRoom.context[i]);
    }
}

// The game loop
let update = () => {

    // Ask what the player wants to do.
    input.question("\n" + color.whiteBright(" > "), (res) => {
        // receive message and chop it up
        let message = res.split(" ");

        let output = "\n ";

        // decide what the player wants to do
        if (message[0] !== '') {
            switch (message[0]) {
                case "search": // look for something
                case "where":
                case "look": 
                    for (let i = 1; i < message.length; i++) {
                        switch (message[i]) {
                            case "exit":
                                output += game.player.look(game.currentRoom, message[i]);
                                break;
                            case "items":
                                output += game.player.look(game.currentRoom, 'items');
                                break;
                            case "around":
                                output += game.player.look(game.currentRoom, 'around');
                                break;
                        }
                    }
                    break;
                case "pickup": // pickup an item
                    if (message.length >= 2) {
                        let item = game.player.pickup(game.currentRoom, message[1]);
                        output += "You picked up a " + item.name;
                    }
                    break;
                case "quit":
                    process.exit();
                    break;
                case "goto":
                    if (message.length >= 2) {
                        game.goto(message[1]);
                    } else {
                        output += "Please enter a direction.";
                    }
                    break;
                case "debug":
                    switch (message[1]) {
                        case "items":
                            if (game.player.inventory.length > 0) {
                                output += "You have: ";

                                for (let i = 0; i < game.player.inventory.length; i++) {
                                    if (i === game.player.inventory.length - 1) {
                                        output += game.player.inventory[i].name;
                                    } else {
                                        output += game.player.inventory[i].name + ", ";
                                    }
                                }
                            } else {
                                output += "Nothing";
                            }
                            break;
                        default:
                            output += "That is not a command.";
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
            console.log("You stare at " + game.currentRoom.location);
            update();
        }
    });
};

// Start up the game
update();
