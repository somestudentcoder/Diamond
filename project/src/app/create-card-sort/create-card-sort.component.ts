import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { CardListComponent } from '../card-list/card-list.component';

declare var $: any;

@Component({
  selector: 'app-create-card-sort',
  templateUrl: './create-card-sort.component.html',
  styleUrls: ['./create-card-sort.component.css', '../app.component.css']
})
export class CreateCardSortComponent implements OnInit {
  randomTestId = Math.random().toString(36).substring(2, 15);
  testName = '';
  studyPassword = '';

  currentTaskIndex = 0;
  // tslint:disable-next-line:no-string-literal
  id = this.route.snapshot.params['id'];

  welcomeMessage = "Welcome to this card sorting study!";
  instructions = "Please group the provided cards as you see fit.";
  thankYouScreen = "Thank you for participation.";
  leaveFeedback = "Your results are saved. You can give us your feedback (optional).";

  leafNodes = true;
  orderNumbers = true;

  cardName = "";
  cards:string[] = [];
  currentlySelectedCard = "";

  canSave = false;


  csvContent;
  baseurl = "";

  itemsFinal;

  constructor(private http: HttpClient, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
    this.baseurl = location.origin;
    if (this.id) {
      const body = {
        id: this.id
      };
      this.testInformation(body)
          .subscribe(
              res => {
                // tslint:disable-next-line:no-angle-bracket-type-assertion
                this.testName = (res as any).name;
                this.studyPassword = (res as any).password;
                this.cardName = (res as any).name;
                this.welcomeMessage = (res as any).welcomeMessage;
                this.instructions = (res as any).instructions;
                this.thankYouScreen = (res as any).thankYouScreen;
                this.leaveFeedback = (res as any).leaveFeedback;
                if ((res as any).leafNodes !== undefined) {
                  this.leafNodes = (res as any).leafNodes;
                  this.orderNumbers = (res as any).orderNumbers;
                }
              },
              err => {
              }
          );
      // get it from database
      this.randomTestId = this.id;
      // this.testName = t
    } else {
      const arrayCollection = [
        {id: 'root', parent: '#', text: 'Root', 'state' : {
            'selected' : true
          },}
      ];
      //this.createTree('test-tree', arrayCollection);
    }
  }

  open(link) {;
    $('a[href="#' + link + '"]').click();
  }

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
  }

  onFileSelect(input: HTMLInputElement) {

    const files = input.files;
    //var content = this.csvContent;
    if (files && files.length) {

      const fileToRead = files[0];
      let extension = fileToRead.name.split(".");
      if (extension[extension.length -1] !== "csv") {
        alert("File extension is wrong! Please provide .csv file.");
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;

      fileReader.readAsText(fileToRead, "UTF-8");

      fileReader.onload = (e) => {
        let splitter = ",";
        let csv = fileReader.result;
        let allCards = (<any>csv).split(splitter)
        if (allCards.length <= 1) {
          allCards = (<any>csv).split(';');
        }

        allCards.forEach(card => {
          if(card == "")
          {
            let index = allCards.indexOf(card);
            if (index !== -1) {
                allCards.splice(index, 1);
            }
          } 
        });
        this.cards = allCards;
        console.log(this.cards)
      }
    }

    (<any>document).getElementById("file").value = "";

  }

  selectCard(name: string)
  {
    this.currentlySelectedCard = name;
  }

  addCard() {
    if(this.cardName == '')
    {
      return;
    }
    else
    {
      this.cards.push(this.cardName);
      this.cardName = "";
    }
  }

  renameCard() {
    let index = this.cards.indexOf(this.currentlySelectedCard);
    if (index !== -1) {
        this.cards[index] = this.cardName;
        this.cardName = "";
    }
  }

  deleteSelectedCard() {
    let index = this.cards.indexOf(this.currentlySelectedCard);
    if (index !== -1) {
        this.cards.splice(index, 1);
    }
  }

  saveTest(showPopup?) {
    let passTmp = "";
    if (this.studyPassword === "") {
      passTmp = "empty";
    } else {
      passTmp = this.studyPassword;
    }
    const test = {
      name: this.testName,
      launched: false,
      password: passTmp,
      id: this.randomTestId,
      user: JSON.parse(localStorage.getItem('currentUser')).email,
      welcomeMessage: this.welcomeMessage,
      instructions: this.instructions,
      thankYouScreen: this.thankYouScreen,
      leaveFeedback: this.leaveFeedback,
      orderNumbers: this.orderNumbers
    };

    if(showPopup) {
      let lang = localStorage.getItem('tt-language');
      if (lang === 'en')
        alert("Saved!");
      else
        alert("Gespeichert!");
    }
    if (!this.id) { // new test
      this.postTestData(test)
          .subscribe(
              res => {
                console.log(res);
                this.id = this.randomTestId;
              },
              err => {
                console.log(err);
              }
          );
    } else { // edit existing test
      this.editTest(test)
          .subscribe(
              res => {
                console.log(res);
              },
              err => {
                console.log(err);
              }
          );
    }
  }

  postTestData(object) {
    const header = new Headers({ Authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('currentUser'))).token});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('currentUser'))).token
      })
    };
    //return this.http.post('http://localhost:48792/users/test/add', object,
    return this.http.post(this.userService.serverUrl + '/users/test/add', object, httpOptions);
  }

  testInformation(id) {
    const header = new Headers({ Authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('currentUser'))).token});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        Authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('currentUser'))).token
      })
    };
    //return this.http.post('http://localhost:48792/users/test/get', id,
    return this.http.post(this.userService.serverUrl + '/users/test/get', id, httpOptions);
  }

  editTest(object) {
    const header = new Headers({ Authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('currentUser'))).token});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('currentUser'))).token
      })
    };
    //return this.http.post('http://localhost:48792/users/test/edit', 
    return this.http.post(this.userService.serverUrl +  '/users/test/edit', object, httpOptions);
  }

}
