'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-tribble:app', function () {
  describe('when run with defaults', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .toPromise();
    });
    it('creates files', function() {
      assert.file([
        'build.cake'
      ]);
    });
    it('defaults to including the bootstrappers', function() {
      assert.file([
        'build.ps1',
        'build.sh'
      ]);
    });
    it('includes .gitignore and build.cmd files', function() {
      assert.file([
        '.gitignore',
        'build.cmd'
      ]);
    });
    it('does not include a config file', function() {
      assert.noFile([
        'cake.config'
      ]);
    });
    it('and it does not include a license file', function() {
      assert.noFile([
        'LICENSE'
      ]);
    });
  });
  describe('when deselecting cake', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({selectCake: false})
      .toPromise();
    });
    it('it does include a .gitignore file', function() {
      assert.file([
        '.gitignore'
      ]);
    });
    it('it does not create the cake files', function() {
      assert.noFile([
        'build.cake',
        'build.ps1',
        'build.sh',
        'cake.config',
        'build.cmd'
      ]);
    });
    it('and it does not include a license file', function() {
      assert.noFile([
        'LICENSE'
      ]);
    });
  });
  describe('when selecting license', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        selectLicense: true,
        license: 'mit',
        name: 'Rick',
        email: 'foo@example.com',
        website: 'http://example.com'
      })
      .toPromise();
    });
    it('it does include a .gitignore file', function() {
      assert.file([
        '.gitignore'
      ]);
    });
    it('it does include a license file', function() {
      assert.file([
        'LICENSE'
      ]);
    });
    it('it does not include a license file', function() {
      assert.noFile([
        'cake.config'
      ]);
    });
    it('and it does create the cake files', function() {
      assert.file([
        'build.cake',
        'build.ps1',
        'build.sh',
        'build.cmd'
      ]);
    });
  });
});
