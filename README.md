# Bookstore Application

## Overview
This Bookstore Application is a full-featured web application built using React, Node.js, Express, and MySQL. The application allows users to browse, filter, and purchase books online. It includes features such as user authentication, book filtering, detailed book descriptions, and a shopping cart.

## Features
- **User Authentication:** Users can create an account, log in, and log out.
- **Browse Books:** View a list of available books for sale.
- **Filter Books:** Filter books based on various criteria such as genre, author, and price.
- **Book Details:** View detailed descriptions of each book.
- **Shopping Cart:** Add books to a shopping cart, view the cart, and see the total price and eligibility for free delivery.
- **Responsive Design:** Optimized for desktop and mobile devices.

## Screenshots
<img src="https://github.com/S-ganapathy/Bookstore/blob/main/Saved%20Pictures/book-login.PNG" height="200" width="300"/> <img src="https://github.com/S-ganapathy/Bookstore/blob/main/Saved%20Pictures/book-home.PNG" height="200" width="300"/> <img src="https://github.com/S-ganapathy/Bookstore/blob/main/Saved%20Pictures/book-category.PNG" height="200" width="300"/> 
<img src="https://github.com/S-ganapathy/Bookstore/blob/main/Saved%20Pictures/book-description.PNG" height="200" width="300"/><img src="https://github.com/S-ganapathy/Bookstore/blob/main/Saved%20Pictures/book-cart.PNG" height="200" width="300"/>


## Technologies Used
- **Frontend:** React, CSS, Javascript
- **Backend:** Node.js, Express
- **Database:** MongoDB, MySQL
- **Authentication:**  bcrypt

## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js and npm installed
- MySQL, MongoDB installed and running

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bookstore-app.git
    cd bookstore-app
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up the MySQL or MongoDB database:**
    - Create a new database called `bookstore`.
    - Run the provided SQL script to create the necessary tables and insert sample data.
    - Update the database configuration in `config/db.js`.

4. **Configure environment variables:**
    - Create a `.env` file in the root directory and add the following variables:
      ```
      PORT=5000
      DB_HOST=localhost
      DB_USER=root
      DB_PASS=password
      DB_NAME=bookstore....
      ```

5. **Run the application:**
    ```bash
    npm start
    ```

6. **Navigate to the frontend directory and install dependencies:**
    ```bash
    cd client
    npm install
    ```

7. **Run the frontend application:**
    ```bash
    npm start
    ```

## Usage
1. **Register and Login:**
   - Create a new account or log in with existing credentials.
2. **Browse Books:**
   - View the list of available books.
3. **Filter Books:**
   - Use the filter options to narrow down the list of books.
4. **View Book Details:**
   - Click on a book to view its detailed description.
5. **Add to Cart:**
   - Add books to your shopping cart.
6. **View Cart:**
   - View the books in your cart, the total price, and free delivery eligibility.
7. **Checkout:**
   - Proceed to checkout to complete the purchase.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Contact
If you have any questions or feedback, feel free to contact me at ganapathyofficial053@gmail.com.
