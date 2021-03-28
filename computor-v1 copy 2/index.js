// const eq = "8 * X^0 - 6 * X^1 + 0 * X^2 - 5.6 * X^3 = 3 * X^0";
const fun = require("./functions");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your equation: ", (equation) => {
  equation && equation.includes("=") && main(equation);
  rl.close();
});

const main = (eq) => {
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
        if (result.length > 1) {
          fun.rewrit(result);
        }
        return result;
      })
      .then((result) => {
        fun.resolveAll(result);
      });
  } catch (err) {
    console.log(`this is the error:
    ${err}`);
  }
};
