import Board from "../Board";
import test from "tape";

test('Board constructor', t => {
  t.plan(2);
  var b = new Board(10, 20);
  t.equal(10, b.row);
  t.equal(20, b.col);
});
