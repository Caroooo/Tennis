import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface TennisMatch {
  date: string;
  firstSingle: string;
  resultFirstSingle: string;
  secondSingle: string;
  resultSecondSingle: string;
  waiting: string;
}

const ELEMENT_DATA: TennisMatch[] = [
  { date: "10/17/2018", firstSingle: 'Matthias - Robert', resultFirstSingle: "", secondSingle: "Christina - Udo", resultSecondSingle: "", waiting: "Bernhard/Dunja" },
  { date: "10/24/2018", firstSingle: 'Bernhard - Robert', resultFirstSingle: "", secondSingle: "Matthias - Dunja", resultSecondSingle: "", waiting: "Christina/Robert" },
  { date: "10/24/2018", firstSingle: 'Bernhard - Dunja', resultFirstSingle: "", secondSingle: "Christina - Robert", resultSecondSingle: "", waiting: "Matthias/Robert" },
  { date: "10/17/2018", firstSingle: 'Matthias - Robert', resultFirstSingle: "", secondSingle: "Christina - Udo", resultSecondSingle: "", waiting: "Bernhard/Dunja" },
  { date: "10/24/2018", firstSingle: 'Bernhard - Robert', resultFirstSingle: "", secondSingle: "Matthias - Dunja", resultSecondSingle: "", waiting: "Christina/Robert" },
  { date: "10/24/2018", firstSingle: 'Bernhard - Dunja', resultFirstSingle: "", secondSingle: "Christina - Robert", resultSecondSingle: "", waiting: "Matthias/Robert" },
  { date: "10/17/2018", firstSingle: 'Matthias - Robert', resultFirstSingle: "", secondSingle: "Christina - Udo", resultSecondSingle: "", waiting: "Bernhard/Dunja" },
  { date: "10/24/2018", firstSingle: 'Bernhard - Robert', resultFirstSingle: "", secondSingle: "Matthias - Dunja", resultSecondSingle: "", waiting: "Christina/Robert" },
  { date: "10/24/2018", firstSingle: 'Bernhard - Dunja', resultFirstSingle: "", secondSingle: "Christina - Robert", resultSecondSingle: "", waiting: "Matthias/Robert" }
];

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  displayedColumns: string[] = ['date', 'firstSingle', 'resultFirstSingle', 'secondSingle', 'resultSecondSingle', 'waiting'];
  dataSource = ELEMENT_DATA;
  singles = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(param => {
      this.singles[0] = param[0];
      this.singles[1] = param[1];

     // JSON.stringify(this.singles);
      console.log("singles:");
      console.log(this.singles);
    });
  }

  ngOnInit() {
    // console.log(this.singles);

  }

}
