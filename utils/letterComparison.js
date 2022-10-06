function isLetterComparisonValid(comparisons) {
  // Return true if there are no letters to compare ¯\_(ツ)_/¯
  if (comparisons.length === 0) return true;

  let output = [];

  // Iterate through each comparison triple
  for (let i = 0; i < comparisons.length; i++) {
    // left = Left letter, op = Operation, right = Right letter
    const [left, op, right] = comparisons[i];

    // Check if the left letter exists and return its index
    const leftIndex = output.findIndex((v) => v === left);
    // Check if the right letter exists and return its index
    const rightIndex = output.findIndex((v) => v === right);

    // If none of the letters exist, push both to the output array respecting the > or < operation
    if (leftIndex === -1 && rightIndex === -1) {
      console.log(`${left} ${op} ${right} = None exists`);
      if (op === ">") {
        output.push(right);
        output.push(left);
      } else {
        output.push(left);
        output.push(right);
      }
      // If both letters exist, check if the current output array is respected by the new comparison
    } else if (leftIndex != -1 && rightIndex != -1) {
      console.log(`${left} ${op} ${right} = Both exist`);
      // If it says left > right
      if (op === ">") {
        // If left is actually bigger (>) than right in the current output array, it is a duplicate, we do nothing
        if (leftIndex > rightIndex) console.log("- Already inserted");
        // If left is not bigger (>) than right in the current output array, then it is invalid
        else return false;
        // If it says left < right
      } else {
        // If left is actually smaller (<) than right in the current output array, it is a duplicate, we do nothing
        if (leftIndex < rightIndex) console.log("- Already inserted");
        // If left is not smaller (<) than right in the current output array, then it is invalid
        else return false;
      }
      // If left exists, but right doesn't
    } else if (leftIndex != -1) {
      console.log(`${left} ${op} ${right} = Left exists`);
      // If it says left > right
      if (op === ">") {
        // Insert right before left
        // [ ..., right*, left, ... ]
        output.splice(leftIndex, 0, right);
        // If it says left < right
      } else {
        // Insert right after left
        // [ ..., left, right*, ... ]
        output.splice(leftIndex + 1, 0, right);
      }
      // If right exists, but left doesn't
    } else if (rightIndex != -1) {
      console.log(`${left} ${op} ${right} = Right exists`);
      // If it says left > right
      if (op === ">") {
        // Insert left after right
        // [ ..., right, left*, ... ]
        output.splice(rightIndex + 1, 0, left);
        // If it says left < right
      } else {
        // Insert left before right
        // [ ..., left*, right, ... ]
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
