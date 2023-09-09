import { Injectable } from '@angular/core';

import { readBlobAsBase64 } from '@capacitor/core/types/core-plugins';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class GlobalVariable {
  baseURL: any = 'https://theplannercrb.com/portal/public/';
  baseAnnouncementURL: any =
    'https://theplannercrb.com/portal/public/images/announcement/';
  baseImageURL: any = 'https://theplannercrb.com/portal/public/images/product/';
  isLoading: boolean = false;
  product_list: any = [];
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async presentToast(msg?: any, position?: any, color?: any) {
    if (!position) {
      position = 'bottom';
    }
    if (!color) {
      color = 'primary';
    }
    const fixedDuration = 3000;

    const toast = await this.toastController.create({
      animated: true,
      position,
      color,
      cssClass: 'APP_toast',
      buttons: [
        {
          text: 'Dismiss',
          side: 'end',
          cssClass: 'cancelBTN',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],

      duration: fixedDuration,
      message: msg,
    });
    toast.present();
  }

  async loader() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        cssClass: 'custom_loading',

        backdropDismiss: false,
      })
      .then((a) => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log('dismissed'));
  }

  // async selectImage(name: any) {
  //   const image = await Camera.getPhoto({
  //     quality: 100,
  //     allowEditing: true,
  //     resultType: CameraResultType.DataUrl,
  //     source: CameraSource.Photos, // Camera, Photos or Prompt!
  //   });

  //   let file = { name: name, image: image.dataUrl };
  //   return file;
  // }

  // selectMultipleImages = async () => {
  //   let options: GalleryImageOptions = {
  //     correctOrientation: true,
  //     limit: 5,
  //     quality: 100,
  //   };

  //   let imgs: any = [];

  //   const image = await Camera.pickImages(options).then((val) => {
  //     var images = val.photos;
  //     let img: any;
  //     for (let index = 0; index < images.length; index++) {
  //       this.blobToBase64(images[index].webPath).then((res) => {
  //         img = res;
  //         let imageObj = { image: '' };
  //         imageObj.image = img;
  //         imgs.push(imageObj);
  //       });
  //     }
  //   });
  //   return imgs;
  // };

  async blobToBase64(WebPath: any) {
    const response = await fetch(WebPath);
    const blob = await response.blob();
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
