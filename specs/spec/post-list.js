
describe('PostList', function() {

  beforeEach(function() {
    this.collection = new PostList([{ text: 'a' }, { text: 'b' }]);
    this.server = sinon.fakeServer.create();
  });

  afterEach(function() {
    this.server.restore();
  });

  it('should have 2 post objects', function() {
    expect(this.collection.length).toEqual(2);
  });

  it('should know how to create a new Post and save it to the server', function() {
    this.collection.create({ text: 'c' });
    this.server.respondWith('POST', '../post',
      [201, { "Content-Type": "application/json" },
       '{ id: 1, text: "c", likes: 0, dislikes: 0 }']);
    this.server.respond();
    expect(this.collection.length).toEqual(3);
  });

  it('should remove destroyed models from the collection', function() {
    this.collection.first().destroy();
    expect(this.collection.length).toEqual(1);
  });

});
