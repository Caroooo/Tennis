import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from '../../../model/player';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public myForm: FormGroup;
  numberOfPlayers: number;
  maxSingles: number;
  allPlayers: Player[] = [];
  maxRoundsPerPlayer: number;
  singles = [];
  @ViewChildren('players') players: QueryList<ElementRef>;
  @ViewChild('roundsPerDay') roundsPerDay: ElementRef;
  @ViewChild('singlesPerRound') singlesPerRound: ElementRef;
  @ViewChild('doublesPerRound') doublesPerRound: ElementRef;
  @ViewChild('firstday') firstday: ElementRef;
  @ViewChild('secondday') secondday: ElementRef;

  constructor(private _fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.numberOfPlayers = 0;
    this.myForm = this._fb.group({
      players: this._fb.array([
        this.initPlayers(),
      ])
    });
  }

  initPlayers() {
    return this._fb.group({
    });
  }
  addPlayer() {
    this.numberOfPlayers = this.numberOfPlayers + 1;
    this.calcMaxSingles();
    const control = <FormArray>this.myForm.controls['players'];
    control.push(this.initPlayers());
  }

  removePlayer(i: number) {
    this.numberOfPlayers = this.numberOfPlayers - 1;
    this.calcMaxSingles();
    const control = <FormArray>this.myForm.controls['players'];
    control.removeAt(i);
  }

  calcMaxSingles() {
    //amountPlayers/2
    this.maxSingles = this.numberOfPlayers / 2;
  }

  generateMatches() {

    this.players.forEach(p => {
      let player = new Player();
      player.name = p.nativeElement.value;
      player.rounds = 0;
      player.playedWith = [];
      this.allPlayers.push(player);
    })
    this.maxRoundsPerPlayer = this.calcNumberOfRoundsPerYear() / this.numberOfPlayers;

    let i = 0;
    let numberOfDays = this.calcNumberOfDays();
    
    while (i < numberOfDays) {
     this.singles.push(this.calcNewDay());
      i++;
    }
    //this.router.navigateByUrl('/overview');
    console.log(this.singles);
    this.router.navigate(['/overview'], { queryParams: this.singles[0] });
  }

  calcNumberOfDays() {
    let firstDay = new Date(this.firstday.nativeElement.value);
    let lastDay = new Date(this.secondday.nativeElement.value);


    // console.log((lastDay.getMilliseconds() - firstDay.getMilliseconds()));

    this.firstday.nativeElement.value;
    return 20;
  }

  calcNewDay() {
    let numberOfPlayersPerDay = this.calcNumberOfPlayersPerDay();
    let i = 0;
    let playersForThatDay = [];
    playersForThatDay = this.getPlayerWithLessRounds(numberOfPlayersPerDay);

    return this.generateSingles(playersForThatDay, this.singlesPerRound.nativeElement.value * this.roundsPerDay.nativeElement.value);
  }

  generateSingles(players: Player[], numberOfSingles: number) {
    let singles = [];

    let i = 0;
    while (i < numberOfSingles) {

      if (players[i] != undefined && players[i + 1] != undefined) {
        singles[i] = players[i].name + "-" + players[i + 1].name;
      }
      i++;
    }
    return singles;
   // console.log(singles);
  }

  calcNumberOfPlayersPerDay() {
    //numberOfRoundsPerDay * ((numberDoubles * 4) + (numberSingles * 2));
    return this.roundsPerDay.nativeElement.value * ((this.doublesPerRound.nativeElement.value * 4) + (this.singlesPerRound.nativeElement.value * 2));
  }

  getPlayerWithLessRounds(amount: number): Player[] {
    let playerFound = false;
    let i = 0;
    let availablePlayers = this.allPlayers;
    let chosenPlayer = [];
    let k = 0;
    while (k < amount && i < availablePlayers.length) {
      if (availablePlayers[i].rounds < this.maxRoundsPerPlayer) {
        playerFound = true;
        availablePlayers[i].rounds = availablePlayers[i].rounds + 1;
        chosenPlayer.push(availablePlayers[i]);
        availablePlayers.splice(i, 1);
      }
      k++;
      i++;
    }
    return chosenPlayer;
  }

  calcNumberOfRoundsPerYear(): number {
    //todo
    return 50;
  }


}
