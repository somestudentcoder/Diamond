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

  getData() {
    const v = $('#test-tree').jstree(true).get_json('#', {flat: true});
    const mytext = JSON.stringify(v);
    //this.createTree('test-tree2', v);
  }

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
  }

  onFileSelect(input: HTMLInputElement) {

    const files = input.files;
    var content = this.csvContent;
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

      let lines = [];

      fileReader.onload = (e) => {
        let spliter = ",";
        let csv = fileReader.result;
        let allTextLines = (<any>csv).split(/\r|\n|\r/);
        let headers = allTextLines[0].split(',');
        if (headers.length <= 1) {
          headers = allTextLines[0].split(';');
          spliter = ";";
        }

        for (let i = 0; i < allTextLines.length; i++) {
          // split content based on comma
          let data = allTextLines[i].split(spliter);
          if (data.length === headers.length) {
            let tarr = [];
            for (let j = 0; j < headers.length; j++) {
              tarr.push(data[j]);
            }

            lines.push(tarr);
          }
        }



        var currentIndex = 0;
        var node = {
          id: "root",
          text: lines[0][0].replace(/"/g,''),
          index: 0,
          parent: "#"
        };
        var currentNode = {
          id: "",
          text: "",
          index: null,
          parent: ""
        };
        var items = [node];
        for (var i = 1; i < lines.length; i++) { //start from second line
          currentIndex = 0; //current row position
          for (var j = 0; j < lines[i].length; j++) { //go through whole line until finding item which is tabbed
            if (lines[i][j] === '') {
              currentIndex++;
            } else {
              currentNode = {
                id: Math.random().toString(36).substring(7),
                text: lines[i][j].replace(/"/g,''),
                index: currentIndex,
                parent: ""
              };
              for (var k = items.length - 1; k >= 0; k--) {
                if (currentNode.text === "University") {
                }
                if (items[k].index === currentIndex - 1) {
                  if (currentNode.text === "University") {
                  }
                  currentNode.parent = items[k].id;
                  break;
                }
              }
              items.push(currentNode);
            }
          }
        }

        this.itemsFinal = items;

        $('#test-tree').jstree("destroy").empty();
        //this.createTree('test-tree', []);

        setTimeout(() => {
          for (var i = 0; i < items.length; i++) {
            $('#test-tree').jstree().create_node((<any>items[i]).parent, {
              "id": items[i].id,
              "text": items[i].text,
              "parent": (<any>items[i]).parent,
              "data": { "index": items[i].index },
            }, "last", function() {
            });
          }
        }, 300);

        $('#test-tree-answer').jstree("destroy").empty();
        //this.createTree('test-tree-answer', []);

        setTimeout(() => {
          for (var i = 0; i < items.length; i++) {
            $('#test-tree-answer').jstree().create_node((<any>items[i]).parent, {
              "id": items[i].id,
              "text": items[i].text,
              "parent": (<any>items[i]).parent,
              "data": { "index": items[i].index },
            }, "last", function() {
            });
          }
        }, 300);

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
