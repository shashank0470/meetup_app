// Method to submit the form for new post using AJAX
const createPost = function() {
    let newPostForm = $("#new-post-form");
    
    newPostForm.submit(function(e) {
        e.preventDefault(); // Prevent default form submission - this was missing
        
        //here we written a ajax code.
        
        //Ajax can be used to upload files in the server, submitting the form or sending data to the server, dynamically adding to js using JSON.
        $.ajax({
            type: "post",
            url: "/post/create",
            //serialize: It converts form data into a string for sending via AJAX
            data: newPostForm.serialize(), // Changed from serializeUser() to serialize()
            success: function(data) {
                let newPost = newPostDom(data.data.post);
                $('#posts-list-container').prepend(newPost); // Add new post to DOM
                attachDeleteHandler($('.delete-post-button', newPost));
                // Clear the form
                $('textarea', newPostForm).val('');

                // we need to explicitly show the Noty notifications since the page isn't refreshing
                new Noty({
                    theme: 'relax',
                    text: data.message || "Post created!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
            },
            error: function(error) {
                console.log('Error:', error); // Add error handling
            }
        });
    });
};

// Method to create a post in DOM
let newPostDom = function(post) {
    return $(`
        <div id="content-${post._id}">
            <li id="hh">
            <div> ${post.content }</div>
            <a class="delete-post-button" href="/post/delete/${post._id}"> <i class="fa-solid fa-delete-left"></i> </a>
            <div>
                ${post.user.name ? post.user.name : ''}
            </div>
            </li>
            <div class="post-comment">
                <form action="/comment/create" method="POST">
                    <input type="text" name="content" placeholder="Enter your comment" required>
                    <input type="hidden" name="post" value="${post._id}">
                    <button>Submit</button>
                </form>
            </div>
            <div class="allcomment">
                <!-- Comments will be loaded separately -->
            </div>
        </div>
    `);
};


//attachDeleteHandler: Just attaches the click event
// // Function to attach delete handler to a delete button
function attachDeleteHandler(deleteLink) {
    $(deleteLink).on('click', function(e) {
        e.preventDefault();
        deletePost($(this));
    });
}

// deletePost: Just handles the AJAX delete operation

    // Function to perform delete operation
function deletePost($link) {
    $.ajax({
        type: 'get',
        url: $link.attr('href'),
        success: function(data) {
            $(`#content-${data.data.post_id}`).remove();

            // we need to explicitly show the Noty notifications since the page isn't refreshing
            new Noty({
                theme: 'relax',
                text: data.message || "Post deleted!",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();

        },
        error: function(error) {
            console.log("Error deleting post:", error);
        }
    });
}

// Document ready function
$(document).ready(function() {
    createPost();

    // Apply delete functionality to existing posts
    $('.delete-post-button').each(function() {
        attachDeleteHandler($(this));
    });
});

