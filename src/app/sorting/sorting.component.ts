import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent{

  @Input() ungrouped_cards: [string];
  @Output() output = new EventEmitter<any[]>();

  results = [];

  groupName = "";

  addGroup()
  {
    if(this.groupName == "")
    {
      return
    }
    this.results.push({group_name:this.groupName, group_list: []})
    this.groupName = "";
  }

  changeGroupName(target)
  {
    this.results[target.id].group_name = target.innerHTML;
  }

  deleteGroup(target)
  {
    if (target.id !== -1) {
      this.results[target.id].group_list.forEach(card => {
        this.ungrouped_cards.push(card)
      });
        this.results.splice(target.id, 1);
    }
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
    this.output.emit(this.results);
  }
}
