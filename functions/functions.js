const sqrtOf = require("./sr.js");

const splitByEqual = async (equation) => {
  return await equation.replace(/ /g, "").replace(/-/g, "+-").split("=");
};

const getNumber = (e, sign) => {
  let ne = {
    number: null,
    exp: null,
    sign: null,
  };
  let n = parseFloat(e);
  /* Bonus Un coefficient absent ("X^6") est considéré comme valant 1.  */
  if (isNaN(n) && e[0] == "-") {
    ne.number = -1;
  } else if (isNaN(n)) {
    ne.number = 1;
  }
  if (!isNaN(n)) {
    ne.number = n;
  }

  let el = e.split("^");
  /** Un X seul est considéré comme de coefficient 1 et de puissance 1. */
  if (el[0] == "X" && el.length == 1) {
    el.push(1);
  }

  /*Un coefficient seul ("4") est considéré comme étant en facteur de X^0.*/
  if (isNaN(el[0]) && !el[1]) {
    el.push(1);
  }
  if (!isNaN(el[0]) && !el[1]) {
    el.push(0);
  }
  ne.exp = el[1];
  ne.sign = sign;

  return ne;
};

const getNumberaExp = (e, s) => {
  let el;
  let sign = s;
  let result = [];

  e.map((element) => {
    if (element) {
      el = getNumber(element, sign);
      result.push(el);
    }
  });
  return result;
};

const le = (e) => {
  let array = e.a.split("+");
  return getNumberaExp(array, e.sign);
};

const symplifyElement = (e) => {
  let n = { number: null, exp: null };

  n.number = e.number * e.sign;
  n.exp = e.exp;
  return n;
};

const symplify = (e) => {
  let result = [];
  let n = {};
  e.map((el) => {
    n = symplifyElement(el);
    result.push(n);
  });
  return result;
};

const reduce = (e) => {
  let i = 0;
  let j = 0;

  while (i < e.length) {
    j = i + 1;
    while (j < e.length) {
      if (e[i].exp == e[j].exp) {
        e[i].number = e[i].number + e[j].number;
        e.splice(j, 1);

        j -= 1;
      }
      j++;
    }
    i++;
  }
  i = 0;
  while (i < e.length) {
    if (e[i].number == "0") {
      e.splice(i, 1);
      i -= 1;
    }
    i++;
  }

  return e;
};

const sort = (e) => {
  let i = 0;
  let j = 0;
  let n = {};
  while (i < e.length) {
    j = i + 1;
    while (j < e.length) {
      if (e[i].exp > e[j].exp) {
        n = e[i];
        e[i] = e[j];
        e[j] = n;
      }
      j++;
    }
    i++;
  }
  return e;
};

const rewrit = (e) => {
  let eq = "";
  let i = 0;
  let j = 0;

  while (i < e.length) {
    j = i + 1;
    if (e[i].number < 0 && j < e.length) {
      eq = eq.concat(" - ");
      eq = eq.concat(`${e[i].number * -1} * X^${e[i].exp}`);
    } else {
      if (i > 0) {
        eq = eq.concat(" + ");
      }
      eq = eq.concat(`${e[i].number} * X^${e[i].exp}`);
    }
    i++;
  }

  eq = eq.concat(" = 0");
  console.log(eq);
};

const checkDegree = (e) => {
  let d = e[0].exp;
  e.map((el) => {
    if (el.exp > d) {
      d = el.exp;
    }
  });
  return d;
};

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
  console.log(`Coefficients are: a = ${a} , b = ${b} , c = ${c} `);
  console.log(`Discriminant = b^2 − 4ac`);
  console.log("Quadratic Formula: X =  (−b ± √Discriminant) / 2a");
  let d = b * b - 4 * a * c;
  if (d > 0) {
    console.log(
      `The Discriminant is Positive: b^2 − 4ac = ${b}^2 - 4 * ${a} * ${c}`
    );
    console.log(`Discriminant = ${d}`);
    console.log(`Put in a, b and c:	X = (${b * -1} ± √|${d}|) / 2 * ${a}`);
    d = sqrtOf(d);
    console.log(`	X = (${b * -1} ± ${d}) /  ${a * 2}`);
    console.log(
      `	X = (${b * -1 - d}) /  ${a * 2} or X = (${b * -1 + d}) /  ${a * 2}`
    );
    console.log(
      `	X = ${(b * -1 - d) / (a * 2)} or X = ${(b * -1 + d) / (a * 2)}`
    );
  } else {
    console.log(
      `the Discriminant is nigative: b^2 − 4ac = ${b}^2 - 4 * ${a} * ${c}`
    );
    console.log(`Discriminant = ${d}`);
    console.log(`Put in a, b and c:	X = (${b * -1} ± √${d}) / 2 * ${a}`);
    console.log(`So X = (${b * -1} ± ${sqrtOf(d * -1)}i) / ${2 * a}`);
    console.log("Where 'i' is the imaginary number √−1 ");
    console.log(`So X = ${(b * -1) / (2 * a)} ± ${sqrtOf(d * -1) / (2 * a)}i `);
  }
};

const linearEquation = (e) => {
  let b = e[0].number;
  if (e.length > 1) {
    let a = e[1].number;
    console.log("a * X + b = 0");
    console.log("a * X = -b");
    console.log("X = - b/a");
    console.log("Let change a and b with there values");
    if (a != 0) {
      console.log(`X = - (${b} / ${a})`);
      console.log("X = " + -b / a);
    }
  } else if (e.length == 1) {
    console.log(`X = (1 / ${e[0].number}) * 0`);
    console.log(`X = 0`);
  } else {
    console.log("doesn't have a soulution");
  }
};

const resolveAll = (e) => {
  const degree = checkDegree(e);
  console.log(`Polynomial degree: ${degree}`);
  if (degree > 2) {
    console.log(
      "The polynomial degree is strictly greater than 2, I can't solve."
    );
  } else if (degree == 2) {
    quadraticEquation(e);
  } else if (degree == 1) {
    linearEquation(e);
  } else {
    console.log("else");
  }
};

module.exports = {
  splitByEqual,
  getNumber,
  getNumberaExp,
  le,
  symplify,
  reduce,
  sort,
  rewrit,
  checkDegree,
  quadraticEquation,
  linearEquation,
  resolveAll,
};
