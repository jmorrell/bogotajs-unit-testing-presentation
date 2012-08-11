describe('Javascript Typed Arrays', function() {

  it('will fail in IE < 10', function() {
    var buffer = new ArrayBuffer(24);
    var int32View = new Int32Array(buffer);

    for (var i = 0; i < int32View.length; i++) {
      int32View[i] = i*2;
    }

    for (i = 0; i < int32View.length; i++) {
      expect(int32View[i]).toEqual(i * 2);
    }
  });

});
