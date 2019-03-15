/* eslint-disable */
'use strict';

var Finity = require('./Finity').default;
var merge = require('./utils/merge').default;

merge(exports, Finity);

// Allow the use of the default import syntax in TypeScript (import Finity from 'finity')
exports.default = Finity;
