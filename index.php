<!DOCTYPE html>
<html>
     <head>
          <title>Simple Blog</title>
          <link rel="stylesheet" href="./assets/css/main.css">
     </head>
     <body>
          <div class="header-container">
               <div class="site-title">Simple Blog System</div>
               <div class="nav">
                    <a onclick="displayPosts()">Home</a>
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
                         <button onclick="handleAddPost()">Submit</button>
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
               <script src="./assets/js/ui.js"></script> <!-- javascript show and hide add and edit forms -->
               <script src="./assets/js/api.js"></script> <!-- all api methods -->
               <script src="./assets/js/script.js"></script>
          </div>
     </body>
</html>