import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';

declare var $: any;

@Component({
  selector: 'app-card-sort-results',
  templateUrl: './card-sort-results.component.html',
  styleUrls: ['./card-sort-results.component.css', '../app.component.css']
})
export class CardSortResultsComponent implements OnInit {

  // tslint:disable-next-line:no-string-literal
  id = this.route.snapshot.params['id'];
  results = [];
  test;
  numberCompleted = 0;
  numberLeft = 0;

  showingMatrix = false;

  root;
  duration = 750;
  i = 0;
  deleteParticipantResultIndex;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
    if (this.id) {
      this.resultsInformation()
        .subscribe(
          res => {
            this.results = (<any>res).result;
            for (let i = 0; i < this.results.length; i++) {
              this.results[i]["exclude"] = false;
            }
            this.test = (<any>res).card_sort_test;
            this.prepareResults();
          },
          err => {
            console.log(err);
          }
        );
    } else {
      this.router.navigate(['card-sort-tests']);
    }
  }

  updateResultParticipants(index) {
    setTimeout(() => {
      this.prepareResults();
    }, 300);
  }

  showResultMatrix(result){
    this.showingMatrix = true;
    for (let r of this.results){
      r['showing'] = false;
    }
    result['showing'] = true;
  }

  resultsInformation() {
    /*const header = new Headers({ Authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('currentUser'))).token});*/
    const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
  };
  // return this.http.post('http://localhost:48792/users/results/' + 
    return this.http.post(this.userService.serverUrl + '/users/card-sort-results/' + this.id, "", httpOptions);
  }

  getIncludeResultNumber() {
    let inc = 0;
    for (let i = 0; i < this.results.length; i++) {
      if (!this.results[i].exclude) inc++;
    }
    return inc;
  }

  prepareResults() {
    this.numberCompleted = 0;
    this.numberLeft = 0;

    for (let i = 0; i < this.results.length; i++) {
      if (!this.results[i].exclude) {
        if (this.results[i].finished) this.numberCompleted++;
        else this.numberLeft++;
      }
    }
  }


  getDuration(results) {
    if (!results.finished) {
      return "Abandoned";
    }
    let totalSeconds = 0;
    let totalMinutes = 0;
    let totalHours = 0;
    for (let i = 0; i < results.results.length; i++) {
      totalSeconds += results.results[i].time;
    }
    return Math.floor(totalSeconds);
  }
  

  closeResultMatrix(){
    this.showingMatrix = false;
    for (let r of this.results){
      r['showing'] = false;
    }
  }


  exportSortingData() {
    let rows = [];
    let cards = [];
    let map = new Map();
    let cardIndex = 0;
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].finished) {
        for (let group of this.results[i].results) {
          for (let cardName of group.group_list) {
            let card_string = cardName.replace(/\r?\n|\r/g, '');

            cards.push(card_string);
            map.set(card_string, cardIndex);
            cardIndex++;
          }
        }
        break;
      }
    }
    rows.push(cards)
    for (let i = 0; i < this.results.length; i++) {
      if (!this.results[i].exclude) {
        let item = new Array<string>(cards.length);
        for(let group of this.results[i].results){
          for (let cardName of group.group_list) {
            let card_string = cardName.replace(/\r?\n|\r/g, '');
            let j = map.get(card_string);
            item[j] = group.group_name;
          }
        }
        rows.push(item);
      }
    }

    let csvContent = "data:text/csv;charset=utf-8,"
        + rows.map(e => e.join(",")).join('\n');

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sorting_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "sorting_data.csv".
  }


  exportUserData() {
    let rows = [];
    let item = [
      "Username",
      "Timestamp",
      "Feedback",
      "Mindset"
    ]
    rows.push(item)
    for (let i = 0; i < this.results.length; i++) {
      if (!this.results[i].exclude) {
        let item = [
          this.results[i].username, 
          this.results[i].timestamp,
          this.results[i].feedback.replace(/\r?\n|\r/g, " "),
          this.results[i].mindset.replace(/\r?\n|\r/g, " ")
        ]
        rows.push(item);
      }
    }
  
    let csvContent = "data:text/csv;charset=utf-8," 
       + rows.map(e => e.join(",")).join('\n');

       var encodedUri = encodeURI(csvContent);
       var link = document.createElement("a");
       link.setAttribute("href", encodedUri);
       link.setAttribute("download", "user_data.csv");
       document.body.appendChild(link); // Required for FF
       
       link.click(); // This will download the data file named "user_data.csv".
  }


  prepareDeleteParticipantResult() {
    console.log("prepared!!");
    console.log(this.deleteParticipantResultIndex);
    this.deleteParticipantResult()
    .subscribe(
      res => {
        this.resultsInformation()
        .subscribe(
          res => {
            this.results = (<any>res).result;
            for (let i = 0; i < this.results.length; i++) {
              this.results[i]["exclude"] = false;
            }
            this.test = (<any>res).test[0];
            this.prepareResults();
          },
          err => {
            console.log(err);
          }
        );
        $("#myModal10").modal('hide');
      },
      err => {
        $("#myModal10").modal('hide');
        alert('An error occured. Please try again later.');
      }
    );
  }

  deleteParticipantResult() {
    const header = new Headers({ Authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('currentUser'))).token});
    const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('currentUser'))).token
      })
  };

  //http://localhost:48792
    return this.http.post(this.userService.serverUrl + '/users/card-sort-result/delete', {id: this.results[this.deleteParticipantResultIndex]._id}, httpOptions);
  }
}
