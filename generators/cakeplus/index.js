'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  writing: function () {
    this.log('Enhancing Cake build & bootstrap files');
    this.fs.copy(this.templatePath('build.cmd'), this.destinationPath('build.cmd'));
    this.fs.copy(this.templatePath('build.cake'), this.destinationPath('build.cake'));
  }
});
