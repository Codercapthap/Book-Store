<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Book Store Site</h1>

  <p align="center">
    This project is an e-commerce web application for a book store, The project consists of two parts: a backend API built with Java Spring Boot and a frontend UI built with ReactJS </p>
</div>



<!-- TABLE OF CONTENTS -->
## TABLE OF CONTENTS
- [TABLE OF CONTENTS](#table-of-contents)
- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Database](#database)
  - [Backend API](#backend-api)
  - [Frontend UI](#frontend-ui)
- [Technologies](#technologies)
- [Author](#author)

<!-- GETTING STARTED -->
## Features
The web application provides the following features
- User:
  - List the categories, books, and on-sale books
  - See the information of a book and its ratings
  - Register, login, logout
  - Add book to the cart, list books from the cart, and order from the cart
  - List order history
  - Change user information, change password
  - Add a book to the favorites list and list the favorites list
  - Search and sort the books
- Admin:
  - List all the books, categories, delivery methods, and sales including deleted
  - List all the users
  - Block user
  - Add, edit, and soft delete books, categories, and delivery methods
  - Add, edit, and end sales

## Installation
### Prerequisites
To install and run this project, you need to have the following software installed on your machine:
- Java 11 or higher
- Maven 3.6.3 or higher
- Node.js 14.17.0 or higher
- npm 6.14.13 or higher
- SQL Server 2019 or higher

You also need to clone this repository to your local machine:
```sh 
git clone https://github.com/Codercapthap/Book-Store
```

### Database
Navigate to the project directory and create a database named Book-Store using the following command:
```sh 
sqlcmd -S localhost -Q "CREATE DATABASE BookStore"
```

Import the data from the .sql file using the following command:
```sh
sqlcmd -S localhost -i data.sql
```

Change the datasource url in application.yml in Book-Store-Api/src/main/resources to fit with your configuration

### Backend API
To install and run the backend API, follow these steps:
- Navigate to the Book-Store-Api folder of the project:
```sh 
cd Book-Store-Api
```
- Install the dependencies using Maven:
```sh 
mvn install
```
- Run the application using Maven:
```sh
mvn spring-boot:run
```
The backend API will run on http://localhost:8081.

### Frontend UI
To install and run the frontend UI, follow these steps:

- Navigate to the frontend folder of the project:
```sh
  cd Book-Store-Client
```
-	Install the dependencies using npm:
```sh
  npm install
```
- Run the application using npm:

```sh
  npm run dev
```
The frontend UI will run on http://localhost:5173

**Note: The admin account by default is akikohikamari1 in both username and password, All default account have the same password as their username**

## Technologies
* [![ReactJS][ReactJS]][ReactJS-url]
* [![Java][Java]][Java-url]
* [![Redux][Redux]][Redux-url]
* [![TailwindCSS][TailwindCSS]][TailwindCSS-url]
* [![Spring][Spring]][Spring-url]
* [![SqlServer][SqlServer]][SqlServer-url]
* ![Html][Html]
* ![CSS][CSS]
* ![Javascript][Javascript]

## Author
Nguyen Bach Khiem - https://github.com/Codercapthap


<!-- MARKDOWN LINKS & IMAGES -->
[ReactJS]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[ReactJS-url]: https://react.dev/
[Java]: https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white
[Java-url]: https://www.java.com/en/
[Spring]: https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[Spring-url]: https://spring.io/
[SqlServer]: https://img.shields.io/badge/Microsoft_SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white
[SqlServer-url]: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
[Redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Html]: https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white
[CSS]: https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white
[Javascript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black

