let shipCount = {};

export default class Ship {
    constructor(angle, length, location) {
        this.length = length;
        this.name = this.createShipName(length);
        this.hp = length;
        this.sink = false;
        this.location = location;
        this.angle = angle;
    }

    shipHit() {
        this.hp--;
        if (this.hp <= 0) {
            this.shipSunk();
        }
    }

    shipSunk() {
        this.sink = true;
    }

    createShipName(length) {
        if (length === 2) {
            return "Destroer";
        }
        else if (length === 3) {
            return "Submarine"
        }
        else if (length === 3) {
            return "cruister"
        }

        else {
            const count = shipCount[length] || 0;
            shipCount[length] = count + 1;
            return `Ship${count}`;
        }
    }

    // assertLocation(coordinatesToCheck, callback) {
    //     let allPlaced = true;
    //     coordinatesToCheck.forEach(coord => {
    //         if (!callback.placeBoat(coord)) {
    //             allPlaced = false;
    //         }
    //     });

    //     if (allPlaced) {
    //         return coordinatesToCheck;
    //     }
    //     return "try again";
    // }
}
