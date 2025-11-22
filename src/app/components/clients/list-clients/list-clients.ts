import { Component } from '@angular/core';
import { ClientsService } from '../../../services/clients-service';
import { Client } from '../../../models/client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-clients',
  imports: [CommonModule],
  templateUrl: './list-clients.html',
  styleUrl: './list-clients.css',
})
export class ListClients {
    public clients:Client[] = [];
    public isLoading = false;
    public isError = false;
    public errorMessage = '';

    constructor (private clientsService:ClientsService) {
        this.isLoading=true;
        this.clientsService.getClients().subscribe({
            next:(data)=> {
                this.clients = data;
                this.isLoading = false;
            },
            error:(data)=> {
                this.isLoading = false;
                this.isError = true;
                this.errorMessage = "Error occured while loading data";
            }
        })
    }
}