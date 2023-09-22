import { SearchUserPage } from './app/pages/search-user/search-user.page';
import { Injectable } from '@angular/core';

import { readBlobAsBase64 } from '@capacitor/core/types/core-plugins';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { InvoicePage } from './app/pages/invoice/invoice.page';
import { CreateUserPage } from './app/pages/create-user/create-user.page';
import { ProductModalPage } from './app/pages/product-modal/product-modal.page';

@Injectable()
export class GlobalVariable {
  baseURL: any = 'https://theplannercrb.com/portal/public/';
  baseAnnouncementURL: any =
    'https://theplannercrb.com/portal/public/images/announcement/';
  baseImageURL: any = 'https://theplannercrb.com/portal/public/images/product/';
  isLoading: boolean = false;
  global_array: any = [];
  product_list: any = [];
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController
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

  async p_loader() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        cssClass: 'custom_loading_p',

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

  async searchUserModal(data: any, title: any): Promise<any> {
    return new Promise(async (resolve) => {
      const modal = await this.modalCtrl.create({
        component: SearchUserPage,
        cssClass: 'search_user_modal',
        id: 'search_user_modal',

        componentProps: { modal_data: data, title: title },
      });
      await modal.present();

      modal.onDidDismiss().then((data) => {
        console.log('modal dismissed with', data.data);

        if (data.data != undefined) {
          resolve(data.data);
        } else {
          resolve(false);
        }
      });
    });
  }

  async createUser(data: any, title: any): Promise<any> {
    return new Promise(async (resolve) => {
      const modal = await this.modalCtrl.create({
        component: CreateUserPage,
        cssClass: 'create_user_modal',
        id: 'create_user_modal',
        componentProps: { modal_data: data, user_title: title },
      });
      await modal.present();

      modal.onDidDismiss().then((data) => {
        console.log('modal dismissed with', data.data);

        if (data.data != undefined) {
          resolve(data.data);
        } else {
          resolve(false);
        }
      });
    });
  }

  async invoiceModal(data: any): Promise<any> {
    return new Promise(async (resolve) => {
      const modal = await this.modalCtrl.create({
        component: InvoicePage,
        cssClass: 'invoice_modal',
        id: 'invoice_modal',
        componentProps: { modal_data: data },
        backdropDismiss: false,
      });
      await modal.present();

      modal.onDidDismiss().then((data) => {
        console.log('modal dismissed with', data.data);

        if (data.data != undefined) {
          resolve(data.data);
        } else {
          resolve(false);
        }
      });
    });
  }

  async productModal(data: any): Promise<any> {
    return new Promise(async (resolve) => {
      const modal = await this.modalCtrl.create({
        component: ProductModalPage,
        cssClass: 'product_modal',
        id: 'product_modal',
        componentProps: { modal_data: data },
        backdropDismiss: false,
      });
      await modal.present();

      modal.onDidDismiss().then((data) => {
        console.log('modal dismissed with', data.data);

        if (data.data != undefined) {
          resolve(data.data);
        } else {
          resolve(false);
        }
      });
    });
  }

  async alert(cart_name: any) {
    console.log('Dicarding Previous Cart');
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: 'gameOver-alert-css',
        header: `Do You want to Discard  ${cart_name} `,
        backdropDismiss: false,
        message: '',
        buttons: [
          {
            role: 'Replay',
            text: 'Yes',
            cssClass: 'yes-btn',
            handler: () => {
              resolve('ok');
            },
          },
          {
            text: `Open  ${cart_name} `,
            role: 'change Game',

            cssClass: 'no-btn',
            handler: (blah) => {
              resolve('no');
            },
          },
        ],
      });

      await alert.present();
    });
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
