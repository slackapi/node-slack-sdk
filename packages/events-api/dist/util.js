"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = __importDefault(require("os"));
var pkg = require('../package.json'); // tslint:disable-line
// TODO: expose an API to extend this
// there will potentially be more named exports in this file
function packageIdentifier() {
    return pkg.name.replace('/', ':') + "/" + pkg.version + " " + os_1.default.platform() + "/" + os_1.default.release() + " " +
        ("node/" + process.version.replace('v', ''));
}
exports.packageIdentifier = packageIdentifier;
/**
 * Tests a "thing" for being falsy. See: https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 *
 * @param x - The "thing" whose falsy-ness to test.
 */
function isFalsy(x) {
    // NOTE: there's no way to type `x is NaN` currently (as of TypeScript v3.5)
    return x === 0 || x === '' || x === null || x === undefined || (typeof x === 'number' && isNaN(x));
}
exports.isFalsy = isFalsy;
//# sourceMappingURL=util.js.map