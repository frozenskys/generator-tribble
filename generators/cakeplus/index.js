'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  writing: function () {
    this.log('Enhancing Cake build & bootstrap files');
    this.fs.copy(this.templatePath('cake.cmd'), this.destinationPath('cake.cmd'));
    this.fs.copy(this.templatePath('build.cake'), this.destinationPath('build.cake'));
    this.fs.copy(this.templatePath('build.ps1'), this.destinationPath('build.ps1'));
  }
});
