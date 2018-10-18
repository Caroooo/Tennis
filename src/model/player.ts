
export class Player {
    name: string;
    rounds: number;
    playedWith: Player[];

    Player(name: string){
        this.name = name;
        this.rounds = 0;
        this.playedWith = [];
    }

}