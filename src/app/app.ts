import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewClient } from "./components/clients/new-client/new-client";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NewClient],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crm-system');
}
