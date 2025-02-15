import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { NotificationModule } from "@progress/kendo-angular-notification";
import {
    NotificationService,
    NotificationSettings,
  } from "@progress/kendo-angular-notification";

type HorizondalPosition = "left" | "center" | "right";
type VerticalPosition = "top" | "bottom";

@Component({
    selector: 'app-notification',
    template: `<div #appendTo class="append-container"></div>`,
    standalone: true,
    imports: [NotificationModule,]
})
export class NotificationComponent {
  @Input() horizontal: HorizondalPosition = "right";
  @Input() vertical: VerticalPosition = "top";
  @ViewChild("appendTo", { read: ViewContainerRef, static: false }) appendTo!: ViewContainerRef;

  public state: NotificationSettings = {
    content: "Your data has been saved.",
    appendTo: this.appendTo,
    type: { style: "success", icon: true },
    animation: { type: "slide", duration: 400 },
    hideAfter: 3000,
    position: { horizontal: this.horizontal, vertical: this.vertical }
  };

  constructor(private notificationService: NotificationService) {}

  showNotification(type: string, content: string = '') {
    switch (type) {
      case "success":
        this.state.content = "Your data has been saved.";
        this.state.type = { style: "success", icon: true };
        break;
      case "error":
        this.state.content = "Oops, something went wrong...";
        this.state.type = { style: "error", icon: true };
        break;
      case "exported":
        this.state.content = "File has exported to CSV.";
        this.state.type = { style: "none", icon: true };
        break;
      case "custom":
        this.state.content = content;
        this.state.type = { style: "error", icon: true };
        break;
      case "loaded":
        this.state.content = "Data has been loaded.";
        this.state.type = { style: "success", icon: true };
        break;
      case "theme":
        this.state.content = "Theme has been changed.";
        this.state.type = { style: "success", icon: true };
        break;
      case "refresh":
        this.state.content = "Refreshed";
        this.state.type = { style: "info", icon: true };
        break;
      case "default":
        this.state.content = "it's looking good";
        this.state.type = { style: "none", icon: true };
        break;
    }
    this.notificationService.show(this.state);
  }
}