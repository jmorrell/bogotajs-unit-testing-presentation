var postTemplate = 
  '<button class="close">&times;</button>' +
  '<div class="text"></div>' +
  '<div class="score">Score: <span class="vote"></span></div>' +
  '<div class="btn-group">' +
    '<button class="btn like">+</button>' +
    '<button class="btn dislike">-</button>' +
  '</div>';

var Post = Backbone.Model.extend({
  defaults: { likes: 0, dislikes: 0 },

  urlRoot: '../post',

  like: function() {
    var likes = this.get('likes');
    this.set({ likes: likes + 1 });
    this.save();
  },

  dislike: function() {
    var dislikes = this.get('dislikes');
    this.set({ dislikes: dislikes + 1 });
    this.save();
  },

  getTotal: function() {
    return this.get('likes') - this.get('dislikes');
  }

});

var PostView = Backbone.View.extend({
  className: 'post',
  template: postTemplate,

  events: {
    'click .like': 'like',
    'click .dislike': 'dislike',
    'click .close': 'close'
  },

  initialize: function() {
    this.$el.html(this.template);
    this.setText();
    this.setVote();

    this.model.on('change', this.setVote, this);
    this.model.on('change', this.setText, this);
    this.model.on('destroy', this.destroy, this);
  },

  setText: function() {
    this.$('.text').html(this.model.get('text'));
  },

  setVote: function() {
    this.$('.vote').html(this.model.getTotal());
  },

  destroy: function() {
    this.remove();
  },

  like: function() {
    this.model.like();
  },

  dislike: function() {
    this.model.dislike();
  },

  close: function() {
    this.model.destroy();
  }
});

var PostList = Backbone.Collection.extend({
  url: '../post',
  model: Post
});

var PostListView = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'addOne');
    this.collection.on('add', this.addOne, this);
    this.collection.each(this.addOne);
  },

  addOne: function(model) {
    this.$el.prepend(new PostView({ model: model }).el);
  }
});

var InputView = Backbone.View.extend({
  events: {
    'submit': 'newPost'
  },

  newPost: function(e) {
    e.preventDefault();
    this.collection.create({ text: this.$('textarea').val() });
    this.$('textarea').val('');
  }
});

var SummaryView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('change add destroy', this.update, this);
    this.update();
  },

  getSummary: function() {
    var add = function(a, b) { return a + b; };
    return {
      likes: this.collection.pluck('likes').reduce(add, 0),
      dislikes: this.collection.pluck('dislikes').reduce(add, 0),
      posts: this.collection.length
    };
  },

  update: function() {
    var summary = this.getSummary();
    this.$('.num-posts').html(summary.posts);
    this.$('.num-likes').html(summary.likes);
    this.$('.num-dislikes').html(summary.dislikes);
  }
});

