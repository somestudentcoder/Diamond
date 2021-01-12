import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent{

  @Input() ungrouped_cards: [string];

  @Output() output = new EventEmitter<[]>();

  results = [];

  groupName = "";

  constructor() {
    this.results.push({group_name:"One", group_list: ["Two", "Three"]});
  }

  addGroup()
  {
    if(this.groupName == "")
    {
      return
    }
    this.results.push({group_name:this.groupName, group_list: []})
    this.groupName = "";
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  finish(){
    this.output.emit(results);
  }
}
