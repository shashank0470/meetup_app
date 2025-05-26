


// Method to submit the form for new post using AJAX
const createPost = function() {
    let newPostForm = $("#new-post-form");
    
    newPostForm.submit(function(e) {
        e.preventDefault(); // Prevent default form submission
        
        $.ajax({
            type: "post",
            url: "/post/create",
            data: newPostForm.serialize(),
            success: function(data) {
                let newPost = newPostDom(data.data.post);
                $('#posts-list-container').prepend(newPost);
                attachDeleteHandler($('.delete-post-button', newPost));
                
                // IMPORTANT: Attach comment handler to new post
                attachCommentHandler($('.post-comment form', newPost));
                
                // Clear the form
                $('textarea', newPostForm).val('');

                new Noty({
                    theme: 'relax',
                    text: data.message || "Post created!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });
};

// NEW: Method to handle comment creation with AJAX
const createComment = function(form) {
    $(form).submit(function(e) {
        e.preventDefault(); // Prevent default form submission
        
        $.ajax({
            type: "post",
            url: "/comment/create",
            data: $(this).serialize(),
            success: function(data) {
                // Find the comments container for this specific post
                let postId = $(form).find('input[name="post"]').val();
                let commentsContainer = $(`#content-${postId} .allcomment`);
                
                // Create new comment HTML
                let newComment = newCommentDom(data.data.comment);
                commentsContainer.append(newComment);
                
                // Clear the comment input
                $(form).find('input[name="content"]').val('');

                new Noty({
                    theme: 'relax',
                    text: data.message || "Comment added!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
            },
            error: function(error) {
                console.log('Error creating comment:', error);
            }
        });
    });
};

// Method to create a post in DOM
let newPostDom = function(post) {
    return $(`
        <div id="content-${post._id}">
            <li id="hh">
                <div>${post.content}</div>
                <a class="delete-post-button" href="/post/delete/${post._id}">
                    <i class="fa-solid fa-delete-left"></i>
                </a>
                <div>
                    ${post.user.name ? post.user.name : ''}
                </div>
            </li>
            <div class="post-comment">
                <form action="/comment/create" method="POST">
                    <input type="text" name="content" placeholder="Enter your comment" required>
                    <input type="hidden" name="post" value="${post._id}">
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div class="allcomment">
                <!-- Comments will be added here -->
            </div>
        </div>
    `);
};

// NEW: Method to create a comment in DOM
let newCommentDom = function(comment) {
    return $(`
        <div class="comment">
            { content: '${comment.content}' }
        </div>
    `);
};

// Function to attach delete handler to a delete button
function attachDeleteHandler(deleteLink) {
    $(deleteLink).on('click', function(e) {
        e.preventDefault();
        deletePost($(this));
    });
}

// NEW: Function to attach comment handler to comment forms
function attachCommentHandler(commentForm) {
    createComment(commentForm);
}

// Function to perform delete operation
function deletePost($link) {
    $.ajax({
        type: 'get',
        url: $link.attr('href'),
        success: function(data) {
            $(`#content-${data.data.post_id}`).remove();

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
    
    // NEW: Apply comment functionality to existing comment forms
    $('.post-comment form').each(function() {
        attachCommentHandler($(this));
    });
});