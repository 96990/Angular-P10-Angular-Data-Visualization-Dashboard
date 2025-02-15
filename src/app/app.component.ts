import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppBarComponent, AppBarSectionComponent, AppBarSpacerComponent ,AppBarPositionMode, KENDO_APPBAR, AppBarThemeColor } from "@progress/kendo-angular-navigation";
import { AvatarComponent } from '@progress/kendo-angular-layout'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KENDO_APPBAR, RouterModule, AvatarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tiltlabs';
  positionMode: AppBarPositionMode = "static";
  profileImage = "assets/AKJ.png";
  themeColor: AppBarThemeColor = "dark";
}
