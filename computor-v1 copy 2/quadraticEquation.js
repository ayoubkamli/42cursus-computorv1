const sqrtOf = require("./sqrt.js");

const quadraticEquation = (e) => {
  let a = 0;
  let b = 0;
  let c = 0;
  e.map((el) => {
    if (el.exp == 2) {
      a = el.number;
    }

    if (el.exp == 1) {
      b = el.number;
    }

    if (el.exp == 0) {
      c = el.number;
    }
  });
  console.log(
    "\x1b[32m%s\x1b[0m",
    `
    Coefficients are:
      a = ${a} , b = ${b} , c = ${c} `
  );
  console.log(
    "\x1b[33m%s\x1b[0m",
    `
    Discriminant = b^2 − 4ac`
  );
  console.log(
    "\x1b[34m%s\x1b[0m",
    `
    Quadratic Formula:
      X =  (−b ± √Discriminant) / 2a`
  );
  let d = b * b - 4 * a * c;
  if (d > 0) {
    console.log(
      "\x1b[35m%s\x1b[0m",
      `
    The Discriminant is Positive:
      b^2 − 4ac = ${b}^2 - 4 * ${a} * ${c}`
    );
    console.log(
      "\x1b[4m%s\x1b[0m",
      `
      Discriminant = ${d}`
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      `
      Put in a, b and c:
        X = (${b * -1} ± √|${d}|) / 2 * ${a}`
    );
    d = sqrtOf(d);
    console.log(`
      X = (${b * -1} ± ${d}) /  ${a * 2}`);
    console.log(
      `
        X = (${b * -1 - d}) /  ${a * 2} 
      or 
        X = (${b * -1 + d}) /  ${a * 2}`
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      `
        X = ${(b * -1 - d) / (a * 2)}
      or
        X = ${(b * -1 + d) / (a * 2)}`
    );
  } else {
    console.log(
      "\x1b[36m%s\x1b[0m",
      `the Discriminant is nigative: b^2 − 4ac =
              ${b}^2 - 4 * ${a} * ${c}`
    );
    console.log(`"\x1b[4m%s\x1b[0m",
      Discriminant =
        ${d}`);
    console.log(
      "\x1b[36m%s\x1b[0m",
      `Put in a, b and c:
              X = (${b * -1} ± √${d}) / 2 * ${a}`
    );
    console.log(`So
              X = (${b * -1} ± ${sqrtOf(d * -1)}i) / ${2 * a}`);
    console.log("Where 'i' is the imaginary number √−1 ");
    console.log(
      "\x1b[36m%s\x1b[0m",
      `So
              X = ${(b * -1) / (2 * a)} ± ${sqrtOf(d * -1) / (2 * a)}i `
    );
  }
};

module.exports = quadraticEquation;
