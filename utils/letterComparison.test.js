const { isLetterComparisonValid } = require("./letterComparison");

cases = [
  [
    [
      ["A", ">", "B"],
      ["C", ">", "B"],
      ["Z", "<", "C"],
      ["Z", ">", "C"],
    ],
    false,
  ],
  [
    [
      ["A", ">", "B"],
      ["C", ">", "B"],
      ["Z", "<", "C"],
    ],
    true,
  ],
  [
    [
      ["A", ">", "B"],
      ["B", "<", "A"],
    ],
    true,
  ],
  [
    [
      ["A", ">", "B"],
      ["B", ">", "A"],
    ],
    false,
  ],
  [
    [
      ["A", ">", "S"],
      ["S", ">", "Z"],
      ["U", ">", "F"],
      ["F", "<", "D"],
    ],
    true,
  ],
  [
    [
      ["A", ">", "B"],
      ["B", ">", "C"],
      ["C", ">", "A"],
    ],
    false,
  ],
];

describe("letterComparison", () => {
  test.each(cases)(
    "isLetterComparisonValid(%s) should be %s",
    (comparisons, expected) => {
      expect(isLetterComparisonValid(comparisons)).toEqual(expected);
    }
  );
});
