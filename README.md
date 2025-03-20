# amasiBlog

amasiBlog is a simple blog system where users can **view, create, edit, and delete blog posts**. It is built using **PHP, MySQL, HTML, and JavaScript** to provide a dynamic and user-friendly blogging experience.

## Features

- View all blog posts
- Create new blog posts
- Edit existing posts
- Delete posts
- **Automatic database setup** (no need to create the database manually)
  - When the application starts, it **checks** if a **MySQL database named `BlogDB`** exists.
  - If `BlogDB` **is found**, the app starts normally.
  - If `BlogDB` **does not exist**, it is **automatically created** using [`config/createDatabase.php`](config/createDatabase.php).
  - The required tables are set up from [`config/db_setup.php`](config/db_setup.php).
- **Efficient data handling with JavaScript**
  - Data is stored in a **JavaScript array** locally after it is retrieved from the database.
  - When a user **adds, deletes, or updates a post**, the local array is updated **without needing to re-fetch data from the database**.
  - The app updates the UI instantly after receiving a success message from the database via PHP APIs, improving performance and reducing unnecessary database calls.
- **Local search functionality**
  - When searching for a post, the application **filters the local JavaScript array** instead of making a new database request.
  - If a match is found, only the relevant posts are displayed.
  - If no match is found, the user is informed that no results are available.

## Technologies Used

- **Backend:** PHP
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript

## Prerequisites

Before installing amasiBlog, ensure you have the following:

- A web server (Apache, Nginx, or XAMPP for local development)
- PHP (Version 7.4 or higher recommended)
- MySQL (or MariaDB)
- A web browser

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mohamedkamalll/amasiBlog.git
cd amasiBlog
```
Each directory and file serves a specific purpose:


### Explanation of Key Files:

- **`api/`**: Contains backend PHP scripts for handling CRUD operations.
  - **`add_post.php`**: Handles adding new posts to the database.
  - **`delete_post.php`**: Handles deleting posts.
  - **`edit_post.php`**: Handles editing posts.
  - **`fetch_posts.php`**: Retrieves all posts from the database.
- **`assets/css/styles.css`**: Contains styles for the frontend.
- **`assets/js/`**:
  - **`scripts.js`**: Handles general frontend logic.
  - **`ui.js`**: Manages view and hide functions for forms.
  - **`api.js`**: Handles API requests and responses.
- **`config/`**:
  - **`config.php`**: Stores database connection settings.
  - **`createDatabase.php`**: Automatically creates the database if it doesn't exist and creates the database connection.
  - **`db_setup.php`**: Sets up the required tables.
- **`index.php`**: The main entry point of the application.
- **`README.md`**: Documentation for the project.
