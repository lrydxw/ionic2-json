import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AlertController } from "ionic-angular";
import { NavController,NavParams } from "ionic-angular";

import { Quote } from "../../data/quote.interface";
import { QuotesService } from "../../services/quotes";
import { QuotePage } from "../quote/quote";
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html'
})
export class QuotesPage implements OnInit {
	pet:string="kittens"; 
  quoteGroup: {category: string, quotes: Quote[], icon: string};
   quoteCollection: {category: string, quotes: Quote[], icon: string}[];
 	searchQuery: string = '';
  items: string[];
  quotes: Quote[];
  quotePage = QuotePage;
  constructor(
    private navParams: NavParams,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private quotesService: QuotesService) {
    	this.initializeItems();
    }
 initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
   
    ]
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }

  // ionViewDidLoad() {
  //   this.quoteGroup = this.navParams.data;
  // Add elvis operator (?) in template to use this approach
  // }

  onAddToFavorites(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: '添加至已举证',
      subTitle: '确定',
      message: '您想添加这条吗?',
      buttons: [
        {
          text: '好',
          handler: () => {
            this.quotesService.addQuoteToFavorites(selectedQuote);
          }
        },
        {
          text: '不',
          role: '取消',
          handler: () => {
            console.log('Cancelled!');
          }
        }
      ]
    });

    alert.present();
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quotesService.removeQuoteFromFavorites(quote);
  }

  isFavorite(quote: Quote) {
    return this.quotesService.isQuoteFavorite(quote);
  }
   ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoriteQuotes();
  }
    onViewQuote(quote: Quote) {
   /* const nav = this.navCtrl.push(QuotePage, quote);*/
     /*nav.present();*/
    /*nav.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.onRemoveFromFavorites(quote);
      }
    });*/
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.onRemoveFromFavorites(quote);
      }
    });
  }
    addXin(){
    	console.log("qqq")
    }
}
