import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, HomeComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'medicine-shop';
}