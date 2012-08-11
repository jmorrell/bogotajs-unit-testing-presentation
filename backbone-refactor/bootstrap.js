$(function() {
  var postList = new PostList();

  var postListView = new PostListView({
    collection: postList,
    el: '#statuses'
  });

  var inputView = new InputView({
    collection: postList,
    el: '#new-status'
  });

  var summaryView = new SummaryView({
    collection: postList,
    el: '#summary'
  });

  postList.fetch({add: true});
});
