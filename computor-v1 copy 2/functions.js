const quadraticEquation = require("./quadraticEquation");
const linearEquation = require("./linearEquation");

const splitByEqual = async (equation) => {
  return await equation
    .replace(/\"/g, "")
    .replace(/ /g, "")
    .replace(/-/g, "+-")
    .split("=");
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
  n.exp = e.exp ? e.exp : 0;
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
  if (e.length == 0) {
    e.push([{ number: 0, exp: 0 }]);
    return e;
  }
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
  console.log("\x1b[36m%s\x1b[0m", eq);
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

const resolveAll = (e) => {
  const degree = parseInt(checkDegree(e));
  if (degree) {
    console.log(`Polynomial degree: ${degree}`);
  }
  if (degree > 2) {
    console.log(
      "\x1b[35m%s\x1b[0m",
      `
      The polynomial degree is strictly greater than 2, I can't solve.`
    );
  } else if (degree == 2) {
    quadraticEquation(e);
  } else if (degree == 1) {
    linearEquation(e);
  } else {
    if (e[0].number == undefined) {
      console.log(
        "\x1b[32m%s\x1b[0m",
        `
        0 = 0
        each real number is a solution
      `
      );
    } else {
      console.log(
        "\x1b[31m%s\x1b[0m",
        `
        ${e[0].number} != 0
        There is no soulution`
      );
    }
  }
};

module.exports = {
  splitByEqual,
  le,
  symplify,
  reduce,
  sort,
  rewrit,
  resolveAll,
};
