# Product Management Application

A full-stack web application built with Java Spring Boot, React, and MongoDB for managing products with CRUD operations.

## Features

### Must Have Features ✅
- **Product List**: Display all products in a responsive grid layout
- **Add Product**: Form to create new products with validation
- **Delete Product**: Remove products with confirmation dialog
- **Sort Products**: Sort products by price (low to high)
- **Full Stack Integration**: Java backend, React frontend, MongoDB database

### Nice to Have Features ✅
- **Edit Product**: Update existing products
- **Search Products**: Search by name and filter by category
- **Form Validation**: Client-side and server-side validation
- **Modern UI**: Beautiful, responsive design with animations
- **Error Handling**: Comprehensive error handling and user feedback

## Technology Stack

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Framework
- **Spring Data MongoDB** - Database integration
- **Maven** - Dependency management
- **Jakarta Validation** - Input validation

### Frontend
- **React 18** - UI library
- **JavaScript ES6+** - Programming language
- **CSS3** - Styling with modern features
- **Axios** - HTTP client (optional, using fetch)

### Database
- **MongoDB** - NoSQL database
- **Mongoose** - ODM (handled by Spring Data MongoDB)

## Prerequisites

Before running the application, make sure you have the following installed:

1. **Java 17** or higher
2. **Maven 3.6+**
3. **Node.js 16+** and **npm**
4. **MongoDB** (local installation or MongoDB Atlas)

## Installation & Setup

### 1. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The application will connect to `mongodb://localhost:27017/product_management`

#### Option B: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a cluster and get connection string
3. Update `application.properties` with your connection string

### 2. Backend Setup (Java Spring Boot)

1. Navigate to the project root directory
2. Run the Spring Boot application:

```bash
# Using Maven
mvn spring-boot:run

# Or compile and run
mvn clean package
java -jar target/product-management-app-0.0.1-SNAPSHOT.jar
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup (React)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?sort=price` - Get products sorted by price
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Search
- `GET /api/products/search?name={name}` - Search by name
- `GET /api/products/search?category={category}` - Filter by category
- `GET /api/products/search?name={name}&category={category}` - Combined search

## Product Schema

```json
{
  "id": "String (auto-generated)",
  "name": "String (required, 2-100 chars)",
  "price": "Number (required, positive)",
  "description": "String (required, 10-500 chars)",
  "category": "String (required, 2-50 chars)"
}
```

## Usage

1. **View Products**: The homepage displays all products in a grid layout
2. **Add Product**: Click "Add New Product" button to open the form
3. **Edit Product**: Click "Edit" button on any product card
4. **Delete Product**: Click "Delete" button and confirm the action
5. **Search**: Use the search bar to find products by name or category
6. **Sort**: Use the sort dropdown to sort products by price

## Project Structure

```
product-management-app/
├── src/main/java/com/productmanagement/
│   ├── ProductManagementAppApplication.java
│   ├── controller/
│   │   └── ProductController.java
│   ├── model/
│   │   └── Product.java
│   ├── repository/
│   │   └── ProductRepository.java
│   └── service/
│       └── ProductService.java
├── src/main/resources/
│   └── application.properties
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard.js
│   │   │   ├── ProductForm.js
│   │   │   ├── ProductList.js
│   │   │   └── SearchBar.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── pom.xml
└── README.md
```

## Development

### Backend Development
- The backend uses Spring Boot with auto-configuration
- MongoDB integration is handled by Spring Data MongoDB
- CORS is configured to allow frontend connections
- Validation is implemented using Jakarta Validation annotations

### Frontend Development
- React functional components with hooks
- Modern CSS with responsive design
- Form validation with real-time feedback
- Error handling and loading states

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `application.properties`

2. **CORS Issues**
   - Backend CORS is configured for `http://localhost:3000`
   - Ensure frontend is running on port 3000

3. **Port Conflicts**
   - Backend runs on port 8080
   - Frontend runs on port 3000
   - Change ports in configuration files if needed

4. **Java Version Issues**
   - Ensure Java 17 is installed and configured
   - Check `JAVA_HOME` environment variable

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
