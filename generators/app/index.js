'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var nodeChildProcess = require('child_process');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the luminous ' + chalk.red('Tribble') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'selectGit',
      message: 'Would you like to use git?',
      default: true
    }, {
      type: 'confirm',
      name: 'selectCake',
      message: 'Would you like to use cake build?',
      default: true
    }, {
      type: 'confirm',
      name: 'selectLicense',
      message: 'Would you like to create a license file?',
      default: false
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.log('Generating folders');
    mkdirp.sync('./src');
    mkdirp.sync('./lib');
    if (this.props.selectCake) {
      this.composeWith('cake', {options: {
        installBootstrapper: true,
        installConfigFile: false,
        downloadFromRemote: false,
        fileName: 'build.cake'
      }
      }, {
        local: require.resolve('generator-cake')
      });
      this.composeWith('cakeplus', {
      }, {
        local: require.resolve('../cakeplus'),
        link: 'strong'
      });
    }
    if (this.props.selectLicense) {
      this.composeWith('license', {
      }, {
        local: require.resolve('generator-license')
      });
    }
    if (this.props.selectGit) {
      this.log('Generating git repository');
      this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
      this.composeWith('git-init', {
        options: {commit: 'Initial Commit of scaffolding'}
      }, {
        local: require.resolve('generator-git-init')
      });
    }
  },

  end: function () {
    if (this.props.selectGit) {
      this.log('Generating git tag');
      nodeChildProcess.exec('git tag 0.0.1');
    }
    this.log(yosay(
      'Tribbles generated Captain!'
    ));
  }
});
