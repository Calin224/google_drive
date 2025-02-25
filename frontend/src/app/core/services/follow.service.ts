import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  baseUrl = 'https://localhost:7207/api/';
  private http = inject(HttpClient);

  toggleFollow(targetUserId: string){
    return this.http.post(this.baseUrl + 'follow/' + targetUserId, {});
  }

  getFollowers(){
    return this.http.get<User[]>(this.baseUrl + "follow/followers");
  }

  getFollowing(){
    return this.http.get<User[]>(this.baseUrl + "follow/following");
  }

  existsFollow(targetUserId: string) {
    return this.http.get<{ existFollow: boolean }>(this.baseUrl + 'follow/exists-follow/' + targetUserId);
  }
}
