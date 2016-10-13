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
    it('includes .gitignore and cake.cmd files', function() {
      assert.file([
        '.gitignore',
        'cake.cmd'
      ]);
    });
    it('updates the build.cake file', function () {
      assert.fileContent('build.cake', 'GitVersion');
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
        'cake.cmd'
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
        license: 'MIT',
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
    it('creates a LICENSE file', function () {
      assert.fileContent('LICENSE', 'MIT');
      assert.fileContent('LICENSE', 'Rick <foo@example.com> (http://example.com)');
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
        'cake.cmd'
      ]);
    });
  });
  describe('when deselecting git', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({selectGit: false})
      .toPromise();
    });
    it('it does not include a .gitignore file', function() {
      assert.noFile([
        '.gitignore'
      ]);
    });
    it('it does create the cake files', function() {
      assert.file([
        'build.cake',
        'build.ps1',
        'build.sh',
        'cake.cmd'
      ]);
    });
    it('and it does not include a license file', function() {
      assert.noFile([
        'LICENSE'
      ]);
    });
  });
});
