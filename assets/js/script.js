function showAddPostForm() {
     document.getElementById("add-post-form").style.display = "block";
}

function hideAddPostForm() {
     document.getElementById("add-post-form").style.display = "none";
}

function showSearchForm() {
     document.getElementById("search-form").style.display = "block";
}

function hideSearchForm() {
     document.getElementById("search-form").style.display = "none";
}

function displayPosts(id) {
     if(!id){
          let postList = document.getElementById("post-list");
          postList.innerHTML = ""; // Clear the list

          posts.forEach(post => {
               let postDiv = document.createElement("div");
               postDiv.classList.add("post-card"); 
               postDiv.innerHTML = `
               <h3>${post.title}</h3>
               <p>${post.content}</p>
               <small><strong>ID:</strong> ${post.id} | <strong>Created At:</strong> ${post.created_at}</small>
               <hr>
               <br>
               <button class="edit-btn">Edit</button>
               <button onclick = "deletePost(${post.id})">Delete</button>
               <hr>`;          
               postList.appendChild(postDiv);
          });  
     }else{
          console.log(id)
          let postList = document.getElementById("post-list");
          postList.innerHTML = ""; 
          post = posts.filter(post => post.id == id)
          console.log(post)
          post = post[0]
          if(post){
               let postDiv = document.createElement("div");
               postDiv.classList.add("post-card"); 
               postDiv.innerHTML = `
               <h3>${post.title}</h3>
               <p>${post.content}</p>
               <small><strong>ID:</strong> ${post.id} | <strong>Created At:</strong> ${post.created_at}</small>
               <hr>
               <br>
               <button class="edit-btn" >Edit</button>
               <button class="delete-btn" >Delete</button>
               <hr>`;          
               postList.appendChild(postDiv);
          }else{
               window.alert(`No post found with ID ,${id}`)
          }
          
     }
     
}
function addPost() {
     let title = document.getElementById("post-title").value;
     let content = document.getElementById("post-content").value;

     if (title.trim() === "" || content.trim() === "") {
          alert("Title and content cannot be empty!");
          return;
     }

     // Create a new post object
     let newPost = {
          title: title,
          content: content
     };

     // Send the post to PHP for database insertion
     fetch("./api/add_post.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost)
     })
     .then(response => response.json())
     .then(data => {
          console.log(data)
          if (data.success) {
          alert("Post added successfully!");

          // Add new post directly to array (avoid extra DB call)
          posts.push({id:data.id, title: title, content: content,created_at : data.created_at });
          console.log(posts)

          // Refresh UI
          displayPosts();
          hideAddPostForm();
          } else {
          alert("Failed to add post!");
          }
     })
     .catch(error => console.error("Fetch error:", error));
}


function deletePost(postId) {
     // Send the id to PHP 
    console.log("testttttttttttttt",postId)
    fetch("./api/delete_post.php", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({"id" : postId})
     })
     .then(response => response.json())
     .then(data => {
          console.log(data)
          if (data.success) {
          alert("Post deteted successfully!");
          posts = posts.filter(post => post.id != postId)
          console.log(posts)
          displayPosts();
          } else {
          alert("Failed to delete post!");
          }
     })
     .catch(error => console.error("Fetch error:", error));
     }

displayPosts(); // Show posts on page load