'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-tribble:cakeplus', function () {
  describe('when run with defaults', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/cakeplus'))
        .toPromise();
    });
    it('creates files', function() {
      assert.file([
        'cake.cmd'
      ]);
    });
    it('updates the build.cake file', function () {
      assert.fileContent('build.cake', 'GitVersion');
    });
    it('updates the build.ps1 file', function () {
      assert.fileContent('build.ps1', '# Patched by RCooper');
    });
  });
});
