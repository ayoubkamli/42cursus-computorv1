const sqrtOf = (n) => {
  let end = 1;

  if (n < 0) {
    return NaN;
  }

  if (n == 0 || n == 1) {
    return n;
  }
  while (end * end < n) {
    end++;
  }
  let i = 0;
  let start = end - 1;
  let mid = (start + end) / 2;
  // console.log(mid);

  while (mid * mid != n) {
    if (mid * mid > n) {
      end = mid;
    } else {
      start = mid;
    }
    if (mid == (start + end) / 2) {
      break;
    }
    mid = (start + end) / 2;
    // console.log(mid * mid);
    i++;
  }
  return mid;
};

module.exports = sqrtOf;
