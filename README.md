Sure, here's a comprehensive README for your project:

---

# CSV Uploader and Search Application

This project is a full-stack application that allows users to upload a CSV file, search through the data, and display the results as cards. The application is built using React for the frontend and Node.js with Express for the backend. The backend also uses SQLite for data storage.

## Features

- **CSV File Upload**: Users can upload a CSV file from their local machine.
- **Search Functionality**: Users can search through the uploaded CSV data using a search bar. The search is case-insensitive and searches through all columns.
- **Responsive Design**: The application is designed to work well on both desktop and mobile devices.
- **Error Handling**: Clear and user-friendly error messages are displayed for any issues that arise.


## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm (v10 or later)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/gustavodsf/shawandpartners
cd shawandpartners
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

### Running the Application

1. **Start the backend server**

```bash
cd backend
npm run dev
```

The backend server will start on port 3000.

2. **Start the frontend development server**

```bash
cd ../csv-uploader
npm run dev
```

The frontend development server will start on port 4000.

### Usage

1. Open your browser and navigate to `http://localhost:4000`.
2. Use the file input to upload a CSV file.
3. Use the search bar to filter the displayed data.

### CSV File Format

The CSV file should have the following structure:

```
name,city,country,favorite_sport
John Doe,New York,USA,Basketball
Jane Smith,London,UK,Football
Mike Johnson,Paris,France,Tennis
Karen Lee,Tokyo,Japan,Swimming
Tom Brown,Sydney,Australia,Running
Emma Wilson,Berlin,Germany,Basketball
```

### API Endpoints

- **POST /api/files**: Upload a CSV file.
  - Request: `multipart/form-data` with the key `file`.
  - Response: 
    - `200 OK`: `{ "message": "The file was uploaded successfully." }`
    - `500 Internal Server Error`: `{ "message": "Error message" }`

- **GET /api/users**: Search through the uploaded CSV data.
  - Query Parameters: `?q=searchTerm`
  - Response:
    - `200 OK`: `{ "data": [ ... ] }`
    - `500 Internal Server Error`: `{ "message": "Error message" }`

### Error Handling

- If there is an error during file upload or data processing, an appropriate error message will be displayed.
- If there is an error during the search operation, an appropriate error message will be displayed.

## Technologies Used

- **Frontend**: React, Axios
- **Backend**: Node.js, Express, Multer, csv-parser.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by various CSV upload and search applications.
- Special thanks to the open-source community for providing the tools and libraries used in this project.
