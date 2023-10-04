const {
    override,
    useBabelRc
} = require("customize-cra");

module.exports = override(
    // use .babelrc
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc()
);