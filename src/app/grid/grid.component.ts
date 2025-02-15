
import { Component, ViewChild } from '@angular/core';
import { AgGridModule, AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { AllCommunityModule, 
  ModuleRegistry, 
  RowSelectionOptions, 
  CsvExportModule, 
  GridApi, 
  GridOptions, 
  NumberFilterModule,
  TextFilterModule,
  DateFilterModule,
  SideBarDef
} from "ag-grid-community";

import type { ColDef, IGetRowsParams } from "ag-grid-community";
import { AppService } from '../app.service';
import { colDefs, IRow, AlphineTheme, QuatzTheme } from '../shared/shared.model';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { ToolBarModule } from "@progress/kendo-angular-toolbar";
import { GridModule } from "@progress/kendo-angular-grid";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { NotificationComponent } from '../shared/notification/notification.component';

ModuleRegistry.registerModules([
  AllCommunityModule, 
  CsvExportModule, 
  NumberFilterModule,
  TextFilterModule,
  DateFilterModule,]);

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AgGridModule, ButtonsModule, ToolBarModule, GridModule, InputsModule, NotificationComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  @ViewChild('notification') notify!: NotificationComponent;
  title = 'tiltlabs';
  clickedEvent!: string;
  rowData: IRow[] = [];
  theme = AlphineTheme;
  themeparam = true;
  color: "tertiary" | "primary"  = "tertiary"; 
  colDefs = colDefs;
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 40, 80, 100, 200];
  gridOptions!: GridOptions;
  dataSource: any;
  gridApi: any;
  searchQuery!: string
  filteredData: IRow[] = [];
  catogory = ["beauty", "furniture", "fragrences", "groceries", "womens-watchs", "womens-shoes", "womens-jewellery", "womens-dresses", "womens-bags", "vechicle", "tops", "tablet", "sunglasses", "sports-accessories","smartphones","skin-care","motorcycles","mobile-accessories","mens-watches","mens-shoes","laptops","kichen-acessories","home-decoration"]
  public rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "multiRow",
    headerCheckbox: true,
  };
  public defaultColDef: ColDef = {
    filter: true,
    filterParams: {
      buttons: ["apply", "reset", "clear"]
    },
    sortable: true,
    hide: false
  };
  
  sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: [
        {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            minWidth: 225,
            maxWidth: 225,
            width: 225
        },
        {
            id: 'filters',
            labelDefault: 'Filters',
            labelKey: 'filters',
            iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel',
            minWidth: 180,
            maxWidth: 400,
            width: 250
        }
    ],
    position: 'right',
    defaultToolPanel: 'columns'
};
  constructor(private appService: AppService ){
    this.createDataSource();
    this.gridOptions = {
      columnDefs: this.colDefs,
      rowData: this.rowData,
      defaultColDef: this.defaultColDef
    }
  }

  createDataSource(){
    this.dataSource = {
      getRows: (params: IGetRowsParams) => {
        const {startRow, endRow} = params
        this.appService.getProducts(endRow - startRow, startRow).subscribe(
          response => {

            params.successCallback(response.products, response.total);
            this.notify?.showNotification("loaded");
          },
          error => {
            params.failCallback()
            this.notify.showNotification("custom", "api error occured");
          }
        );
      }
    }
  }

  onGridReady(params: any){
    this.gridApi = params.api;
  }

  exportToCSV() {
    if(this.gridApi){
      this.gridApi?.exportDataAsCsv({
        filename: 'exported_data.csv',
        allcolumns: true,
      });
      this.notify.showNotification("exported");
    }else{
      alert("Grid api is not ready.");
      this.notify.showNotification("error");

    }
    
  }
  refresh(){
    this.createDataSource();
    this.notify.showNotification("refresh");
  }

  onFilter(text: string){
    // filter is added to the grid but to implement the feature need to have a another api which accepts the query.
    this.searchQuery = text.trim().toLowerCase()
    this.createDataSource();
  }

  onThemeChange(){
    this.themeparam = !this.themeparam;
    this.themeparam ? this.theme = QuatzTheme : this.theme = AlphineTheme; 
    this.themeparam ? this.color = "primary" : this.color = "tertiary";
    this.notify.showNotification("theme");
  }
}