
describe('Post Model', function() {

  beforeEach(function() {
    this.post = new Post({
      text: "This is a test post."
    });

    this.xhr = sinon.useFakeXMLHttpRequest();
    this.xhr.onCreate = function(req) {};
  });

  afterEach(function() {
    this.xhr.restore();
  });

  it('Should be initialized', function() {
    expect(this.post).toBeDefined();
  });

  it('Should have some default values', function() {
    expect(this.post.get('likes')).toEqual(0);
    expect(this.post.get('dislikes')).toEqual(0);
  });

  it('Should not have an id until it\'s been saved', function() {
    expect(this.post.get('id')).not.toExist();
  });

  it('should allow you to get values', function() {
    expect(this.post.get('text')).toEqual("This is a test post.");
    expect(this.post.get('likes')).toEqual(0);
    expect(this.post.get('dislikes')).toEqual(0);
  });

  it('should allow you to set values', function() {
    expect(this.post.get('text')).toEqual("This is a test post.");
    this.post.set({ text: 'This is a different string.' });
    expect(this.post.get('text')).toEqual("This is a different string.");
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

  it('should trigger a change event on vote', function() {
    var called = false;
    this.post.on('change', function() {
      called = true;
    });
    this.post.like();

    expect(called).toBeTruthy();
  });

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
    sinon.stub(jQuery, 'ajax').yieldsTo('success', {
      text: 'This is a test.',
      id: 1,
      likes: 0,
      dislikes: 0
    });

    this.post.save();

    var call = jQuery.ajax.firstCall;

    expect(call.args[0].type).toEqual('POST');
    expect(call.args[0].url).toEqual('../post');
    expect(call.args[0].data).toEqual('{"likes":0,"dislikes":0,"text":"This is a test post."}');

    jQuery.ajax.restore();
  });

  // Without tying implementation to jQuery
  it('should POST to ../post to save itself', function() {
    var spy = sinon.spy(this.xhr, 'onCreate');

    this.post.save();

    var arg = spy.firstCall.args[0];

    expect(arg.url).toEqual('../post');
    expect(arg.method).toEqual('POST');
    expect(arg.requestBody).toEqual('{"likes":0,"dislikes":0,"text":"This is a test post."}');

    this.xhr.onCreate.restore();
  });

});

describe('Post after saving to the server', function() {

  beforeEach(function() {
    var self = this;

    this.post = new Post({
      text: "This is a test post."
    });

    this.server = sinon.fakeServer.create();
      
    this.post.save();
    this.server.respond('POST', '../post',
      [201, { 'Content-Type': 'application/json' },
        '{ "id": 1, "text": "This is a test post.", "likes": 0, "dislikes": 0}']);
  });

  afterEach(function() {
    this.server.restore();
  });

  it('should have an id after being saved to the server', function() {
    expect(this.post.get('id')).toEqual(1);
  });

  it('should DELETE to ../post/:id to delete itself', function() {
    this.post.destroy();
    this.server.respond('DELETE', '../post/1', [204, {}, '']);

    var req = this.server.requests[1];
    expect(req.method).toEqual('DELETE');
    expect(req.url).toEqual('../post/1');
  });

  it('should PUT to ../post/:id to update itself', function() {
    this.post.set({ text: 'This is a new string' });
    this.post.save();
    this.server.respond('PUT', '../post/1', [200, {}, '{"text":"This is a new string"}']);

    expect(this.post.get('text')).toEqual("This is a new string");

    var req = this.server.requests[1];
    expect(req.method).toEqual('PUT');
    expect(req.url).toEqual('../post/1');
  });
});
