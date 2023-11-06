import { FileParameter, GeneralClient, PhotoDto } from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private photoClient: GeneralClient) { }


  uploadImage(file: FileParameter) {
    return this.photoClient.apiPhotoUploadimage(file);
  }

  getPhotos() {
    return this.photoClient.apiPhotoGetphotos();
  }

  getPhotoById(id) {
    return this.photoClient.apiPhotoGetphotosDetail(id);
  }
  insertPhoto(photoDto: PhotoDto) {
    return this.photoClient.apiPhotoPostphoto(photoDto);
  }


  deletePhoto(id: string) {
    return this.photoClient.apiPhotoDeletephoto(id);
  }
  updatePhoto(id: string,photoDto: PhotoDto) {
    return this.photoClient.apiPhotoPutphoto(id, photoDto);
  }
}