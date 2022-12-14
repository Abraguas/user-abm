import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() bgColor: string = "primary";
  @Input() title: string = "default title";
  @Input() subtitle: string = "default subtitle";

  ngOnInit(): void {
  }

}
