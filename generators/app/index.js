var Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.sourceRoot('generators/skaffold-templates');
    this.option('babel'); // This method adds support for a `--babel` flag

    this.option('skipInstall', {
      desc: `choose to skip installing dependencies`,
      type: Boolean,
      defaults: false
    })
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "confirm",
        name: "cool",
        message: "Would you like to include typescript?"
      },
            {
        type: "confirm",
        name: "cool2",
        message: "Would you like to include tailwind?"
      },
       {
        type: "input",
        name: "name",
        message: "What's the name of this?"
      },

    ])
  }

  writing() {
    Object.entries(this.answers).forEach((k,v) => this.log(k, v));
    this.fs.copyTpl(
      this.templatePath('package/base.json'),
      this.destinationPath('../package.json'),
      {name: this.answers.name || path.basename(process.cwd())}
    )
  }

  	install() {
		this.installDependencies({
			npm: true,
			bower: false,
			yarn: false,
			skipInstall: this.options.skipInstall,
		});
	}


};


    // initializing - Your initialization methods (checking current project state, getting configs, etc)
    // prompting - Where you prompt users for options (where you’d call this.prompt())
    // configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
    // default - If the method name doesn’t match a priority, it will be pushed to this group.
    // writing - Where you write the generator specific files (routes, controllers, etc)
    // conflicts - Where conflicts are handled (used internally)
    // install - Where installations are run (npm, bower)
    // end - Called last, cleanup, say good bye, etc