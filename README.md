# Customizable Interactive Table

Recently, I worked on a project that required a robust, adaptable table setup across various sections within an application, each with unique data and layout requirements. The project demanded advanced functionalities—such as customizable columns, dynamic filtering, pagination, and role-based views—so I explored third-party libraries to streamline development while ensuring high performance. I’ve recreated that solution here, and this demo showcases the adaptable table I built to efficiently manage diverse data requirements, offering powerful data handling features and quick adaptability to meet a range of use cases within the application.

## Key Features

- **Search, Sort, Filter:** Multi-functional search and sorting options enhance data accessibility.
- **Flexible Pagination:** Includes dynamic pagination with customizable page size and index, enhancing data display management.
- **Column Configuration:** Easily reorder, hide, or show columns to customize data views.
- **User-Level Views:** Displays tailored views for different users (e.g., admin, company, individual user), highlighting the adaptability of the table component.

## Stack and Tools

- **Frontend:** React, TypeScript, and Tailwind CSS for a performant and styled UI.
- **Data Handling:** TanStack Table for its powerful table management features.
- **Icons:** Custom icons for UI feedback and intuitive navigation.

## Getting Started

### Prerequisites

- **Docker** installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd project-directory
   ```

### Running the Project with Docker

1. Build and run the Docker container:

   ```bash
   docker-compose up --build
   ```

   This will build the Docker image and start the container, running the app in development mode.

2. Open your browser and visit `http://localhost:5173` to view the app.

### Stopping the Project

To stop the project, use:

```bash
docker-compose down
```

### Building for Production

To build the project for production, you can run:

```bash
docker-compose run app npm run build
```

This will create a production build within the Docker container.

## Customization

This project can be easily customized.

### Creating New Tables

You can simply copy the TotalEmployeesTable folder and create a new table with different configurations.

## Demo

For a live demonstration of this project, please contact the developer.

## Future Enhancements

- **Data Export**: Add export functionality for CSV or Excel formats.
- **Row Grouping**: Implement row grouping for enhanced data categorization.
- **Advanced Filtering**: Expand the filtering capabilities with multi-condition filters.

## Contact

For inquiries or further customization details, reach out to the developer via email.

---

**Note**: This project is private and intended for demonstration purposes only.
