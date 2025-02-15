# Tiltlabs

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## setup

# AG-Grid and Kendo UI Integration with JSON API

## How to Set Up and Run the Application

1. Install Dependencies 
   Navigate to the project directory and install all dependencies: 
   cd <project-folder>
   npm install
 
2. Run the Application 
   Start the Angular development server: 
    ng serve
   
   Access the application at [http://localhost:4200](http://localhost:4200).

3. Build for Production 
   To create a production-ready build, run: 
    ng build --prod
   

## Assumptions Made During Development

1. Data Pagination 
   The JSON API supports pagination with a `limit` parameter in the query string. For optimal performance, data is fetched in chunks dynamically as users interact with the grid.

2. Default Page Size 
   Initially, the grid loads a limited number of rows (`100`) for better responsiveness. Users can interact with the grid to load additional data on demand.

3. Kendo UI Integration 
   Kendo UI components (e.g., buttons, filter) are used to enhance filtering and UI functionality for better user experience.

4. Reusable Components 
   - A `SubarrayRenderer` component was created to display nested data (`reviews`) in the grid.
   - The pagination logic and data fetching service were abstracted into reusable services and utility functions.


## Reusable Components

### 1. notification component.
    - Purpose: 
        The Notification Service is implemented to provide a centralized, reusable, and customizable way to display notifications across the application. It ensures consistent design, behavior, and ease of use for developers, enhancing the user experience with smooth animations and flexible positioning. 
    - Implementation:  
        The service is built using **Kendo UI's Notification Module** and leverages Angular's **dependency injection**. 
        Notifications are dynamically triggered by calling the `show` method of the `NotificationService`. 
        The notification parameters, such as type (info, success, error), content, position, and animation, can be configured for each  
            notification. 
        The service supports appending notifications to specific containers for context-aware messaging. 
        Angular animations are enabled to provide smooth transitions for notification display and dismissal. 
    - Usage: 
        Setup:
        - Ensure the `@progress/kendo-angular-notification` package is installed. 
        - Enable Angular animations by adding `provideAnimations` in the `main.ts` file. 

        Inject the Service: 
        - Import and inject the `NotificationService` in any component where notifications are needed. 

        Trigger Notifications: 
        - Use the `show` method of the service with the desired configuration. 

        Reusable Example: 
        - Create a reusable component for notifications, making it easy to integrate and manage across multiple modules. 
    Key Features: 
    - Customizable: Easily configure message content, type, position, and animation. 
    - Reusability: Centralized logic ensures consistency across the app. 
    - Flexibility: Appends notifications to specific elements for contextual display.

### 2. `SubarrayRenderer` Component
   - Purpose: Custom renderer for displaying nested arrays (`reviews`) in the AG-Grid. Each review includes reviewer details, comments, and ratings.
   - Implementation: Utilizes Angular's `NgFor` to iterate through reviews and displays them in a structured list.
   - Usage: Applied as a `cellRenderer` in the AG-Grid column definition.

   Example:
   ts
    {
        field: "reviews",
        cellRenderer: SubarrayRenderer,
        cellRendererParams: {
        columnKeys: ["comment", "reviewerName", "rating"]
        }
    }
   

### 2. Data Fetching Service
   - Purpose: Handles all API interactions, including fetching data in chunks and managing pagination dynamically.
   - Implementation: A dedicated Angular service (`AppService`) that uses `HttpClient` for API calls.

   Example:
   ts
    fetchData(offset: number, limit: number) {
        return this.http.get(`${API_URL}?limit=${limit}&skip=${offset}`);
    }

### 3. Kendo UI Enhancements
   - Purpose: Introduced Kendo UI components for advanced userinterface.
   - Integration: Kendo components are used in the toolbar of the grid, notification, buttons  enhance user interaction.

   Example:
   html
      <button kendoButton size="medium" rounded="medium" fillMode="solid" themeColor="primary" (click)="refresh()">Refresh</button>
