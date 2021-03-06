/*jslint
    node
*/
/*global
    describe, it
*/
"use strict";

import * as mocha from "mocha"
import {should, assert, config, expect, AssertionError} from "chai";
//var assert = require('assert');
describe('mocha and chai assert test', function() {
  describe('Array #indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
