import { Component, OnInit } from '@angular/core';

import { Quote } from "../../data/quote.interface";
import quotes from '../../data/quotes';
//import { QuotesPage } from "../quotes/quotes";
import { LiuPage } from "../liu/liu";

//add by chenwei
import { RegisterPage } from "../register/register";
import { TestListPage } from "../test-list/test-list";
import { TestPage } from "../test/test";
import { NavController,NavParams } from 'ionic-angular';

import {HomeService} from "../../providers/home-service";
import { TbInfo } from "./../../model/TbInfo"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
   providers:[HomeService]
})
export class HomePage   {
  id: number;// 用来接收上一个页面传递过来的参数
  user: TbInfo;
  items=[];
  LiuPage=LiuPage;
  profilePicture="assets/icon/logo.gif";
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:HomeService) 
    {
      this.service.get().then(data=>{console.log(data);
           // alert(JSON.stringify(data));
        var str=JSON.stringify(data)
         var obj = JSON.parse(str); //由JSON字符串转换为JSON对象
           for(let i=0;i<obj.length;i++){
              this.user=obj[i];
            
              this.items.push({ALIAS:this.user.ALIAS,sum:this.user.BSM,count:this.user.VERSION})
           }
        });
    }

  
 login(){  
    this.navCtrl.push(RegisterPage);
      }

 login1(){  
    this.navCtrl.push(TestPage);
      }

 
}



