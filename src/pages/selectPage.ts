import { Component  } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'my-component',
  template:`<ion-item><ion-input type="text" #number (blur)="createSelect(number.value)"></ion-input></ion-item>
   <div *ngIf="number.value!=''" >
      <select #selectOption *ngFor="let item of numbers  , let i=index" (change)="selectValue(selectOption.value,i)">
          <option>请选择部门</option>
          <option *ngFor="let option of item.list" >{{option}}</option>
      </select>
   </div>`
})

//第二个方法
export class SelectPage {
  numbers=[];
  option1=[];
  option2=[];
  option3=[];
  option4=[];
  option5=[];
  constructor(public navCtrl: NavController,navParams:NavParams) {
   
  }

  createSelect(value){
    this.numbers=[];
    for(let i=1;i<=value;i++){
      console.log("----"+i);
      if(i==1){
        this.option1=[];
        this.option1.push("技术部");
        this.option1.push("人事部");
        this.numbers.push({list:this.option1});
      }
      if(i==2){
        this.option2=[];
        this.numbers.push({list:this.option2});
      }
      if(i==3){
        this.option3=[];
        this.numbers.push({list:this.option3});
      }
      if(i==4){
        this.option4=[];
        this.numbers.push({list:this.option4});
      }
      if(i==5){
        this.option5=[];
        this.numbers.push({list:this.option5});
      }
    }
  }

  selectValue(value,n){
    console.log("----"+n);
    console.log("----"+value);
    n+=1;
    if(n==1){
      this.option2=[];
      //到时候链接服务器的时候只需要替换下option2的内容即可,不需要写if判断
      if(value=="技术部"){
        if(n<this.numbers.length){
          this.option2.push("高磊");
          this.option2.push("高磊1");
          this.option2.push("高磊2");
          this.numbers[n]={list:this.option2};
        }
      }else if(value=="人事部"){
        if(n<this.numbers.length){
          this.option2.push("伊莉莉");
          this.option2.push("伊莉莉1");
          this.option2.push("伊莉莉2");
          this.numbers[n]={list:this.option2};
        }
      }
    }else if(n==2){
      this.option3=[];
      if(n<this.numbers.length){
        this.numbers[n]={list:this.option3};
      }
    }else if(n==3){
      this.option4=[];
      if(n<this.numbers.length){
        this.numbers[n]={list:this.option4};
      }
    }else if(n==4){
      this.option5=[];
      if(n<this.numbers.length){
        this.numbers[n]={list:this.option5};
      }
    }
  }
}