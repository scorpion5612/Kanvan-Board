import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  create(){
    var input = (<HTMLInputElement>document.getElementById('create-task-input')).value;
    for(var x in this.tasks){
      if(this.tasks[x].name===input){
	return;
      }
    }
    if(input!==''){
      var task = { name:input,stage:0};
      this.tasks.push(task);
    }
    this.configureTasksForRendering();
  }

  forward(task){
    task.stage++;
    if(task.stage>3){
      task.stage=3;
    }
    this.configureTasksForRendering();
  }
  
  backward(task){
    task.stage--;
    if(task.stage<0){
      task.stage=0;
    }
    this.configureTasksForRendering();
  }

  delete(task){
    var index = this.tasks.indexOf(task);
    this.tasks.splice(index,1);
    this.configureTasksForRendering();
  }
}

interface Task {
  name: string;
  stage: number;
}
