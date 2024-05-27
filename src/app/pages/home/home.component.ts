import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ConditionComponent } from './condition/condition.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ConditionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
