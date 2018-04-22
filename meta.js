const path = require("path");
const fs = require("fs");

const { sortDependencies, installDependencies, runLintFix, printMessage } = require("./utils");
const pkg = require("./package.json");

// const templateVersion = pkg.version;

// const { addTestAnswers } = require("./scenarios");

module.exports = {
  helpers: {
    if_or: function(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    },
    if_eq_or: function(a, b, c, opts) {
      if (a == b || a == c) {
        return opts.fn(this);
      }
      return opts.inverse(this);
    }
  },
  prompts: {
    name: {
      type: "string",
      required: true,
      message: "Project name"
    },
    description: {
      type: "string",
      required: false,
      message: "Project description",
      default: "A Vue.js project"
    },
    author: {
      type: "string",
      message: "Author"
    },
    build: {
      type: "list",
      message: "Vue build",
      choices: [
        {
          name: "Runtime + Compiler: recommended for most users",
          value: "standalone",
          short: "standalone"
        },
        {
          name:
            "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
          value: "runtime",
          short: "runtime"
        }
      ]
    },
    entry: {
      type: "list",
      message: "Single or Multi?",
      choices: [
        {
          name: "Single entry",
          value: "single",
          short: "single"
        },
        {
          name: "Multi entries",
          value: "multi",
          short: "multi"
        }
      ]
    },
    router: {
      type: "confirm",
      message: "Install vue-router?"
    },
    lint: {
      type: "confirm",
      message: "Use ESLint to lint your code?"
    },
    lintConfig: {
      when: "lint",
      type: "list",
      message: "Pick an ESLint preset",
      choices: [
        {
          name: "Standard (https://github.com/standard/standard)",
          value: "standard",
          short: "Standard"
        },
        {
          name: "none (configure it yourself)",
          value: "none",
          short: "none"
        }
      ]
    },
    vuex: {
      type: "confirm",
      message: "Install vuex?"
    },
    uilib: {
      type: "list",
      message:
        "Pick a library you want to integrate, so that the configuration of the library can be set automatic. ",
      choices: [
        {
          name: "vux (Recommend for Mobile)",
          value: "vux",
          short: "vux"
        },
        {
          name: "mint",
          value: "mint",
          short: "mint"
        },
        {
          name: "element (Recommend for PC)",
          value: "element",
          short: "element"
        },
        {
          name: "none (Not required, or integrate your self)",
          value: "none",
          short: "none"
        }
      ]
    },
    elementImport: {
      type: "list",
      when: "uilib == 'element'",
      message: "Do you want import Element entirely, or just import what you need?",
      choices: [
        {
          name: "Fully import",
          value: "fully",
          short: "fully"
        },
        {
          name: "On demand",
          value: "demand",
          short: "demand"
        }
      ]
    },
    topmobi: {
      type: "confirm",
      when: "uilib == 'vux' || uilib == 'mint'",
      message: "Install topmobi+ ?"
    },
    fastclick: {
      type: "confirm",
      when: "uilib == 'vux' || uilib == 'mint'",
      message: "Install fastclick?"
    },
    unit: {
      type: "confirm",
      message: "Set up unit tests"
    },
    runner: {
      when: "unit",
      type: "list",
      message: "Pick a test runner",
      choices: [
        {
          name: "Jest",
          value: "jest",
          short: "jest"
        },
        {
          name: "Karma and Mocha",
          value: "karma",
          short: "karma"
        },
        {
          name: "none (configure it yourself)",
          value: "noTest",
          short: "noTest"
        }
      ]
    },
    e2e: {
      type: "confirm",
      message: "Setup e2e tests with Nightwatch?"
    },
    autoInstall: {
      type: "list",
      message:
        "Should we run `npm install` for you after the project has been created? (recommended)",
      choices: [
        {
          name: "Yes, use NPM",
          value: "npm",
          short: "npm"
        },
        {
          name: "Yes, use Yarn",
          value: "yarn",
          short: "yarn"
        },
        {
          name: "No, I will handle that myself",
          value: false,
          short: "no"
        }
      ]
    }
  },
  filters: {
    ".eslintrc.js": "lint",
    ".eslintignore": "lint",
    "config/test.env.js": "unit || e2e",
    "build/webpack.test.conf.js": "e2e || (unit && runner === 'karma')",
    "test/unit/**/*": "unit",
    "test/unit/index.js": "unit && runner === 'karma'",
    "test/unit/jest.conf.js": "unit && runner === 'jest'",
    "test/unit/karma.conf.js": "unit && runner === 'karma'",
    "test/unit/specs/index.js": "unit && runner === 'karma'",
    "test/unit/setup.js": "unit && runner === 'jest'",
    "test/e2e/**/*": "e2e",
    "src/router/**/*": "router",
    "src/store/**/*": "vuex",
    "static/lib/**/*": "typeof(topmobi) != 'undefined' && topmobi",
    "src/entries/**/*": "entry === 'multi'",
    "src/main.js": "entry === 'single'",
    "src/App.vue": "entry === 'single'",
    "index.html": "entry === 'single'"
  },
  complete: function(data, { chalk }) {
    const green = chalk.green;

    sortDependencies(data, green);

    const cwd = path.join(process.cwd(), data.inPlace ? "" : data.destDirName);

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green);
        })
        .then(() => {
          printMessage(data, green);
        })
        .catch(e => {
          console.log(chalk.red("Error:"), e);
        });
    } else {
      printMessage(data, chalk);
    }
  }
  // completeMessage:
  //     "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n  #or\n  npm run dev --target=index\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};
