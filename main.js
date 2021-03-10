// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const spliter = async (el) => {
  let s = [];

  el = el.split("^");
  s.number = parseFloat(el[0]);
  s.exp = el[1];
  return s;
};

const rightElements = (e) => {
  let elements = e.equation;
  let sign = e.sign;
  let t = [];
  let r = 0;
  let eq = elements.replace(/ /g, "").replace(/-/g, "+-").split(/[+]/);
  //console.log(sign);

  eq.map((el) => {
    try {
      t.push(spliter(el));
    } catch (err) {
      console.log(err);
    }
  });

  // console.log(sign);

  t.forEach((re, index) => {
    re.then(async (value) => {
      return value.number * sign;
    });
  });
  return t;
};

const splitByEqual = async (equation) => {
  let splitedEquation = await equation.split("=");

  let t = {
    equation: splitedEquation[0],
    sign: 1,
  };
  let sp = rightElements(t);

  t = {
    equation: splitedEquation[1],
    sign: -1,
  };
  sp = sp.concat(rightElements(t));
  console.log(sp);
  sp.forEach((ele, index) => {
    ele.then(async (value, index) => {
      sp[index] = value * -1;
    });
  });
  return sp;
};

splitByEqual("5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0");

// rl.question("Enter your equation: ", (equation) => {
//   splitByEqual(equation);

//   rl.close();
// });
