import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { trigger, style, transition, animate, state, keyframes } from '@angular/animations';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable.js';
import 'jquery-ui/ui/widgets/draggable.js';
import 'jquery-ui/ui/disable-selection.js';


@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
  animations : [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      animate(300, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ]),
    transition('* => void', [
      animate(300, keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
        style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
      ]))
    ])
  ])
  ]
})
export class OutputComponent implements OnInit {
 todos: any;
 itemCount: number;
 itemCounter = [];
 counter: number;
 save: boolean;
 btnUpdt: string;
 note: string;


  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.todo.subscribe(res => this.todos = res);
    this.itemCount = this.todos.length;
    this._data.changeTodo(this.todos);
    this.save = true;
    this.btnUpdt = "Update Note";
    this.note = "#note";
    this.counter =+1; 


    // $( "#outputBox" ).sortable({
    //   revert: true
    // });


    //  $('#note'+ this.todos.length).click(function(){
    //    console.log('woeking');
    // });



  }



  dragItem(i){
    $('#outputBox'+ i).draggable({
      stack: '#outputBox'+i,
      zIndex: 9999
    });

  }  

  removeItem(i){

    this.todos.splice(i,1);
    this._data.todo.subscribe(res => this.todos = res);
    this._data.itemCount.subscribe(res => this.itemCounter = res);
    this.itemCount = this.todos.length;

    this._data.changeCounter(this.itemCount);
    
  

    console.log(this.itemCounter);

  }  
  saveNote(save,i){  
    if(!$('#addNote'+i).attr("disabled")){
      $('#addNote'+i).attr("disabled", true);
      $('#note'+i).val('Update Note');
    }else{
      $('#addNote'+i).attr("disabled", false);
      $('#note'+i).val('Save Changes');
    }
    
    

    
  

  }  

}
