import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgGridModule, AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { AllCommunityModule, ModuleRegistry, RowSelectionOptions, CsvExportModule, GridApi, GridOptions, } from "ag-grid-community";

import type { ColDef } from "ag-grid-community";
import { AppService } from './app.service';
import { colDefs, IRow, myTheme } from './shared/shared.model';
ModuleRegistry.registerModules([AllCommunityModule, CsvExportModule]);

// interface IRow {
//   make: string;
//   model: string;
// }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AgGridModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tiltlabs';
  rowData: IRow[] = [];
  theme = myTheme;
  colDefs = colDefs;
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 40, 80, 100, 200];
  gridOptions!: GridOptions;
  gridApi: any;
  private appService = inject(AppService);
  public rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "multiRow",
    headerCheckbox: false,
  };
  public defaultColDef: ColDef = {
    filter: true,
  };
  // public sideBar: SideBarDef | string | string[] | boolean | null = {
  //   toolPanels: ["columns"],
  // };

  ngOnInit() {
    this.gridOptions = {
      columnDefs: this.colDefs,
      rowData: this.rowData,
      defaultColDef: this.defaultColDef
    }
    this.appService.dummyAPI().subscribe(respose => {
      this.rowData = respose.products
      console.log(respose.products);
    })
  }
  onGridReady(params: any){
    console.log("params",params);
    this.gridApi = params.api;
  }
  exportToCSV() {
    if(this.gridApi){
      this.gridApi?.exportDataAsCsv({
        filename: 'exported_data.csv',
        allcolumns: true,
      });
    }else{
      alert("Grid api is not ready.");
    }
    
  }
}