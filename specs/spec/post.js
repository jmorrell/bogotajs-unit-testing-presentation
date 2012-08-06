
describe('Post Model', function() {

  beforeEach(function() {
    var self = this;

    this.post = new Post({
      text: "This is a test post."
    });
    this.xhr = sinon.useFakeXMLHttpRequest();
    this.requests = [];
    this.xhr.onCreate = function(req) {
      self.requests.push(req);
    };
      
  });

  afterEach(function() {
    this.xhr.restore();
  });

  it('Should be initialized', function() {
    expect(this.post).toExist();
  });

  it('Should have some default values', function() {
    var data = this.post.toJSON();
    expect(data.likes).toEqual(0);
    expect(data.dislikes).toEqual(0);
  });

  it('Should not have an id until it\'s been saved', function() {
    expect(this.post.get('id')).not.toExist();
  });

  it('should allow you to get values', function() {
    expect(this.post.get('text')).toEqual("This is a test post.");
    expect(this.post.get('likes')).toEqual(0);
    expect(this.post.get('dislikes')).toEqual(0);
  });

  it('should allow you to vote up', function() {
    expect(this.post.get('likes')).toEqual(0);
    this.post.like();
    expect(this.post.get('likes')).toEqual(1);
  });

  it('should allow you to vote down', function() {
    expect(this.post.get('dislikes')).toEqual(0);
    this.post.dislike();
    expect(this.post.get('dislikes')).toEqual(1);
  });

  it('should get a vote total, likes - dislikes', function() {
    expect(this.post.getTotal()).toEqual(0);
    this.post.like();
    expect(this.post.getTotal()).toEqual(1);
    this.post.dislike();
    expect(this.post.getTotal()).toEqual(0);
    this.post.like();
    this.post.like();
    expect(this.post.getTotal()).toEqual(2);
    this.post.dislike();
    this.post.dislike();
    this.post.dislike();
    expect(this.post.getTotal()).toEqual(-1);
  });

  /*
  it('should trigger a change event on vote', function() {
    this.post.on('change', function() {
      expect(1).toExist(); // ?
    });
    this.post.like();
  });
  */

  it('should trigger a change event on vote', function() {
    var spy = sinon.spy();
    this.post.on('change', spy);

    this.post.like();

    expect(spy).toHaveBeenCalledOnce();

    this.post.dislike();
    expect(spy).toHaveBeenCalledTwice();
  });


  // Show example with jQuery.ajax stubing
  it('should know how to save itself to the server', function() {
    sinon.stub(jQuery, 'ajax');
    this.post.save();

    expect(jQuery.ajax.calledWithMatch({ 
      method: 'POST',
      url: "../post",
      dataType: 'json',
      data: {
        text: "This is a test post.",
        likes: 0,
        dislikes: 0
      }
    })).toBeTruthy();
  });

  // Without tying implementation to jQuery
  it('should POST to ../post to save itself', function() {
    this.post.save();
    expect(this.requests.length).toEqual(1);
    expect(this.requests[0].url).toEqual('../post');
    expect(this.requests[0].method).toEqual('POST');

    console.log(this.requests[0]);
  });

});

describe('Post after saving to the server', function() {

  beforeEach(function() {
    var self = this;

    this.post = new Post({
      text: "This is a test post."
    });

    this.server = sinon.fakeServer.create();
    this.server.respondWith('POST', '../post',
      [201, { "Content-Type": "application/json" },
       '{ id: 1, text: "This is a test post.", likes: 0, dislikes: 0 }']);

    this.post.save();
    this.server.respond();
  });

  afterEach(function() {
    this.server.restore();
  });

  it('should have an id after being saved to the server', function() {
    expect(this.post.get('id')).toEqual(1);
  });

  it('should DELETE to ../post/:id to delete itself', function() {
    this.server.respondWith('DELETE', '../post/1', [204, {}, '']);
    this.post.delete();
    this.server.respond();

  });

  it('should PUT to ../post/:id to update itself', function() {

  });
});
