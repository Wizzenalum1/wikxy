// comment creation:
//  connect form
//  send it to the target link

// to delete the forms 
    // set the button to all the persons
    // 

//  retrun value will have post id, comment, usser data to create the post.
let po2 = ""
{
    function createComment(){
        let commentForm = $('.comment-form');
        commentForm.submit(function(event){
            event.preventDefault();
            let commentForm = event.target;
            $.post("/comment-create",$(commentForm).serialize(),function(data){
                // console.log(data);
                newComment(data.data);
                notySuccess(true,"Success: comment created ")
                // setting the link to delte event listner.
                $(`#comment-${data.data.commentId}`).on('click',function(event){
                    event.preventDefault();
                    deleteComment($(event.target));
                });
                commentForm.reset();
                // po2 = data.data;
            })
        })
    }
    function newComment(data){
        console.log(data.commentId)
        let output = `
        <div id = "comment-${data.commentId}">
            <li>${data.comment}</li>
            <small> user is ${data.userName}</small>
                <small style="background-color: red;">
                <a href="/destroy/${data.commentId}">X</a>
            </small> 
        </div>`
        $("#post-"+data.postId+" .comments").append(output);
    }
    
    function deleteComment(anchor){
        console.log("this wont delte")
        // po2 = anchor;
        $.get(`${anchor.prop('href')}`,function(data){
            // console.log(data)
            // po2 = data;
            $(`#comment-${data.id}`).remove();
            notySuccess(false,"succcess: comment deleted ")

        })
    }

    $(".delete-comment").on('click',function(event){
        event.preventDefault();
        deleteComment($(event.target));
    })



    createComment();
}