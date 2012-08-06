

var postTemplate = _.template(
  '<div class="post" data-id="<%= id %>" data-likes="<%= likes %>" data-dislikes="<%= dislikes %>" >' +
    '<div><%= text %></div>' +
    '<div>Votes: <span class="vote"><%= likes - dislikes %></span></div>' +
    '<div class="btn-group">' +
      '<button class="btn like">+</button>' +
      '<button class="btn dislike">-</button>' +
    '</div>' +
    '<button class="close">&times;</button>' +
  '</div>'
);

function deletePost(postDiv) {
  var postID = $(postDiv).data('id');
  $.ajax({
    url: '../post/' + postID,
    type: 'DELETE',
    success: function() {
      $(postDiv).remove();
    }
  });
}

function vote(postDiv, delta) {
  var postID = $(postDiv).data('id');
  var likes = $(postDiv).data('likes') + delta;
  $.ajax({
    url: '../post/' + postID,
    type: 'PUT',
    dataType: 'json',
    data: { likes: likes },
    success: function() {
      $(postDiv).data('likes', likes);
      $(postDiv).find('.vote').html(likes);
    }
  });
}

function newPost(post) {
  $('#statuses').prepend(postTemplate(post));

  $('#statuses').find('.post:first .close').click(function(e) {
    e.preventDefault();
    var postDiv = $(e.currentTarget).parents('.post')[0];
    deletePost(postDiv);
  });

  $('#statuses').find('.post:first .like').click(function(e) {
    e.preventDefault();
    var postDiv = $(e.currentTarget).parents('.post')[0];
    vote(postDiv, 1);
  });

  $('#statuses').find('.post:first .dislike').click(function(e) {
    e.preventDefault();
    var postDiv = $(e.currentTarget).parents('.post')[0];
    vote(postDiv, -1);
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
