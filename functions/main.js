const eq = "0 + 4 * X + X^2= X^2";
const fun = require("./functions");
const main = () => {
  try {
    fun
      .splitByEqual(eq)
      .then((result) => {
        let left = fun.le({ a: result[0], sign: 1 });
        let right = fun.le({ a: result[1], sign: -1 });
        return left.concat(right);
      })
      .then((result) => {
        return fun.symplify(result);
      })
      .then((result) => {
        return fun.reduce(result);
      })
      .then((result) => {
        return fun.sort(result);
      })
      .then((result) => {
        fun.rewrit(result);
        return result;
      })
      .then((result) => {
        fun.resolveAll(result);
      });
  } catch (err) {
    console.log(err);
  }
};
main();
