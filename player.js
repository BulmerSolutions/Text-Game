class Player {
  /**
   * @param {String} name Name of player
   */
  constructor(name) {
    this.name = name;
    this.weapon;
    this.inventory = [];
  }

  /**
   * @param {JSON} room Room to pickup item from
   * @param {String} item Item to be picked up
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
      room.collectables[itemIndex].index = itemIndex;
      return room.collectables[itemIndex]
    } else {
      return null;
    }
  }

  /**
   * @param {JSON} room Room to room in
   * @param {String} action What to look for
   */
  look(room, action) {
    let text = "";
    switch(action) {
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
          text = "There are no exits to be seen."
        }

        return text;

        break;
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
          return "There are no items."
        }
        break;
    }
  }
}

module.exports = new Player();
