
// PostCollectionView
//     - Create new PostView when a new post is added

describe('PostListView', function() {

  beforeEach(function() {
    this.collection = new PostList([{ text: 'a'}, { text: 'b' }, { text: 'c' }]);
    this.view = new PostListView({
      collection: this.collection
    });
  });

  it('Addes a PostView for each existing model in the collection', function() {
    expect($(this.view.el).find('.post').length).toEqual(3);
  });

  it('creates a new PostView when a new post is added to the collection', function() {
    expect($(this.view.el).find('.post').length).toEqual(3);
    this.collection.add(new Post({ text: 'd' }));
    expect($(this.view.el).find('.post').length).toEqual(4);
  });
});
