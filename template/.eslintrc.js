// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module"
    },
    env: {
        browser: true,
    },
    {{#if_eq lintConfig "standard"}}
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: "standard",
    {{/if_eq}}    
    // required to lint *.vue files
    plugins: [
        "html"
    ],
    // add your custom rules here
    "rules": {
        // 0:off, 1:warn, 2:error
        // use 4 spaces for indentation
        "indent": ["error", 4, { SwitchCase: 1 }],
        // requires semicolons at the end of statements
        "semi": ["error", "always"],
        // use double quotes
        "quotes" : ["error", "double", { "avoidEscape": true }],
        "space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],        
        // allow paren-less arrow functions
        "arrow-parens": 0,
        // allow async-await
        "generator-star-spacing": 0,
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
    }
}
