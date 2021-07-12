// {
//     let createPost = function(){
//         let newPostForm = $('#new-post-form');
        
//         newPostForm.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'post',
//                 url:'/post/create-post',
//                 data: newPostForm.serialize(),
//                 success:function(data){
//                     let newPost = newPostDom(data.data.post);
//                     $('#posts').prepend(newPost);
//                     // $('#post>')
//                     console.log("from the fucnt",data.data.post,data.data.post.content);
//                 },error:function(error){
//                     console.log(error.resposntText);
//                 }
//             })
//         });
//     }

//     // method to create a post
//     let newPostDom = function(post){
//         // post = JSON.parse(post);
//         return $(`<div id = "post-${post._id}" class="post">
//         <dt><h4>post 1
//             <a class="delete-post-button" href="/post/destroy/${post._id }">X</a>
//         </h4></dt>
//         <dd>
//             <small>${post.user.name}</small><br>
//             <b>${post.content}</b>

//             <dl><form action="/comment-create" method="post">
//             <input type="text" name="content" placeholder="comment" required> <input type="hidden" name="post" value="${post._id }"><button type="submit">comment</button></form></dl>
//         </dd>
//     </div>`)
//     }


//     //method to delte a post from the dom
//     let deletePost = function(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'get',
//                 url:$(deleteLink).prop('href'),
//                 success:function(data){
//                     $(`#post-$(data.post_id)`)
//                 },error: function(error){
//                     console.log(error.resposntText);
//                 }
//             })
//         })
//     }







//     createPost();
// }