import { Component } from '@angular/core';
import { CustomSortPipe } from './pipes/custom-sort.pipe';
import { CommonModule } from '@angular/common';
import { RepeaterComponent } from './components/repeater/repeater.component';

@Component({
  selector: 'app-root',
  imports: [CustomSortPipe, CommonModule, RepeaterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'ECT-angular-project';

  // Data for the custom sort pipe
  options = [
    { name: 'Item 1', date: new Date('2025-01-24'), price: 10 },
    { name: 'Item 2', date: new Date('2025-01-25'), price: 20 },
    { name: 'Item 3', date: new Date('2025-01-22'), price: 30 },
    { name: 'Item 2', date: new Date('2025-01-25'), price: 18 },
  ];

  data = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
}
