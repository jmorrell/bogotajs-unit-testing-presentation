var postTemplate = _.template(
  '<div class="post" data-id="<%= id %>" data-likes="<%= likes %>" data-dislikes="<%= dislikes %>" >' +
    '<button class="close">&times;</button>' +
    '<div class="text"><%= text %></div>' +
    '<div class="score">Score: <span class="vote"><%= likes - dislikes %></span></div>' +
    '<div class="btn-group">' +
      '<button class="btn like">+</button>' +
      '<button class="btn dislike">-</button>' +
    '</div>' +
  '</div>'
);

function deletePost(postDiv) {
  var postID = $(postDiv).data('id');
  $.ajax({
    url: '../post/' + postID,
    type: 'DELETE',
    success: function() {
      $(postDiv).remove();
      updateSummary();
    }
  });
}

function updateVotes(postDiv) {
  var vote = $(postDiv).data('likes') - $(postDiv).data('dislikes');
  $(postDiv).find('.vote').html(vote);
}

function updateSummary() {
  var $posts = $('.post');
  var numPosts = $posts.length;

  var likes = $posts.map(function(i, el) { 
    return +$(el).data('likes'); 
  });
  var dislikes = $posts.map(function(i, el) { 
    return +$(el).data('dislikes'); 
  });

  var add = function(a, b) { return a + b; };

  var numLikes = _.reduce(likes, add, 0);
  var numDislikes = _.reduce(dislikes, add, 0);

  $('#summary').find('.num-posts').html(numPosts);
  $('#summary').find('.num-likes').html(numLikes);
  $('#summary').find('.num-dislikes').html(numDislikes);
}

function like(postDiv) {
  var postID = $(postDiv).data('id');
  var likes = $(postDiv).data('likes') + 1;
  $.ajax({
    url: '../post/' + postID,
    type: 'PUT',
    dataType: 'json',
    data: { likes: likes },
    success: function() {
      $(postDiv).data('likes', likes);
      updateVotes(postDiv);
      updateSummary();
    }
  });
}

function dislike(postDiv) {
  var postID = $(postDiv).data('id');
  var dislikes = $(postDiv).data('dislikes') + 1;
  $.ajax({
    url: '../post/' + postID,
    type: 'PUT',
    dataType: 'json',
    data: { dislikes: dislikes },
    success: function() {
      $(postDiv).data('dislikes', dislikes);
      updateVotes(postDiv);
      updateSummary();
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
    like(postDiv);
  });

  $('#statuses').find('.post:first .dislike').click(function(e) {
    e.preventDefault();
    var postDiv = $(e.currentTarget).parents('.post')[0];
    dislike(postDiv);
  });

  updateSummary();
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
