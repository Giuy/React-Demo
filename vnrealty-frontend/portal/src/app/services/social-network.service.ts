import {  CreateSocialNetworkDto, GeneralClient  } from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SocialNetworkService {
  constructor(private client: GeneralClient) {}

  // ==========================
  // SocialNetworkType
  // ==========================
  getAllSocialNetworkType() {
    return this.client.apiSocialnetworktypeGetallsocialnetworktype();
  }

  // ==========================
  // SocialNetwork
  // ==========================
  getAllSocialNetwork() {
    return this.client.apiSocialnetworkGetallsocialnetwork();
  }

  addSocialNetwork(news: CreateSocialNetworkDto) {
    return this.client.apiSocialnetworkCreate(news);
  }

  editSocialNetwork(id: string, news: CreateSocialNetworkDto) {
    return this.client.apiSocialnetworkUpdate(id, news);
  }

  deleteSocialNetwork(id: string) {
    return this.client.apiSocialnetworkDelete(id);
  }
}
