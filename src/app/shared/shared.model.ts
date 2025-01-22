import { ColDef, ICellRendererParams, themeAlpine, ValueGetterParams } from "ag-grid-community";
import { CustomHeaderGroup } from "./customheader-group/customheader-group.component";
import { ReviewsRenderer } from "./sub-table/sub-table.component";

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
}
export const colDefs = [
    { field: "title", headerName: "Title"},
    { field: "brand", headerName: "Brand"},
    { field: "category",  headerName: "Catagory"},
    { field: "availabilityStatus", headerName: "Availability Status"},
    { field: "price", headerName: "Price"},
    { field: "stock", headerName: "Stock"},
    { field: "images", headerName: "Images"},
    { field: "description", headerName: "Description"},
    { field: "discountPercentage",  headerName: "Discount Percentage"},
    { headerName: "Dimensions", children: [
            { headerName: 'depth', valueGetter: (params: ValueGetterParams) =>params.data.dimensions?.depth || ''},
            { headerName: 'height', valueGetter: (params: ValueGetterParams) =>params?.data?.dimensions?.height || ''},
            { headerName: 'width', valueGetter: (params: ValueGetterParams) =>params?.data?.dimensions?.width || ''}
        ]
    },
    { field: "minimumOrderQuantity", headerName: "Minimum Order Quantity"},
    { field: "rating", headerName: "Rating"},
    { field: "returnPolicy", headerName: "Return Policy"},
    {
        field: "reviews",
        headerName: "Reviews",
        cellRenderer: ReviewsRenderer,
        cellRendererParams: {
            columnKeys: ["comment", "date", "rating", "reveiwerName", "reviewerEmail"]
        }
    },
    { field: "sku", headerName: "SKU"},
    { field: "tags", headerName: "Tags"},
    { field: "thumbnail", headerName: "Thumbnail",},
    { field: "warrantyInformation", headerName: "Warranty Information",},
    { field: "weight", headerName: "Weight"},
    { headerName: "Meta", children: [
        { headerName: 'Barcode', valueGetter: (params: ValueGetterParams) =>params.data.meta?.barcode || ''},
        { headerName: 'CreateAt', valueGetter: (params: ValueGetterParams) =>params.data.meta?.createdAt || ''},
        { headerName: 'QR Code', valueGetter: (params: ValueGetterParams) =>params.data.meta?.qrCode || ''},
        { headerName: 'Updated At', valueGetter: (params: ValueGetterParams) =>params.data.meta?.updatedAt || ''},
    ] },
  ];

export const myTheme = themeAlpine.withParams({
    spacing: 2,
    foregroundColor: 'rgb(14, 68, 145)',
    backgroundColor: 'rgb(241, 247, 255)',
    headerBackgroundColor: 'rgb(228, 237, 250)',
    rowHoverColor: 'rgb(216, 226, 255)',
});

// function getNestedValue(key: keyof reviews) {
//     return (params: ICellRendererParams) => {
//         console.log("ddd",params.data);
//       if (!params.data.reviews || !Array.isArray(params.data) || params.data.length === 0) {
//         return "No reviews";  // If no reviews, display a default message.
//       }
//       // Get the reviews from params
//       const data: IRow[] = params.data || [];
//       // Map through reviews and extract the requested key.
//       return data.reviews.map((review) => review[key] || "N/A").join(", ");
//     };
//   }