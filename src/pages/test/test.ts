
import { NavController, NavParams } from 'ionic-angular';

 import {Component, ViewChild, ElementRef} from '@angular/core';

  declare var AMap;
@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {
 @ViewChild('map_container') map_container: ElementRef;
    map: any;//地图对象

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

 ionViewDidEnter() {
      this.map = new AMap.Map(this.map_container.nativeElement, {
        view: new AMap.View2D({//创建地图二维视口
          zoom: 11, //设置地图缩放级别
          rotateEnable: true,
          showBuildingBlock: true
        })
      });
    }
}
