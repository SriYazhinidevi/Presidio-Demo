import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  ionViewDidEnter(){
    setTimeout(() => {
      this.modalController.dismiss();
    }, 3000);
  }
}
