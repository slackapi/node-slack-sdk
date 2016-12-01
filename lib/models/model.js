/**
 *
 */

var forEach = require('lodash').forEach;
var bind = require('lodash').bind;
var has = require('lodash').has;
var isArray = require('lodash').isArray;
var isEmpty = require('lodash').isEmpty;
var isObject = require('lodash').isObject;
var map = require('lodash').map;
var mapValues = require('lodash').mapValues;

var PROPERTY_TYPES = require('./property-type');
var helpers = require('./helpers');


function Model(name, opts) {
  /**
   *
   * @type {Object}
   * @protected
   */
  this._properties = {};

  /**
   * The name of the model.
   * @type {string}
   * @private
   */
  this._modelName = name;

  this._setProperties(isEmpty(opts) ? {} : opts);
}


/**
 * Updates the model.
 * @param {Object} opts
 * @return {Object} The model object that was just updated.
 */
Model.prototype.update = function update(opts) {
  this._setProperties(opts);
  return this;
};


/**
 * Assigns all properties from the supplied opts object to the model.
 *
 * Subclasses of the model class have the opportunity to intelligently set defaults or assign values
 * via individual assignment calls by extending this method on the subclass.
 *
 * @param {Object} opts
 * @private
 */
Model.prototype._setProperties = function setProperties(opts) {
  forEach(opts, bind(this._setModelProperty, this));
};


/**
 * Assigns an individual property from a Slack API response to a model object.
 *
 * Property assignment works by:
 *   1. If the property does not exist, set the property.
 *   2. If the property exists on the model, and is a scalar, overwrite the property with the
 *      property from the opts object
 *   3. If the property exists on the model and is a complex property:
 *      * if it's an object, extend the model property with values from the opts property
 *      * if it's an array, overwrite the array. This is because it's currently unclear if there are
 *        any array properties that will only be partially filled by some RTM / API responses, but
 *        completely filled by others.
 *
 * @param {String} key
 * @param {*} val
 *cchnnihbtckbllbflvffbvrgelvkufcruclebldbdtbb
 * @private
 */
Model.prototype._setModelProperty = function _setModelProperty(val, key) {
  if (isObject(val)) {
    this._setObjectProperty(key, val);
  } else if (isArray(val)) {
    this._setArrayProperty(key, val);
  } else {
    this._properties[key] = PROPERTY_TYPES.SIMPLE;
    this[key] = val;
  }
};


/**
 * Sets an object property from the API on a model object.
 *
 * NOTE: this assumes that none of the values of the object from the API represent additional model
 *       objects, i.e. that {relevantChannel: {channelObject}} will never occur in the API response.
 *
 * @param key
 * @param val
 *
 * @private
 */
Model.prototype._setObjectProperty = function _setObjectProperty(key, val) {
  var hasProperty = has(this, key);
  var ModelClass;

  if (helpers.isModelObj(val)) {
    if (hasProperty) {
      this[key].update(val);
    } else {
      ModelClass = helpers.getModelClass(val);
      this[key] = new ModelClass(val);
    }
    this._properties[key] = PROPERTY_TYPES.MODEL;
  } else {
    this._properties[key] = PROPERTY_TYPES.SIMPLE;
    this[key] = val;
  }
};


/**
 *
 * @param key
 * @param val
 *
 * @private
 */
Model.prototype._setArrayProperty = function _setArrayProperty(key, val) {
  var ModelClass;
  var firstItem;

  // NOTE: This assumes that it's not necessary to search and update model values in arrays and
  //       that instead they can be over-written
  if (!isEmpty(val)) {
    // Assumes that all values in the array are of the same type
    firstItem = val[0];
    if (helpers.isModelObj(firstItem)) {
      ModelClass = helpers.getModelClass(firstItem);
      this[key] = map(val, function makeChildModelObjs(item) {
        return new ModelClass(item);
      });
      this._properties[key] = PROPERTY_TYPES.MODEL_ARRAY;
    } else {
      this._properties[key] = PROPERTY_TYPES.SIMPLE;
      this[key] = val;
    }
  } else {
    this._properties[key] = PROPERTY_TYPES.SIMPLE;
    this[key] = val;
  }
};


Model.prototype.toJSON = function toJSON() {
  var objRepresentation = mapValues(this._properties, bind(function mapModelPropsToJSON(val, key) {
    var res;

    if (val === PROPERTY_TYPES.MODEL) {
      res = this[key].toJSON();
    } else if (val === PROPERTY_TYPES.MODEL_ARRAY) {
      res = map(this[key], function mapModelArrayPropertyToJSON(arrVal) {
        return arrVal.toJSON();
      });
    } else {
      res = this[key];
    }

    return res;
  }, this));

  return objRepresentation;
};


module.exports = Model;
