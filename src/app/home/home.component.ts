import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable.js';
import 'jquery-ui/ui/widgets/draggable.js';
import 'jquery-ui/ui/disable-selection.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [

  	trigger('todos',  [
  		transition('* => *', [
  			query(':enter', style({opacity: 0}), {optional:true}),

  			query(':enter', stagger('300ms', [
  				animate('.6s ease-in', keyframes([
  					style({opacity: 0, transform: 'translateY( -75%)', offset: 0}),
  					style({opacity: .5, transform: 'translateY( 35px)',offset: 1}),
  				]))
  			]),{optional:true}),

  			query(':leave', stagger('300ms', [
  				animate('.6s ease-in', keyframes([
  					style({opacity: 0, transform: 'translateY(0)', offset: 0}),
  					style({opacity: .5, transform: 'translateY( 35px)', offset: .3}),
  					style({opacity: 1, transform: 'translateY(-75%)', offset: 1}),
  				]))
  			]),{optional:true})  			
  		])
  	])

  ]
})
export class HomeComponent implements OnInit {

	itemCount: number;
	btnText: string = 'Add Note Title ';
	todoText: string;
	todos = [];
  skinColor: string;

  skins = [
    { name: "Yellow", value: 1 },
    { name: "Black", value: 2 },
    { name: "White", value: 3 },
    { name: "Blue/Default", value: 4 }
  ]

	constructor(private _data: DataService) { }

	ngOnInit() {

    this._data.itemCount.subscribe(res => this.itemCount = res);
    this.itemCount = this.todos.length;
    this._data.changeTodo(this.todos);

	}

	addItem(){


    this._data.todo.subscribe(res => this.todos = res);
    console.log(this.todoText);
    if(!this.todoText) {
      alert('Please add a note title');
    }else{
      this.todos.push(this.todoText);
    }
		
		this.todoText = '';
		this.itemCount = this.todos.length;
    this._data.changeTodo(this.todos);
    console.log(this.todos);
	}

  selectSkin(){
    
    if(this.skinColor == "Yellow"){;
      $('html').css('--main-lighter-color', "yellow");
      $('html').css('--main-bg-color', 'black');
      $('input, .btn, textarea, select').css({'background-color':'black','color':'white'});
    }else if(this.skinColor == "Blue/Default"){
      $('html').css('--main-lighter-color', "#00BCD4");
      $('html').css('--main-bg-color', '#fafafa');
      $('input, .btn, textarea, select').css({'background-color':'#fafafa9e','color':'black'});
    }else if(this.skinColor == "Black"){
      $('html').css('--main-lighter-color', "black");
      $('html').css('--main-bg-color', '#fafafa');
      $('input, .btn, textarea, select').css({'background-color':'#fafafa9e','color':'black'});
    }else if(this.skinColor == "White"){
      $('html').css('--main-lighter-color', "#fafafa");
      $('html').css('--main-bg-color', 'black');
      $('input, .btn, textarea, select').css({'background-color':'#000000ad','color':'white'});
    }
    

  }

}
