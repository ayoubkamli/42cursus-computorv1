const splitByPlus = (e, sign) => {
  let arr = e.split("+");
  let arrEl = null;
  let result = [];
  arr.map((el) => {
    if (el.match("\\d\\*X\\^\\d$")) {
      n = { number: null, exp: null, sign: sign };
      arrEl = el.split("*X^");
      n.number = isNaN(parseFloat(arrEl[0])) ? 1 : parseFloat(arrEl[0]);
      n.exp = isNaN(parseFloat(arrEl[1])) ? 0 : parseFloat(arrEl[1]);
      result.push(n);
    } else if (el.match("X\\^\\d")) {
      n = { number: null, exp: null, sign: sign };
      arrEl = el.split("X^");
      n.number = 1;
      n.exp = isNaN(parseFloat(arrEl[1])) ? 0 : parseFloat(arrEl[1]);
      result.push(n);
    } else if (el.match("\\d\\*X$")) {
      console.log(el);
      n = { number: null, exp: null, sign: sign };
      n.number = parseFloat(el);
      n.exp = 1;
      result.push(n);
    } else if (!isNaN(el)) {
      n = { number: parseFloat(el), exp: 0, sign: sign };
      result.push(n);
    } else {
      console.log(`Syntax error at: ${el}`);
      process.exit(1);
    }
  });
  return result;
};
const checkElement = async (e) => {
  result = await splitByPlus(e[0], 1);
  result2 = await splitByPlus(e[1], -1);
  result = result.concat(result2);
  return result;
};

module.exports = checkElement;
