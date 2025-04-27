import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, OnInit, ViewChild, ViewContainerRef, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-repeater',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-container #container></ng-container>`,
  styleUrl: './repeater.component.css'
})
export class RepeaterComponent implements OnInit {
  
  @Input() option: any[] = []; // Input array for repeating

  @Input() templateRef: TemplateRef<any> | null = null; // Template for showing each item
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  
  constructor () { }

  // When component is ready, render the items
  ngOnInit(): void {
    this.renderItems();
  }

  // If input changes, re-render items
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['option'] || changes['templateRef']) { // Check if option or templateRef changed
      this.renderItems();
    }
  }

  // Create views for each item in the input array
  renderItems(): void {
    this.container.clear(); // Clear previous views
    if (this.option && this.templateRef) { // Check if option and template are valid
      this.option.forEach(item => {
        const context = { $implicit: item, item: item }; // Give current item to template
        this.container.createEmbeddedView(this.templateRef!, context); // Create view for each item
      });
    }
  }
}
