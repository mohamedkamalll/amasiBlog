async function fetchPosts(){
     try {
          let response = await fetch("./api/fetch_posts.php", {
              method: "GET",
          });
          return await response.json();
      } catch (error) {
          console.error("Error fetching posts:", error);
          return { success: false };
      }
}

async function addPost(newPost){
     try {
          let response = await fetch("./api/add_post.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newPost)
          });
          return await response.json();
      } catch (error) {
          console.error("Error adding post:", error);
          return { success: false };
      }
}

async function deletePost(postId){
     try {
          let response = await fetch("./api/delete_post.php", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({"id" : postId})
          });  
          return await response.json();
     } catch (error) {
         console.error("Error deleting post:", error);
         return { success: false };
     }
}

async function editPost(newPost){
     try {
          let response = await fetch("./api/edit_post.php", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(newPost)
          })
          return await response.json();
     } catch (error) {
         console.error("Error editing post:", error);
         return { success: false };
     }
}