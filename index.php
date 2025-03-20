<?php
     include './config/createDatabase.php'; // This ensures $conn is available

     $query = "SELECT * FROM posts";
     $result = $conn->query($query);

     
?>

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
        <a href="index.php">Home</a>
        <a href="add_post.php">Add Post</a>
        <a href="search.php">Search</a>
    </div>
</div>

    <div class="container">
        <h1>All Blog Posts</h1>
        
        <?php
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<div class='post-card'>";
                echo "<h2><a href='view_post.php?id=" . $row['id'] . "'>" . $row['title'] . "</a></h2>";
                echo "<p>" . substr($row['content'], 0, 150) . "...</p>";
                echo "<small>Posted on: " . $row['created_at'] . "</small>";
                echo "</div>";
            }
        } else {
            echo "<p>No posts found.</p>";
        }
        ?>
    </div>

     </body>
</html>