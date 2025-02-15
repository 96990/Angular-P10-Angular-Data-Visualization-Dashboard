import { IDateFilterParams, themeAlpine, themeQuartz, ValueFormatterParams, ValueGetterParams } from "ag-grid-community";
import { SubarrayRenderer } from "./sub-array-renderer/sub-array-renderer.component";

export interface IRow {
    availabilityStatus: string,
    brand: string,
    category: string,
    description: string,
    dimensions: dimensions[],
    discountPercentage: string,
    images: string ,
    meta: meta[],
    minimumOrderQuantity: string,
    price: string,
    rating: string,
    returnPolicy: string,
    reviews: reviews[],
    sku: string,
    stocks: string,
    tags: string,
    title: string,
    tumbnail: string,
    warrantyInformation: string,
    weight: string,
 }

export interface Idata{
    limit: number,
    products: IRow[],
    skip: number,
    total: number
}

export type dimensions = {
    depth: GLfloat,
    height: GLfloat,
    width: GLfloat
}
export type meta = {
    barcode: number,
    createdAt: string, 
    qrCode: string, 
    updatedAt: string,
}
export type reviews = {
    comment: string,
    date: string,
    rating: number,
    reviewerEmail: string,
    reviewerName: string,
    [key:string]: string | number
}
export const filterParams: IDateFilterParams = {
    comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
      const dateAsString = cellValue;
      if (dateAsString == null) return -1;
      const dateParts = dateAsString.split("/");
      const cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0]),
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
      return 0;
    },
};

export const colDefs = [
    { field: "id", headerName: "ID", maxWidth: 60, filter: "agNumberColumnFilter", sortable: true},
    { field: "title", headerName: "Title"},
    { field: "brand", headerName: "Brand", filter: "agSetColumnFilter",sortable: true },
    { field: "category",  headerName: "Catagory", filter: "agSetColumnFilter",sortable: true},
    { field: "availabilityStatus", headerName: "Availability Status", filter: "agSetColumnFilter"},
    { field: "price", headerName: "Price", filter: "agNumberColumnFilter"},
    { field: "stock", headerName: "Stock", filter: "agSetColumnFilter" },
    { field: "images", headerName: "Images", filter: false},
    { field: "description", headerName: "Description"},
    { field: "discountPercentage",  headerName: "Discount Percentage", filter: "agSetColumnFilter"},
    { headerName: "Dimensions", children: [
            { headerName: 'depth', valueGetter: (params: ValueGetterParams) =>params.data.dimensions?.depth || '',filter: "agNumberColumnFilter"},
            { headerName: 'height', valueGetter: (params: ValueGetterParams) =>params?.data?.dimensions?.height || '', filter: "agNumberColumnFilter"},
            { headerName: 'width', valueGetter: (params: ValueGetterParams) =>params?.data?.dimensions?.width || '', filter: "agNumberColumnFilter"}
        ]
    },
    { field: "minimumOrderQuantity", headerName: "Minimum Order Quantity", filter: "agNumberColumnFilter"},
    { field: "rating", headerName: "Rating", filter: "agNumberColumnFilter"},
    { field: "returnPolicy", headerName: "Return Policy"},
    {
        field: "reviews",
        headerName: "Reviews",
        cellRenderer: SubarrayRenderer,
        cellRendererParams: {
            columnKeys: ["rating", "reviewerName", "comment", "date", "reviewerEmail"]
        }
    },
    { field: "sku", headerName: "SKU"},
    { field: "tags", headerName: "Tags", filter: "agNumberColumnFilter"},
    { field: "thumbnail", headerName: "Thumbnail",},
    { field: "warrantyInformation", headerName: "Warranty Information",},
    { field: "weight", headerName: "Weight", filter: "agNumberColumnFilter"},
    { headerName: "Meta", children: [
        { headerName: 'Barcode', valueGetter: (params: ValueGetterParams) =>params.data.meta?.barcode || '', filter: "agNumberColumnFilter"},
        { headerName: 'CreateAt', valueGetter: (params: ValueGetterParams) =>params.data.meta?.createdAt || '', filter: "agDateColumnFilter",filterParams: filterParams},
        { headerName: 'QR Code', valueGetter: (params: ValueGetterParams) =>params.data.meta?.qrCode || ''},
        { headerName: 'Updated At', valueGetter: (params: ValueGetterParams) =>params.data.meta?.updatedAt || '', filter: "agDateColumnFilter",filterParams: filterParams,
          // valueFormatter: (params: ValueFormatterParams) => {
          //   return params.value == null
          //       ? '' : `${params.data.meta?.updatedAt.getDate()}/${params.data.meta?.updatedAt.getMonth() + 1}/${params.data.meta?.updatedAt.getFullYear}`
          //   },
        },
    ] },
  ];

export const AlphineTheme = themeAlpine.withParams({
    spacing: 2,
    foregroundColor: 'rgb(14, 68, 145)',
    backgroundColor: 'rgb(241, 247, 255)',
    headerBackgroundColor: 'rgb(228, 237, 250)',
    rowHoverColor: 'rgb(216, 226, 255)',
});
export const QuatzTheme = themeQuartz.withParams({
    spacing: 2,
    backgroundColor: 'rgb(249, 245, 227)',
    foregroundColor: 'rgb(132, 46, 46)',
    headerTextColor: 'rgb(238, 245, 172)',
    headerBackgroundColor: 'rgb(231, 65, 65)',
    oddRowBackgroundColor: 'rgb(0, 0, 0, 0.03)',
    headerColumnResizeHandleColor: 'rgb(161, 48, 48)',
});

