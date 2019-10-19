module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': [ 'warn', 'never' ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    globals: {
        "uni": true,
        "plus": true
    }
}
