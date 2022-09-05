const { minifyLetterSequence, minifyLetterSequenceGroup } = require("./minify");

const { performance } = require("perf_hooks");

describe("minifyLetterSequence", () => {
  it("should count letters even out of sequence, with grouping", () => {
    expect(minifyLetterSequence("AAABBAA")).toBe("5A2B");
    expect(minifyLetterSequence("ACCBBAA")).toBe("3A2C2B");
    expect(minifyLetterSequence("ZZKSKKWI")).toBe("2Z3K1S1W1I");
  });
});

describe("minifyLetterSequenceGroup", () => {
  it("should count letters in sequence, without grouping", () => {
    expect(minifyLetterSequenceGroup("AAABBAA")).toBe("3A2B2A");
    expect(minifyLetterSequenceGroup("ZZBBZZAA")).toBe("2Z2B2Z2A");
    expect(minifyLetterSequenceGroup("OOPPOOOPPPOP")).toBe("2O2P3O3P1O1P");
  });
});

describe("performance", () => {
  it("mls should be faster than mlsg", () => {
    const startMlsg = performance.now();
    minifyLetterSequenceGroup("AAABBAA");
    const endMlsg = performance.now();
    const timeMlsg = endMlsg - startMlsg;

    const startMls = performance.now();
    minifyLetterSequence("AAABBAA");
    const endMls = performance.now();
    const timeMls = endMls - startMls;

    expect(timeMls).toBeLessThan(timeMlsg);
  });
});
