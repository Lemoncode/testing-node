module.exports.add = (a, b) => a + b;
module.exports.substract = (a, b) => a - b;
module.exports.multiply = (a, b) => a * b;
module.exports.divide = (a, b) => a / b;
module.exports.modulus = (a, b) => a % b;

module.exports.calculate = (nums) => (...args) => (
    args.reduce((acum, current, index) =>
        (acum instanceof Function) ?
            current(acum(nums[index - 1], nums[index]), nums[index + 1]) :
            current(acum, nums[index + 1])
    )
);
