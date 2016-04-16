import Board from "../Board";
import test from "tape";

test('Board constructor', t => {
  var b = new Board(10, 20, [
    {x: 4, y: 4},
    {x: 8, y: 4},
    {x: 5, y: 7}
  ]);
  t.equal(10, b.row);
  t.equal(20, b.col);
  t.equal(1, b.getIndex(4, 4));
  t.equal(1, b.getIndex(8, 4));
  t.equal(1, b.getIndex(5, 7));
  t.equal(1, b.getIndex(5, 6));
  t.end();
});
