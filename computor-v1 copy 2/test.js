const swap = () => {
  let a = 1;
  let b = 2;
  [a, b] = [b, a];
  console.log(`a = ${a}
b = ${b}`);
  console.log("\x1b[36m%s\x1b[0m", "I am cyan");

  const str = "this is the string contains a = 0";
  const str2 = "this is a string does't contains a equale sign";

  let n = str.includes("=");
  let n2 = str2.includes("=");

  console.log(`
  str: ${n}
  str2: ${n2}
  `);
  const table = ["a", "b", "c"];
  console.table(table);
  let fl = parseFloat("12.5asfgs");
  console.log(fl);
};
swap();
