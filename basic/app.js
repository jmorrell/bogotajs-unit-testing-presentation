
$(function() {
    $('#new-status').submit(function(e) {
        e.preventDefault();

        $.ajax({
            url: '../post',
            type: 'POST',
            dataType: 'json',
            data: { text: $(this).find('textarea').val() },
            success: function(data) {
                $('#statuses').prepend('<div class="post"><div class="text">' + data.text + '</div></div>');
                $('#new-status').find('textarea').val('');
            }
        });
    });

    $.get('../post', function(posts) {
      for(var i = 0; i < posts.length; ++i) {
        $('#statuses').prepend('<div class="post"><div class="text">' + posts[i].text + '</div></div>');
      }
    });

});
