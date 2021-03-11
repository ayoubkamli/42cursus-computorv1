const eq = "1 * X^0 + 2 * X^1 + 5 * X^2 = 0";

const splitByEqual = async (equation) => {
  return await equation.replace(/ /g, "").replace(/-/g, "+-").split("=");
};

const getNumber = (e, sign) => {
  let ne = {
    number: null,
    exp: null,
    sign: null,
  };
  ne.number = parseFloat(e);
  let el = e.split("^");
  ne.exp = el[1];
  ne.sign = sign;

  return ne;
};

const getNumberaExp = (e, s) => {
  let el;
  let sign = s;
  let result = [];

  e.map((element) => {
    el = getNumber(element, sign);
    result.push(el);
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
  // console.log(e);
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
  console.log("Quadratic Formula: X =  (−b ± √|Discriminant|) / 2a");
  let d = b * b - 4 * a * c;
  if (d > 0) {
    console.log(
      `The Discriminant is Positive: b^2 − 4ac = ${b}^2 - 4 * ${a} * ${c}`
    );
    console.log(`Discriminant = ${d}`);
    console.log(`Put in a, b and c:	X = (${b * -1} ± √|${d}|) / 2 * ${a}`);
    d = Math.sqrt(d);
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
    console.log(`Put in a, b and c:	X = (${b * -1} ± √|${d}|) / 2 * ${a}`);
    console.log(`So X = (${b * -1} ± ${Math.sqrt(d * -1)}i) / ${2 * a}`);
    console.log("Where 'i' is the imaginary number √−1 ");
    console.log(
      `So X = ${(b * -1) / (2 * a)} ± ${Math.sqrt(d * -1) / (2 * a)}i `
    );
  }
};

const linearEquation = (e) => {
  console.log("linearEquation");
};

const main = () => {
  try {
    splitByEqual(eq)
      .then((result) => {
        let left = le({ a: result[0], sign: 1 });
        let right = le({ a: result[1], sign: -1 });
        return left.concat(right);
      })
      .then((result) => {
        return symplify(result);
      })
      .then((result) => {
        return reduce(result);
      })
      .then((result) => {
        return sort(result);
      })
      .then((result) => {
        rewrit(result);
        return result;
      })
      .then((result) => {
        // console.log(result);
        const degree = checkDegree(result);
        console.log(`Polynomial degree: ${degree}`);
        if (degree > 2) {
          console.log(
            "The polynomial degree is strictly greater than 2, I can't solve."
          );
        } else if (degree == 2) {
          quadraticEquation(result);
        } else if (degree == 1) {
          linearEquation(result);
        } else {
          console.log("else");
        }
      });
  } catch (err) {
    console.log(err);
  }
};
main();
