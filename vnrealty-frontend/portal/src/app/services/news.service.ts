import { Result } from './../api-clients/general-client';
import {
  FileParameter,
  GeneralClient,
  CreateNewsCategoryDto,
  CreateNewsDto,
  SearchingNewsDto,
} from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private client: GeneralClient) {}

  // ==========================
  // News Category
  // ==========================
  getAllNewsCategory() {
    return this.client.apiNewcategoriesGetallnewscategory();
  }

  addNewsCategory(newsCategory: CreateNewsCategoryDto) {
    return this.client.apiNewcategoriesCreate(newsCategory);
  }

  editNewsCategory(id: string, newsCategory: CreateNewsCategoryDto) {
    return this.client.apiNewcategoriesUpdate(id, newsCategory);
  }

  deleteNewsCategory(id: string) {
    return this.client.apiNewcategoriesDelete(id);
  }

  getAllNewsCategoryForAdmin() {
    return this.client.apiNewcategoriesGetallnewscategoryforadmin();
  }

  // ==========================
  // News
  // ==========================

  getAllNews() {
    return this.client.apiNewsGetallnews();
  }

  searchingNews(model: SearchingNewsDto) {
    return this.client.apiNewsSearching(model);
  }

  addNews(news: CreateNewsDto) {
    return this.client.apiNewsCreate(news);
  }

  editNews(id: string, news: CreateNewsDto) {
    return this.client.apiNewsUpdate(id, news);
  }

  updateActive(id: string, isActive: boolean){
    return this.client.apiNewsActive(id, isActive);
  }

  deleteNews(id: string) {
    return this.client.apiNewsDelete(id);
  }

  uploadImage(file: FileParameter) {
    return this.client.apiNewsUploadimage(file);
  }
}
