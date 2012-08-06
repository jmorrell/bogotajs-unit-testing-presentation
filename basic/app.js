
$(function() {
    $('#new-status').submit(function(e) {
        e.preventDefault();

        $.ajax({
            url: '../post',
            type: 'POST',
            dataType: 'json',
            data: { text: $(this).find('textarea').val() },
            success: function(data) {
                $('#statuses').prepend('<div>' + data.text + '</div>');
                $('#new-status').find('textarea').val('');
            }
        });
    });

    $.get('../post', function(posts) {
      for(var i = 0; i < posts.length; ++i) {
        $('#statuses').prepend('<div>' + posts[i].text + '</div>');
      }
    });

});
