'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the luminous ' + chalk.red('Tribble') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'cake',
      message: 'Would you like to use cake build?',
      default: true
    }, {
      type: 'confirm',
      name: 'license',
      message: 'Would you like to create a license file?',
      default: false
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  default: function () {
    if (this.props.license) {
      this.composeWith('license', {
      }, {
        local: require.resolve('generator-license')
      });
    }
    if (this.props.cake) {
      this.composeWith('cake', {options: {
        installBootstrapper: true,
        installConfigFile: false,
        downloadFromRemote: false
      }
      }, {
        local: require.resolve('generator-cake')
      });
    }
  },

  writing: function () {
    mkdirp.sync('./src');
    mkdirp.sync('./lib');
    this.composeWith('git-init', {
      options: {commit: 'Initial Commit of scaffolding'}
    }, {
      local: require.resolve('generator-git-init')
    });
  }

});
