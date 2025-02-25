import {Injectable, signal} from '@angular/core';
import {HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';
import {ItemService} from './item.service';
import {Item} from '../../shared/models/item';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  hubUrl = 'https://localhost:7207/hub/notifications/';
  hubConnection?: HubConnection;
  private itemSubject = new BehaviorSubject<Item | null>(null);

  createHubConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .catch(err => console.log(err));

    this.hubConnection.on('ItemUpdated', (item: Item) => {
      console.log("item updated");
      this.itemSubject.next(item);
    });
  }

  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch(err => console.log(err));
    }
  }

  itemSignal() {
    return this.itemSubject.asObservable();
  }
}
