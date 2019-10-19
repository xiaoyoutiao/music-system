module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "rules": {
        // 不允许使用分号
        "semi": [ "warn", "never" ],
        // 强制使用 === 和 !==
        "eqeqeq": "error",
        // Promise.reject()必须返回 Error
        "prefer-promise-reject-errors": 'error',
        // 构造函数首字母大写
        "new-cap": 'warn',
        // 操作符两边需要空格
        "space-infix-ops": 'warn',
        // 使用链式调用至少保证两行
        "newline-per-chained-call": [ "warn", { "ignoreChainWithDepth": 2 } ],
        // 不允许连续的空行
        "no-multiple-empty-lines": [ "warn", { "max": 1, "maxEOF": 0 } ],
        // 不允许代码和内联注释在同一行
        "no-inline-comments": 'warn',
        // 禁止在条件表达式中使用布尔型字面量
        "no-unneeded-ternary": "error",
        // 当数组元素数量大于5时换行
        "array-element-newline": [ "error", { "multiline": true, "minItems": 5 } ],
        // 禁止使用拖尾逗号
        "comma-dangle": [ "error", "never" ],
        // 大括号使用Stroustrup风格, 允许在同一行存在开闭括号
        "brace-style": [ "warn", "1tbs", { "allowSingleLine": true } ],
        // 强制使用jsdoc
        "valid-jsdoc": "warn"
    }
}
