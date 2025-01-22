import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

import type { IHeaderGroupAngularComp } from 'ag-grid-angular';
import type { IHeaderGroupParams } from 'ag-grid-community';

@Component({
    standalone: true,
    imports: [NgClass],
    templateUrl: 'customheader-group.component.html',
    styleUrl: 'customheader-group.component.css'
})
export class CustomHeaderGroup implements IHeaderGroupAngularComp {
    public params!: IHeaderGroupParams;
    public expandState!: string;

    @ViewChild('label', { read: ElementRef }) public label!: ElementRef;

    agInit(params: IHeaderGroupParams): void {
        this.params = params;

        this.params.columnGroup
            .getProvidedColumnGroup()
            .addEventListener('expandedChanged', this.syncExpandButtons.bind(this));
        this.params.setTooltip(
            params.displayName,
            () => this.label.nativeElement.scrollWidth > this.label.nativeElement.clientWidth
        );

        this.syncExpandButtons();
    }

    expandOrCollapse() {
        const currentState = this.params.columnGroup.getProvidedColumnGroup().isExpanded();
        this.params.setExpanded(!currentState);
    }

    syncExpandButtons() {
        if (this.params.columnGroup.getProvidedColumnGroup().isExpanded()) {
            this.expandState = 'expanded';
        } else {
            this.expandState = 'collapsed';
        }
    }
}