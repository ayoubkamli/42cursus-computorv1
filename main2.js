const eq =
  "5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0- 8 * X^0 - 6 * X^1 + 0 * X^2 - 5.6 * X^3 ";

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

const main = async () => {
  try {
    splitByEqual(eq)
      .then((result) => {
        let left = le({ a: result[0], sign: 1 });
        let right = le({ a: result[1], sign: -1 });
        return left.concat(right);
      })
      .then((result) => {
        console.log(result);
      });
  } catch (err) {
    console.log(err);
  }
};
main();
