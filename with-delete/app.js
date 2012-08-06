

var postTemplate = _.template(
  '<div class="post" data-id="<%= id %>" >' +
    '<div><%= text %></div>' +
    '<button class="close">&times;</button>' +
  '</div>'
);

function deletePost(postDiv, postID) {
  $.ajax({
    url: '../post/' + postID,
    type: 'DELETE',
    success: function() {
      $(postDiv).remove();
    }
  });
}

function newPost(post) {
  $('#statuses').prepend(postTemplate(post));

  $('#statuses').find('.post:first .close').click(function(e) {
    e.preventDefault();
    var postDiv = $(e.currentTarget).parent('.post')[0];
    var postID = $(postDiv).data('id');
    deletePost(postDiv, postID);
  });
}

$(function() {
  $('#new-status').submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: '../post',
      type: 'POST',
      dataType: 'json',
      data: { text: $(this).find('textarea').val() },
      success: function(post) {
        newPost(post);
        $('#new-status').find('textarea').val('');
      }
    });
  });

  $.get('../post', function(posts) {
    for(var i = 0; i < posts.length; ++i) {
      newPost(posts[i]);
    }
  });

});
