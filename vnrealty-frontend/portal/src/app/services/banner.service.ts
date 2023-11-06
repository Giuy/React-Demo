import { FileParameter, GeneralClient,CreateNewsDto, SearchingNewsDto  } from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private client: GeneralClient) {}

  getAllBanner() {
    // return this.client.apiBannerGetallbanner();
  }



  deleteBanner(id: string) {
    // return this.client.apiBannerDelete(id);
  }

  getAllBannerForAdmin() {
    // return this.client.apiBannerGetallbannerforadmin();
  }

  uploadImage(file: FileParameter) {
    // return this.client.apiBannerUploadimage(file);
  }
}
