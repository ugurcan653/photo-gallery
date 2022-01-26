import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Network } from '@capacitor/network';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Browser } from '@capacitor/browser';
import {ActionPerformed,PushNotificationSchema,PushNotifications,Token} from '@capacitor/push-notifications';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  photo: any;
  status: any;
  title = 'capacitor-app';
  barcodeData: any;
  token: string = "karpuz";
  isUpdated: any = "bu da boş";
  progress: string = "bi şey yok";
  constructor(private sn: DomSanitizer, private barcodeScanner: BarcodeScanner, private appflowDeploy: Deploy) {
  }
  scanner() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.barcodeData = barcodeData;
     }).catch(err => {
      this.barcodeData =  err;
     });
  }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    var imageUrl = image.webPath as string;
    this.photo = this.sn.bypassSecurityTrustResourceUrl(imageUrl)
  };
  async logCurrentNetworkStatus(){
    this.status = await Network.getStatus();
  };
  async openCapacitorSite(){
    await Browser.open({ url: 'http://capacitorjs.com/', });
  };
  initFCM(){
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
       this.token = token.value;
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }
  async checkUpdate(){
    this.isUpdated = await this.appflowDeploy.checkForUpdate();
    if (this.isUpdated.available) {
      try {
          await this.appflowDeploy.downloadUpdate((progress) => {
            this.progress = `Please wait. Downloading Release %${progress}`;
          });

          await this.appflowDeploy.extractUpdate((progress) => {
            this.progress = `Please wait. Extracting Release %${progress}`;
          });
          await this.appflowDeploy.reloadApp();

      } catch (exp) {
        this.progress = exp
          // failed to update application
      }
  }
  }
}
