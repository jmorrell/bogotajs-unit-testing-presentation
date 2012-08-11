


describe('InputView', function() {

  beforeEach(function() {
    var el = $(Fixtures.inputHTML);

    this.view = new InputView({
      collection: new PostList(),
      el: el
    });
  });

  it('creates a new Post on submit', function() {
    var stub = sinon.stub(this.view.collection, 'create');
    $(this.view.el).find('textarea').val('this is a test');

    $(this.view.el).trigger('submit');
    expect(stub).toHaveBeenCalled();
    expect(stub).toHaveBeenCalledWith({ text: 'this is a test' });

    stub.restore();
  });


});
