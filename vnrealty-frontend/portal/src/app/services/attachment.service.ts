import { FileParameter, GeneralClient, AttachmentType,UpdateAttachmentInfoDto,UploadFileModel } from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private baseUrl = "";
  constructor
  (
    private client: GeneralClient,
    private http: HttpClient
  ) 
  {
    this.baseUrl = environment.baseUrl;
  }

  getAllAttachment(){
    return this.client.apiAttachmentsGet(AttachmentType.All,"");
  }

  getByListAttachmentType(listAttachmentType: AttachmentType[]){
    return this.client.apiAttachmentsGetbylistattachmenttype(listAttachmentType);
  }

  uploadPhoto(file: FileParameter){
    return this.client.apiAttachmentsPut(AttachmentType.Photo, "Common", file);
  }

  uploadVideo(file: FileParameter){
    return this.client.apiAttachmentsPut(AttachmentType.Video, "Common", file);
  }

  uploadBanner(file: FileParameter){
    return this.client.apiAttachmentsPut(AttachmentType.Photo,"Banner",file);
  }

  uploadCommonConfig(file: FileParameter){
    return this.client.apiAttachmentsPut(AttachmentType.Photo,"Config",file);
  }

  uploadProjectImage(file: FileParameter){
    return this.client.apiAttachmentsPut(AttachmentType.Photo,"Project",file);
  }

  uploadProductImage(file: FileParameter){
    return this.client.apiAttachmentsPut(AttachmentType.Photo,"Product",file);
  }

  uploadImage(file: FileParameter, service: string){
    return this.client.apiAttachmentsPut(AttachmentType.Photo,service,file);
  }

  uploadFile(attachmentType: AttachmentType, service: string, file: FileParameter){
    return this.client.apiAttachmentsPut(attachmentType,service,file);
  }

  uploadMultipleFile(attachmentType: AttachmentType, arrFile: Array<UploadFileModel>){
    return this.client.apiAttachmentsMultiples(attachmentType,"", arrFile);
  }

  updateInfo(data: UpdateAttachmentInfoDto){
    return this.client.apiAttachmentsUpdateattachmentinfo(data);
  }

  uploadWebsiteBody(file: FileParameter){
    return this.client.apiAttachmentsPut(AttachmentType.Photo,"WebsiteBody",file);
  }

  uploadFileWithProgress(attachmentType: AttachmentType, file: FileParameter){
    const content_ = new FormData();
    if (file !== null && file !== undefined){
        content_.append("File", file.data, file.fileName ? file.fileName : "File");
    }
    return this.http.put(this.baseUrl + '/api/attachments/'+attachmentType, content_, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  deleteFile(id){
    return this.client.apiAttachmentsDelete(id);
  }
}
