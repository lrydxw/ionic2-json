import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage,SqlStorage} from '../../storage/storage';
//import {  TestListPage } from "../test-list/test-list";
import { QuotePage  } from "../quote/quote";
/*
  Generated class for the Liu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-liu',
  templateUrl: 'liu.html'
})
export class LiuPage {
 pet:string="test1";
 items=[];
 items1=[];
 items2=[];
  storage:Storage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.storage=new Storage(SqlStorage,{name:'dbTest'});
    this.storage.query('select * from NYDGBWLYD', []).then(
      (data)=>{
        console.log("successSelect");
        console.log(data.res.rows.length);
        for(let i=0;i<data.res.rows.length;i++){
            console.log(data.res.rows.item(i).name);
               console.log(data.res.rows.item(i));
             

            this.items.push({
              id:data.res.rows.item(i).BSMID,
              number:data.res.rows.item(i).FID,
              biaoshi:data.res.rows.item(i).TBBSM,
              daima:data.res.rows.item(i).XZQDM,
              tufu:data.res.rows.item(i).TFH,
              quanshu:data.res.rows.item(i).QSDWMC,
              tumian:data.res.rows.item(i).TBMJ,
              zuoluo:data.res.rows.item(i).ZLDWMC,
              bianqian:data.res.rows.item(i).BGQDLBM,
              dilei:data.res.rows.item(i).DLBM,
              wenhao:data.res.rows.item(i).WJH,
              beizhu:data.res.rows.item(i).BZ,
              tubu:data.res.rows.item(i).TBFB,
              yizhi:data.res.rows.item(i).SFYYXYZ,
              bili:data.res.rows.item(i).BYZBL,
              waiye:data.res.rows.item(i).SFSQZXWY,
              length:data.res.rows.item(i).SHAPELENGTH,
              area:data.res.rows.item(i).SHAPEAREA,
              qingkuang:data.res.rows.item(i).QKSM
              
        });
         
        }
      },(error)=>{
        console.log("errorSelect:"+JSON.stringify(error.err));
      }
    );


        this.storage.query('select * from NYDGBWLYD where BYZBL=1', []).then(
      (data)=>{
        console.log("successSelect");
        console.log(data.res.rows.length);
        for(let i=0;i<data.res.rows.length;i++){
            console.log(data.res.rows.item(i).name);
               console.log(data.res.rows.item(i));
            this.items1.push({
              id:data.res.rows.item(i).BSMID,
              number:data.res.rows.item(i).FID,
              biaoshi:data.res.rows.item(i).TBBSM,
              daima:data.res.rows.item(i).XZQDM,
              tufu:data.res.rows.item(i).TFH,
              quanshu:data.res.rows.item(i).QSDWMC,
              tumian:data.res.rows.item(i).TBMJ,
              zuoluo:data.res.rows.item(i).ZLDWMC,
              bianqian:data.res.rows.item(i).BGQDLBM,
              dilei:data.res.rows.item(i).DLBM,
              wenhao:data.res.rows.item(i).WJH,
              beizhu:data.res.rows.item(i).BZ,
              tubu:data.res.rows.item(i).TBFB,
              yizhi:data.res.rows.item(i).SFYYXYZ,
              bili:data.res.rows.item(i).BYZBL,
              waiye:data.res.rows.item(i).SFSQZXWY,
              length:data.res.rows.item(i).SHAPELENGTH,
              area:data.res.rows.item(i).SHAPEAREA,
              qingkuang:data.res.rows.item(i).QKSM
              
        });
         
        }
      },(error)=>{
        console.log("errorSelect:"+JSON.stringify(error.err));
      }
    );


        this.storage.query('select * from NYDGBWLYD where BYZBL=0 ', []).then(
      (data)=>{
        console.log("successSelect");
        console.log(data.res.rows.length);
        for(let i=0;i<data.res.rows.length;i++){
            console.log(data.res.rows.item(i).name);
               console.log(data.res.rows.item(i));
             

            this.items2.push({
              id:data.res.rows.item(i).BSMID,
              number:data.res.rows.item(i).FID,
              biaoshi:data.res.rows.item(i).TBBSM,
              daima:data.res.rows.item(i).XZQDM,
              tufu:data.res.rows.item(i).TFH,
              quanshu:data.res.rows.item(i).QSDWMC,
              tumian:data.res.rows.item(i).TBMJ,
              zuoluo:data.res.rows.item(i).ZLDWMC,
              bianqian:data.res.rows.item(i).BGQDLBM,
              dilei:data.res.rows.item(i).DLBM,
              wenhao:data.res.rows.item(i).WJH,
              beizhu:data.res.rows.item(i).BZ,
              tubu:data.res.rows.item(i).TBFB,
              yizhi:data.res.rows.item(i).SFYYXYZ,
              bili:data.res.rows.item(i).BYZBL,
              waiye:data.res.rows.item(i).SFSQZXWY,
              length:data.res.rows.item(i).SHAPELENGTH,
              area:data.res.rows.item(i).SHAPEAREA,
              qingkuang:data.res.rows.item(i).QKSM
              
        });
         
        }
      },(error)=>{
        console.log("errorSelect:"+JSON.stringify(error.err));
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiuPage');
  }

  getItems(ev: any) {
 
 
    let val = ev.target.value;
    var sql;
       if (val && val.trim() != '') {
       sql='select * from NYDGBWLYD where BSMID like  \''+val+'%\'' ;
      }
      else
       {   sql='select * from NYDGBWLYD' ; }

     this.storage=new Storage(SqlStorage,{name:'dbTest'});
     this.storage.query(sql, []).then(
      (data)=>{
          this.items=[]; //清空搜索前的数据
        console.log("successSelect");
        console.log(data.res.rows.length);
        for(let i=0;i<data.res.rows.length;i++){
            console.log(data.res.rows.item(i).name);
               console.log(data.res.rows.item(i));
             

            this.items.push({
              id:data.res.rows.item(i).BSMID,
              number:data.res.rows.item(i).FID,
              biaoshi:data.res.rows.item(i).TBBSM,
              daima:data.res.rows.item(i).XZQDM,
              tufu:data.res.rows.item(i).TFH,
              quanshu:data.res.rows.item(i).QSDWMC,
              tumian:data.res.rows.item(i).TBMJ,
              zuoluo:data.res.rows.item(i).ZLDWMC,
              bianqian:data.res.rows.item(i).BGQDLBM,
              dilei:data.res.rows.item(i).DLBM,
              wenhao:data.res.rows.item(i).WJH,
              beizhu:data.res.rows.item(i).BZ,
              tubu:data.res.rows.item(i).TBFB,
              yizhi:data.res.rows.item(i).SFYYXYZ,
              bili:data.res.rows.item(i).BYZBL,
              waiye:data.res.rows.item(i).SFSQZXWY,
              length:data.res.rows.item(i).SHAPELENGTH,
              area:data.res.rows.item(i).SHAPEAREA,
              qingkuang:data.res.rows.item(i).QKSM
              
        });
         
        }
      },(error)=>{
        console.log("errorSelect:"+JSON.stringify(error.err));
      }
    );


 if (val && val.trim() != '') {
      sql='select * from NYDGBWLYD where  BYZBL=1 and BSMID like  \''+val+'%\'' ;
      }
      else
       {   sql='select * from NYDGBWLYD where  BYZBL=1  ' ; }

  
    this.storage.query(sql, []).then(
      (data)=>{
          this.items1=[]; //清空搜索前的数据
        console.log("successSelect");
        console.log(data.res.rows.length);
        for(let i=0;i<data.res.rows.length;i++){
            console.log(data.res.rows.item(i).name);
               console.log(data.res.rows.item(i));
             

            this.items1.push({
              id:data.res.rows.item(i).BSMID,
              number:data.res.rows.item(i).FID,
              biaoshi:data.res.rows.item(i).TBBSM,
              daima:data.res.rows.item(i).XZQDM,
              tufu:data.res.rows.item(i).TFH,
              quanshu:data.res.rows.item(i).QSDWMC,
              tumian:data.res.rows.item(i).TBMJ,
              zuoluo:data.res.rows.item(i).ZLDWMC,
              bianqian:data.res.rows.item(i).BGQDLBM,
              dilei:data.res.rows.item(i).DLBM,
              wenhao:data.res.rows.item(i).WJH,
              beizhu:data.res.rows.item(i).BZ,
              tubu:data.res.rows.item(i).TBFB,
              yizhi:data.res.rows.item(i).SFYYXYZ,
              bili:data.res.rows.item(i).BYZBL,
              waiye:data.res.rows.item(i).SFSQZXWY,
              length:data.res.rows.item(i).SHAPELENGTH,
              area:data.res.rows.item(i).SHAPEAREA,
              qingkuang:data.res.rows.item(i).QKSM
              
        });
         
        }
      },(error)=>{
        console.log("errorSelect:"+JSON.stringify(error.err));
      }
    );



    
    if (val && val.trim() != '') {
      sql='select * from NYDGBWLYD where  BYZBL=0 and BSMID like  \''+val+'%\'' ;
      }
      else
       {   sql='select * from NYDGBWLYD where  BYZBL=0  ' ; }

    this.storage.query(sql, []).then(
      (data)=>{
          this.items2=[]; //清空搜索前的数据
        console.log("successSelect");
        console.log(data.res.rows.length);
        for(let i=0;i<data.res.rows.length;i++){
            console.log(data.res.rows.item(i).name);
               console.log(data.res.rows.item(i));
             

            this.items2.push({
              id:data.res.rows.item(i).BSMID,
              number:data.res.rows.item(i).FID,
              biaoshi:data.res.rows.item(i).TBBSM,
              daima:data.res.rows.item(i).XZQDM,
              tufu:data.res.rows.item(i).TFH,
              quanshu:data.res.rows.item(i).QSDWMC,
              tumian:data.res.rows.item(i).TBMJ,
              zuoluo:data.res.rows.item(i).ZLDWMC,
              bianqian:data.res.rows.item(i).BGQDLBM,
              dilei:data.res.rows.item(i).DLBM,
              wenhao:data.res.rows.item(i).WJH,
              beizhu:data.res.rows.item(i).BZ,
              tubu:data.res.rows.item(i).TBFB,
              yizhi:data.res.rows.item(i).SFYYXYZ,
              bili:data.res.rows.item(i).BYZBL,
              waiye:data.res.rows.item(i).SFSQZXWY,
              length:data.res.rows.item(i).SHAPELENGTH,
              area:data.res.rows.item(i).SHAPEAREA,
              qingkuang:data.res.rows.item(i).QKSM
              
        });
         
        }
      },(error)=>{
        console.log("errorSelect:"+JSON.stringify(error.err));
      }
    );
 }


getData(item){
     // alert(item.id);
	 this.navCtrl.push(QuotePage,{id:item.id});
}
onViewQuote()
{
	
}



}
