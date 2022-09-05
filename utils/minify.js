function minifyLetterSequence(ls) {
  const letterCountMap = ls.split("").reduce((prev, curr) => {
    if (!prev.hasOwnProperty(curr)) prev[curr] = 0;
    prev[curr] += 1;
    return prev;
  }, {});

  return Object.entries(letterCountMap)
    .map((lc) => `${lc[1]}${lc[0]}`)
    .join("");
}

function minifyLetterSequenceGroup(ls) {
  let currentLetter = ls[0];
  let currentCount = 0;
  let letterCounts = [];

  for (let i = 0; i < ls.length; i++) {
    const newLetter = ls[i];

    if (currentLetter !== newLetter) {
      letterCounts.push(`${currentCount}${currentLetter}`);
      currentLetter = newLetter;
      currentCount = 0;
    }

    currentCount += 1;
  }

  letterCounts.push(`${currentCount}${currentLetter}`);

  return letterCounts.join("");
}

module.exports = {
  minifyLetterSequence,
  minifyLetterSequenceGroup,
};
