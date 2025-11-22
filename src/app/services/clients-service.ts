import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private url = "https://note-app-ba97d-default-rtdb.europe-west1.firebasedatabase.app/clients";
  constructor (private http:HttpClient) {}

  public getClients() {
    return this.http.get<{[key:string]:Client}>(this.url + ".json").pipe(
      map((data)=>{
        const clients : Client[] = [];
        for (let k in data) {
          data[k].id = k;
          clients.push(data[k]);
        }
        return clients;
      })
    );
  }

  public addItem(client:Client) {
    return this.http.post(this.url + ".json", client);
  }
}