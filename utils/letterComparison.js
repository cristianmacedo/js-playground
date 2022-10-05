function isLetterComparisonValid(comparisons) {
  if (comparisons.length === 0) return true;

  let output = [];

  for (let i = 0; i < comparisons.length; i++) {
    const [left, op, right] = comparisons[i];

    const leftIndex = output.findIndex((v) => v === left);
    const rightIndex = output.findIndex((v) => v === right);

    if (leftIndex === -1 && rightIndex === -1) {
      console.log(`${left} ${op} ${right} = None exists`);
      if (op === ">") {
        output.push(right);
        output.push(left);
      } else {
        output.push(left);
        output.push(right);
      }
    } else if (leftIndex != -1 && rightIndex != -1) {
      console.log(`${left} ${op} ${right} = Both exist`);
      if (op === ">") {
        if (leftIndex > rightIndex) console.log("- Already inserted");
        else return false;
      } else {
        if (leftIndex < rightIndex) console.log("- Already inserted");
        else return false;
      }
    } else if (leftIndex != -1) {
      console.log(`${left} ${op} ${right} = Left exists`);
      if (op === ">") {
        output.splice(leftIndex, 0, right);
      } else {
        output.splice(leftIndex + 1, 0, right);
      }
    } else if (rightIndex != -1) {
      console.log(`${left} ${op} ${right} = Right exists`);
      if (op === ">") {
        output.splice(rightIndex + 1, 0, left);
      } else {
        output.splice(rightIndex, 0, left);
      }
    }
  }

  console.log(output.join(" -> "));

  return true;
}

module.exports = {
  isLetterComparisonValid,
};
