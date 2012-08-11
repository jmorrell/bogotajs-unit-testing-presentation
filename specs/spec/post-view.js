
describe('PostView', function() {
  
  beforeEach(function() {
    this.post = new Post({ text: 'this is a test' });

    this.view = new PostView({
      model: this.post
    });
  });

  it('should exist', function() {
    expect(this.view).toBeDefined();
  });

  it('should render a dom element to this.el', function() {
    expect(this.view.el).toBeTruthy();
    expect($(this.view.el)).toBe('div');
    expect($(this.view.el)).toHaveClass('post');
  });
  
  it('should have certain dom elements', function() {
    expect($(this.view.el).find('.text').length).toBeTruthy();
    expect($(this.view.el).find('.like').length).toBeTruthy();
    expect($(this.view.el).find('.dislike').length).toBeTruthy();
    expect($(this.view.el).find('.close').length).toBeTruthy();
    expect($(this.view.el).find('.vote').length).toBeTruthy();
  });

  it('should fill in the DOM with data from the post', function() {
    expect($(this.view.el).find('.text').text()).toEqual('this is a test');
    expect($(this.view.el).find('.vote').text()).toEqual('0');
  });

  it('should call like on the model when .like is clicked', function() {
    var stub = sinon.stub(this.post, 'like');

    // Click on the .like DOM element
    $(this.view.el).find('.like').click();

    expect(stub).toHaveBeenCalled();
    stub.restore();
  });

  it('should call dislike on the model when .dislike is clicked', function() {
    var stub = sinon.stub(this.post, 'dislike');

    // Click on the .dislike DOM element
    $(this.view.el).find('.dislike').click();

    expect(stub).toHaveBeenCalled();
    stub.restore();
  });

  it('should update the text of .text when the model text changes', function() {
    var $text = $(this.view.el).find('.text');
    expect($text.text()).toEqual('this is a test');

    // Change the post text
    this.post.set({ text: 'this is a new string' });

    expect($text.text()).toEqual('this is a new string');
  });

  it('should change the vote when the vote count changes', function() {
    var $vote = $(this.view.el).find('.vote');

    expect($vote.text()).toEqual('0');
    this.post.set({ likes: 1 });
    expect($vote.text()).toEqual('1');
    this.post.set({ dislikes: 1 });
    expect($vote.text()).toEqual('0');
  });

  it('should call destroy on the model when .close is clicked', function() {
    var stub = sinon.stub(this.post, 'destroy');

    // Click on the .dislike DOM element
    $(this.view.el).find('.close').click();

    expect(stub).toHaveBeenCalled();
    stub.restore();
  });

  it('should call remove on itself when the model is destroyed', function() {
    var stub = sinon.stub(this.view, 'remove');

    this.post.destroy();
    expect(stub).toHaveBeenCalled();
    stub.restore();
  });

});
