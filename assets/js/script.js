let postList = document.getElementById("post-list");
let posts = []
function createPostElement(post){
     let postDiv = document.createElement("div");
     postDiv.classList.add("post-card"); 
     postDiv.id = `post-${post.id}`; 
     postDiv.innerHTML = `
     <h3>${post.title}</h3>
     <p>${post.content}</p>
     <small><strong>ID:</strong> ${post.id} | <strong>Created At:</strong> ${post.created_at}</small>
     <hr>
     <br>
     <button class="edit-btn" onclick="handleEditPost(${post.id})">Edit</button>
     <button onclick = "handleDeletePost(${post.id})">Delete</button>
     <hr>`;          
     postList.appendChild(postDiv);
}

async function displayPosts(id) {
     if(posts.length == 0){
          let result = await fetchPosts();
          posts = result.posts;
     }
     if(!id){
          postList.innerHTML = "";
          posts.forEach(post => {
               createPostElement(post);               
          });  
     }else{
          //to handle the search 
          let postList = document.getElementById("post-list");
          post = posts.filter(post => post.id == id)
          if(post.length > 0){
               postList.innerHTML = ""; 
               if(post[0]){
                    createPostElement(post[0]);
          }         
          }else{
               window.alert(`No post found with ID ,${id}`);
          }
          hideSearchForm()
     }
}

async function handleAddPost() {
     let title = document.getElementById("post-title").value;
     let content = document.getElementById("post-content").value;
     if (title.trim() === "" || content.trim() === "") {
          alert("Title and content cannot be empty!");
          return;
     }
     let newPost = {
          title: title,
          content: content
     };
     let result = await addPost(newPost);
     if (result.success) {
          posts.splice(0,0,{id:result.id, title: title, content: content,created_at : result.created_at })
          displayPosts();
          hideAddPostForm();
     } else {
          alert("Failed to add post!");
     }
}

async function handleDeletePost(postId) {
    let result = await deletePost(postId);
         if (result.success) {
         alert("Post deteted successfully!");
         posts = posts.filter(post => post.id != postId)
         displayPosts();
         } else {
         alert("Failed to delete post!");
     }
}

async function handleEditPost(postId) { 
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
async function savePost(postId) {
     let title = document.getElementById(`edit-title-${postId}`).value;
     let content = document.getElementById(`edit-content-${postId}`).value;
     let newPost = {
          id: postId,
          title: title,
          content: content
     };
     let result = await editPost(newPost);
     if (result.success) {
          // Update local posts array
          posts = posts.map(post => {
          if(post.id == postId){
               return { ...post, title, content };
          }return post
          })
          displayPosts(); 
     } else {
          alert("Error: " + result.message);
     }
} 
displayPosts(); // Show posts on page load