// Source: https://github.com/acdlite/json-sass/blob/57ef7f2eb095c0d3ff89e3c54d315a8070659b49/src/jsToSassString.js
// MIT (c) 2015 Andrew Clark
import isPlainObject from 'lodash/isPlainObject.js';

const {isArray} = Array;

function jsToSassString(value) {
  function _jsToSassString(value, initialIndentLevel = 0) {
    let indentLevel = initialIndentLevel;

    switch (typeof value) {
      case 'boolean':
      case 'number':
        return value.toString();
      case 'string':
        return value;
      case 'object':
        if (isPlainObject(value)) {
          indentLevel += 1;
          const indent = indentsToSpaces(indentLevel);
          const jsObj = value;
          const sassKeyValPairs = Object.keys(jsObj).reduce((result, key) => {
            const jsVal = jsObj[key];
            const sassVal = _jsToSassString(jsVal, indentLevel);

            if (isNotUndefined(sassVal)) {
              result.push(`${key}: ${sassVal}`);
            }

            return result;
          }, []);

          const result = `(\n${indent + sassKeyValPairs.join(',\n' + indent)}\n${indentsToSpaces(indentLevel - 1)})`;
          indentLevel -= 1;
          return result;
        } else if (isArray(value)) {
          const sassVals = [];

          for (const v of value) {
            if (isNotUndefined(v)) {
              sassVals.push(_jsToSassString(v, indentLevel));
            }
          }

          return `(${sassVals.join(', ')})`;
        } else if (isNull(value)) {
          return 'null';
        } else {
          return value.toString();
        }
      default:
        return;
    }
  }

  return _jsToSassString(value);
}

function indentsToSpaces(indentCount) {
  return Array(indentCount + 1).join('  ');
}

function isNull(value) {
  return value === null;
}

function isNotUndefined(value) {
  return typeof value !== 'undefined';
}

export default jsToSassString;
