export default class ship {
    constructor(name, length, hp) {
        this.name = name;
        this.length = length;
        this.hp = hp;
        this.sink = false;
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
}
