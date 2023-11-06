import { FileParameter } from 'app/api-clients/general-client';
import { NewsService } from 'app/services/news.service';

export class UploadAdapter {
  private loader;
  constructor(loader: any, private service: NewsService) {
    this.loader = loader;
  }

  uploadFile(file) {
    const fileToUpload: FileParameter = {
      data: file,
      fileName: file.name,
    };

    return this.service.uploadImage(fileToUpload);
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this.uploadFile(file).subscribe(
            (result) => {
              resolve({ default: result['imageUrl'] });
            },
            (error) => {
              reject(error);
            }
          );
        })
    );
  }
}
