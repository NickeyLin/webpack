module.exports = {
    helpers: {
        if_or: function(v1, v2, options) {
            if (v1 || v2) {
                return options.fn(this);
            }

            return options.inverse(this);
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
        vux: {
            type: "confirm",
            message: "Use vux as your default library?"
        },
        topmobi: {
            type: "confirm",
            message: "Install topmobi+ ?"
        },
        fastclick: {
            type: "confirm",
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
        "static/lib/**/*": "topmobi"
    },
    completeMessage:
        "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n  #or\n  npm run dev --target=index\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};
