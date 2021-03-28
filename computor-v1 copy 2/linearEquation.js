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

module.exports = linearEquation;
