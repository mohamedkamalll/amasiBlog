

function displayPosts(id) {
     if(!id){
          let postList = document.getElementById("post-list");
          postList.innerHTML = ""; // Clear the list

          posts.forEach(post => {
               let postDiv = document.createElement("div");
               postDiv.classList.add("post-card"); 
               postDiv.id = `post-${post.id}`; 
               postDiv.innerHTML = `
               <h3>${post.title}</h3>
               <p>${post.content}</p>
               <small><strong>ID:</strong> ${post.id} | <strong>Created At:</strong> ${post.created_at}</small>
               <hr>
               <br>
               <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
               <button onclick = "deletePost(${post.id})">Delete</button>
               <hr>`;          
               postList.appendChild(postDiv);
          });  
     }else{
          //to handle the search 
          console.log(id)
          let postList = document.getElementById("post-list");
          post = posts.filter(post => post.id == id)
          if(post.length > 0){
               postList.innerHTML = ""; 
               console.log(post)
               post = post[0]
               if(post){
                    let postDiv = document.createElement("div");
                    postDiv.classList.add("post-card"); 
                    postDiv.id = `post-${post.id}`; 
                    postDiv.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <small><strong>ID:</strong> ${post.id} | <strong>Created At:</strong> ${post.created_at}</small>
                    <hr>
                    <br>
                    <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
                    <button onClick = "deletePost(${post.id})">Delete</button>
                    <hr>`;          
                    postList.appendChild(postDiv);
          }
         
          }else{
               window.alert(`No post found with ID ,${id}`)
          }
          
          hideSearchForm()
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
          // Add new post directly to array (avoid extra DB call)
          posts.splice(0,0,{id:data.id, title: title, content: content,created_at : data.created_at });
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

     function editPost(postId) { 
         console.log("testttttttttttttt",postId)
     
         let postDiv = document.getElementById(`post-${postId}`);
          let post = posts.find(p => p.id == postId);
          console.log("testttttttttttttt",postDiv)
          postDiv.innerHTML = `
               <input type="text" id="edit-title-${postId}" value="${post.title}">
               <textarea id="edit-content-${postId}">${post.content}</textarea>
               <br>
               <button onclick="savePost(${postId})">Save</button>
               <button onclick="displayPosts()">Cancel</button>
          `;
     }
     function savePost(postId) {
          let title = document.getElementById(`edit-title-${postId}`).value;
          let content = document.getElementById(`edit-content-${postId}`).value;
          console.log(title,content)
          let newPost = {
               id: postId,
               title: title,
               content: content
          };
          fetch("./api/edit_post.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newPost)
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
               console.log("3ashhhhhhhhhhh",posts)
                  // Update local posts array
                  posts = posts.map(post => {
                    if(post.id == postId){
                         return { ...post, title, content };
                    }return post
                  })
                  console.log(posts)
                  displayPosts(); 
              } else {
                  alert("Error: " + data.message);
              }
          })
          .catch(error => console.error("Error editing post:", error));
      }
displayPosts(); // Show posts on page load