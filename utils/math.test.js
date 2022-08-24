const { sum, subtract, multiply, divide } = require("./math");

describe("sum", () => {
  // Deve somar números positivos corretamente
  it("should sum positive numbers correctly", () => {
    const a = 1,
      b = 2; // Given | Dado que
    const result = sum(a, b); // When | Quando
    expect(result).toBe(3); // Then | Então
  });

  // Deve somar números negativos corretamente
  it("should sum negative numbers correctly", () => {
    expect(sum(-1, -2)).toBe(-3); // Given | When | Then
  });
});
