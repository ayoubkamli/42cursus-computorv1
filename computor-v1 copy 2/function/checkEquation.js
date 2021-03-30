const checkEquation = async (e) => {
  try {
    if (e && e.includes("=")) {
      return await e.replace(/ /g, "").replace(/-/g, "+-").split("=");
    } else {
      console.log("Please Enter a valide format");
    }
  } catch (err) {
    throw err;
  }
};

module.exports = checkEquation;
