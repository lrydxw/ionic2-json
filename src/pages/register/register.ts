


//import { SQLite } from 'ionic-native';
import { Component  } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Storage,SqlStorage} from '../../storage/storage';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
//需要缓存必须添加下面
//@Injectable()
//只需要在表单的时候绑定一个表单对象,需要传递的数据空间中添加formControlName
//在提交的时候表单对象.value,那么会将表单中的所有带formControlName的值传递到ts文件中
//后面只需要转化成对象提交到后台
export class RegisterPage {
  alert:any;
  storage:Storage;
  registerForm: FormGroup;
  name:String;
  numbers=[];
  constructor(public navCtrl: NavController,navParams:NavParams,private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
    'userName': ['', [Validators.required, Validators.minLength(4)]]
  });
  this.storage=new Storage(SqlStorage,{name:'dbTest'});
  this.storage.query("create table if not exists testTable(name VARCHAR(32))",[]).then(
    (data)=>{
      console.log("successDb");
    },(error)=>{
      console.log("errorDb:"+JSON.stringify(error.err));
    }
  );
  
  
    // SQLite.openDatabase({
    //     name:'testdb.db',
    //     location:'default'
    //   }).then(
    //     (db:SQLite)=>{
    //       db.executeSql('create table if not exists testTable(name VARCHAR(32))', []).then(() => {}).catch(() => {})
    //     }
    //   ).catch(error=>console.error('erroe opening database',error));
  }

  registerModal(value){
    console.log(value.userName);
    this.storage=new Storage(SqlStorage,{name:'dbTest'});
    this.storage.query("insert into testTable (name) values(?)",[value.userName]).then(
      (data)=>{
        console.log("successInsert");
      },(error)=>{
        console.log("errorInsert:"+JSON.stringify(error.err));
      }
    );
    // let db = new SQLite();
    // db.openDatabase({
    //     name: 'data.db',
    //     location: 'default'
    // }).then(() => {
    //         db.executeSql('insert into testTable value(name)', [value.userName]).then(() => {
    //     }, (err) => {
    //         console.error('Unable to execute sql: ', err);
    //     });
    // }, (err) => {
    //     console.error('Unable to open database: ', err);
    // });
  }
}