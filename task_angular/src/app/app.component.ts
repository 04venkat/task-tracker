import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthorizationServiceService } from './services/authorization-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task_angular';
}
