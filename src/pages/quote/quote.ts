import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ViewController,ModalController, LoadingController, ToastController } from "ionic-angular";
import { NavParams } from "ionic-angular";
import { NavController } from 'ionic-angular';
import {Geolocation, Camera, File, Entry, FileError} from 'ionic-native';
import { ShoppingListService } from "../../services/shopping-list";
import { Ingredient } from "../../models/ingredient";
import {Storage,SqlStorage} from '../../storage/storage';
import { TestPage } from "../test/test";
import {HomeService} from "../../providers/home-service";
import { TbInfo } from "./../../model/TbInfo"
declare var cordova: any;
@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html'
})
export class QuotePage {
  id: number;// 用来接收上一个页面传递过来的参数
  items=[];
  user: TbInfo;
  storage:Storage;
pet:string="图斑信息"; 
  
  
  locationIsSet = false;
  imageUrl = '';
  imageUrl1 = '';
  imageUrl2 = '';
  listItems: Ingredient[];
    //给image设置默认的图片
  profilePicture111: any="assets/img/live.jpg";
  constructor(private viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private slService: ShoppingListService,
              private navParams: NavParams,
              public navCtrl: NavController,
              public service:HomeService
        ) {


this.service.get().then(data=>{console.log(data);
           // alert(JSON.stringify(data));
        var str=JSON.stringify(data)
         var obj = JSON.parse(str); //由JSON字符串转换为JSON对象
           for(let i=0;i<obj.length;i++){
           	var obj=obj[0];
            var obj1=obj.CHECKFIELDS
             for(let i=0;i<obj1.length;i++){
             	 this.items.push({ALIAS:obj1[0].ALIAS,sum:this.user.BSM,count:this.user.VERSION})
             }
             
           }
        });
        
        
        
this.id=navParams.get('id');
   //alert(this.id);
  var sql='select * from NYDGBWLYD  where BSMID=  '+this.id+'     ' ;
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
/*  onSubmit(form: NgForm) {
    this.placesService
      .addPlace(form.value.title, form.value.description, this.imageUrl);
    form.reset();
    
    this.imageUrl = '';
    this.locationIsSet = false;
  }*/
 ionViewWillEnter() {
    this.loadItems();
  }
   onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }
  

  onClose(remove = false) {
    this.viewCtrl.dismiss(remove);
  }
  
   public path;
  /*profilePicture1: any = "https://www.gravatar.com/avatar/";*/
  //给image设置默认的图片
  profilePicture1: any="assets/img/live.jpg";

  profilePicture2: any="assets/icon/favicon.ico";
  profilePicture3: any="assets/img/video.png";



  
    onTakePhoto1() {
    Camera.getPicture({
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.jpg';
          File.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
            .then(
              (data: Entry) => {
                this.imageUrl1 = data.nativeURL;
                Camera.cleanup();
                // File.removeFile(path, currentName);
              }
            )
            .catch(
              (err: FileError) => {
                this.imageUrl1 = '';
                const toast = this.toastCtrl.create({
                  message: '没有成功调用摄像头,请再尝试一次!',
                  duration: 2500
                });
                toast.present();
                Camera.cleanup();
              }
            );
          this.imageUrl1 = imageData;
          
        }
      )
      .catch(
        err => {
          const toast = this.toastCtrl.create({
            message: '没有成功调用图片,请再尝试一次!',
            duration: 2500
          });
          toast.present();
        }
      );
  }
     onTakePhoto2() {
    Camera.getPicture({
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.jpg';
          File.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
            .then(
              (data: Entry) => {
                this.imageUrl2 = data.nativeURL;
                Camera.cleanup();
                // File.removeFile(path, currentName);
              }
            )
            .catch(
              (err: FileError) => {
                this.imageUrl2 = '';
                const toast = this.toastCtrl.create({
                  message: '没有成功选中图片,请再尝试一次!',
                  duration: 2500
                });
                toast.present();
                Camera.cleanup();
              }
            );
          this.imageUrl2 = imageData;
          
        }
      )
      .catch(
        err => {
          const toast = this.toastCtrl.create({
            message: '没有成功调用图片,请再尝试一次!',
            duration: 2500
          });
          toast.present();
        }
      );
  }
      choosePhoto() {


    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType:0,//0对应的值为PHOTOLIBRARY ，即打开相册
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,//是否需要截图,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      this.path = base64Image;
      this.profilePicture1=base64Image;
      alert(base64Image);
    }, (err) => {
      // Handle error
    });

  }

  saoPhoto() {
      var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType:0,//0对应的值为PHOTOLIBRARY ，即打开相册
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,//是否需要截图,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      this.path = base64Image;
      this.profilePicture2=base64Image;
      alert(base64Image);
    }, (err) => {
      // Handle error
    });

  }
       chooseVideo() {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType:0,
      mediaType: 1,//为1时允许选择视频文件
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      this.path = base64Image;
      this.profilePicture3="assets/img/video.png";//选择视频后，image另外显示一张图片，目前还无法获取视频的第一帧图片。
      alert(this.path);
    }, (err) => {
      // Handle error
    });

  }
       map(){
       	this.navCtrl.push(TestPage);
       }
    
}
