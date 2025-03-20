<?php
     include './config/createDatabase.php'; // This ensures $conn is available

     $sql = "SELECT * FROM posts";
     $result = $conn->query($sql);
     //we will do the following code to create a local store for posts to use it to update the added or deleted posts instead of calling database everytime we added new post to get the updated posts
     $posts = []; // Initialize empty array

     if ($result->num_rows > 0) {
          while ($row = $result->fetch_assoc()) {
               $posts[] = $row; // Store each post as an object in array
          }
     }

     $conn->close();
     
?>

<!DOCTYPE html>
<html>
     <head>
          <title>Simple Blog</title>
          <link rel="stylesheet" href="./assets/css/main.css">

          <script>
               let posts = <?php echo json_encode($posts); ?>; // Convert PHP array to JavaScript
          </script>
     </head>
     <body>
          <div class="header-container">
               <div class="site-title">Simple Blog System</div>
               <div class="nav">
                    <a href="index.php">Home</a>
                    <a onclick="showAddPostForm()">Add Post</a>
                    <a onclick="showSearchForm()">Search</a>
               </div>
          </div>

          <div class="container">
               <h1>All Blog Posts</h1>

               <!-- Hidden Add Post Form -->
               <div id="add-post-form">
                    <h3>Add New Post</h3>
                    <input type="text" id="post-title" placeholder="Enter title" required>
                    <textarea id="post-content" placeholder="Enter content" required></textarea>
                    <div class="centered-buttons">
                         <button onclick="addPost()">Submit</button>
                         <button onclick="hideAddPostForm()">Cancel</button>
                    </div>
               </div>

               <div id="search-form">
                    <h3>Enter the post id</h3>
                    <input type="text" id="post-id" placeholder="Enter ID" required>
                    
                    <div class="centered-buttons">
                         <button onclick="displayPosts(parseInt(document.getElementById('post-id').value))">Find</button>
                         <button onclick="hideSearchForm();displayPosts()">Cancel</button>
                    </div>
               </div>


               <div id="post-list"></div>
               <script src="./assets/js/script.js"></script>
          </div>
     </body>
</html>