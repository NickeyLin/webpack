// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
  },
  env: {
    browser: true,
  },
  {{#if_eq lintConfig "standard"}}
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential", 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard"
  ],    
  {{/if_eq}}
  {{#if_eq lintConfig "none"}}
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ["plugin:vue/essential"],
  {{/if_eq}}
  // required to lint *.vue files
  plugins: [
    "vue"
  ],
  // add your custom rules here
  "rules": {
    // 0:off, 1:warn, 2:error
    // requires semicolons at the end of statements
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
    }],
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
}
