import { Component  } from '@angular/core';
//import { SQLite } from 'ionic-native';
import { NavController,NavParams } from 'ionic-angular';
import {Storage,SqlStorage} from '../../storage/storage';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'page-test-list',
  templateUrl: 'test-list.html'
})
//需要缓存必须添加下面
//@Injectable()
//只需要在表单的时候绑定一个表单对象,需要传递的数据空间中添加formControlName
//在提交的时候表单对象.value,那么会将表单中的所有带formControlName的值传递到ts文件中
//后面只需要转化成对象提交到后台
//所有的dml操作都使用query来执行
export class TestListPage {
   id: number;// 用来接收上一个页面传递过来的参数
  items=[];
  storage:Storage;

  constructor(public navCtrl: NavController,navParams:NavParams,public changeDetectorRef:ChangeDetectorRef) {
    //   this.items.push( this.items.length );

   this.id=navParams.get('id');
   //alert(this.id);
  var sql='select * from testTable  where id=  '+this.id+'     ' ;
   alert(sql);
    this.storage=new Storage(SqlStorage,{name:'dbTest'});
    this.storage.query(sql, []).then(
      (data)=>{
        console.log("successSelect");
        console.log(data.res.rows.length);
        for(let i=0;i<data.res.rows.length;i++){
            console.log(data.res.rows.item(i).name);
               console.log(data.res.rows.item(i));
            this.items.push({
              id:data.res.rows.item(i).id,
              number:data.res.rows.item(i).number,
              biaoshi:data.res.rows.item(i).biaoshi,
              daima:data.res.rows.item(i).daima,
              tufu:data.res.rows.item(i).tufu,
              quanshu:data.res.rows.item(i).quanshu,
              tumian:data.res.rows.item(i).tumian,
              zuoluo:data.res.rows.item(i).zuoluo,
              bianqian:data.res.rows.item(i).bianqian,
              dilei:data.res.rows.item(i).dilei,
              wenhao:data.res.rows.item(i).wenhao,
              beizhu:data.res.rows.item(i).beizhu,
              tubu:data.res.rows.item(i).tubu,
              yizhi:data.res.rows.item(i).yizhi,
              bili:data.res.rows.item(i).bili,
              waiye:data.res.rows.item(i).waiye,
              length:data.res.rows.item(i).length,
              area:data.res.rows.item(i).area,
              qingkuang:data.res.rows.item(i).qingkuang
              
        });
         
        }
      },(error)=>{
        console.log("errorSelect:"+JSON.stringify(error.err));
      }
    );
    
    
     /*id       VARCHAR( 32 )   UNIQUE,
    number   INT,
    biaoshi  INT,
    daima    INT,
    tufu     INT,
    quanshu  INT,
    tumian   INT,
    zuoluo   VARCHAR( 200 ),
    bianqian INT,
    dilei    INT,
    wenhao   INT,
    beizhu   VARCHAR( 200 ),
    tubu     INT,
    yizhi    VARCHAR( 200 ),
    bili     INT,
    waiye    VARCHAR( 200 ),
    length   INT,
    area     INT */
    
    // let db = new SQLite();
    // db.openDatabase({
    //     name: 'data.db',
    //     location: 'default'
    // }).then(() => {
    //         db.executeSql('select * from testTable', []).then((data) => {
    //           console.log(data.res.rows.length);
    //           for(let i=0;i<data.res.rows.length;i++){
    //             this.items.push({title:data.res.row[i].item[0]});
    //           }
    //     }, (err) => {
    //         console.error('Unable to execute sql: ', err);
    //     });
    // }, (err) => {
    //     console.error('Unable to open database: ', err);
    // });
  }


      UpdateItem(value){
    console.log(11111);
    console.log(value);
    this.storage=new Storage(SqlStorage,{name:'dbTest'});
    this.storage.query('update  testTable  set  name=231 where name=? ', [value]).then(
      (data)=>{
        console.log("successUpdate");
      },(error)=>{
        console.log("errorUpdate:"+JSON.stringify(error.err));
      }
    );
      }


  removeItem(value){
    console.log(11111);
    console.log(value);
    this.storage=new Storage(SqlStorage,{name:'dbTest'});
    this.storage.query('delete from testTable where name=? ', [value]).then(
      (data)=>{
        console.log("successDelete");
      },(error)=>{
        console.log("errorDelete:"+JSON.stringify(error.err));
      }
    );
    
    

    
    //删除集合中的对象
    for(let i = 0; i < this.items.length; i++) {
      console.log(this.items[i].title);
      if(this.items[i].title == value){
        this.items.splice(i, 1);
      }

    }
    
    
    
    
 
  
    
   //this.changeDetectorRef.detectChanges();
    //变量定义的时候需要定义let
    // let db = new SQLite();
    // db.openDatabase({
    //     name: 'data.db',
    //     location: 'default'
    // }).then(() => {
    //         db.executeSql('delete from testTable where name=?', [value.title]).then((data) => {
    //           console.log(data.res.rows.length);
    //           for(let i=0;i<data.res.rows.length;i++){
    //             this.items.push({title:data.res.row[i].item[0]});
    //           }
    //     }, (err) => {
    //         console.error('Unable to execute sql: ', err);
    //     });
    // }, (err) => {
    //     console.error('Unable to open database: ', err);
    // });
  }

  goToBack(){
    this.navCtrl.pop();
  }

  
   getItems(ev: any) {
    // Reset items back to all of the items

    // set vl to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
     /* this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })*/
    
     this.storage=new Storage(SqlStorage,{name:'dbTest'});
       alert(val);
     var sql='select * from NYDGBWLYD where id like  \''+val+'%\'' ;
     alert(sql);
    this.storage.query(sql, []).then(
      (data)=>{
           this.items=[];
        console.log("selectsuccess");
        console.log(data.res.rows.length);
        for(let i=0;i<data.res.rows.length;i++){
            console.log(data.res.rows.item(i).name);
               console.log(data.res.rows.item(i));
            this.items.push({
              id:data.res.rows.item(i).id,
              number:data.res.rows.item(i).number,
              biaoshi:data.res.rows.item(i).biaoshi,
              daima:data.res.rows.item(i).daima,
              tufu:data.res.rows.item(i).tufu,
              quanshu:data.res.rows.item(i).quanshu,
              tumian:data.res.rows.item(i).tumian,
              zuoluo:data.res.rows.item(i).zuoluo,
              bianqian:data.res.rows.item(i).bianqian,
              dilei:data.res.rows.item(i).dilei,
              wenhao:data.res.rows.item(i).wenhao,
              beizhu:data.res.rows.item(i).beizhu,
              tubu:data.res.rows.item(i).tubu,
              yizhi:data.res.rows.item(i).yizhi,
              bili:data.res.rows.item(i).bili,
              waiye:data.res.rows.item(i).waiye,
              length:data.res.rows.item(i).length,
              area:data.res.rows.item(i).area,
              qingkuang:data.res.rows.item(i).qingkuang
              
        });
         
        }
      },(error)=>{
        console.log("errorSelect:"+JSON.stringify(error.err));
      }
    );
    }
  }

}
