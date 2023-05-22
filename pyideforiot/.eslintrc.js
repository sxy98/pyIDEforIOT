module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    //  0 或’off’：不处理，关闭规则。
    //  1 或’warn’：处理，打开规则，并且作为一个警告（并不会导致检查不通过）。
    //  2 或’error’：处理，打开规则，并且作为一个错误（退出码为1，检查不通过）。
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": [0, "never"],
    // 禁止不必要的分号
    "no-extra-semi": 2,
    'semi': [0],
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': [0, { devDependencies: true }],
    'max-len': [0],
    'space-before-function-paren': 0,
    'quote-props': 0,
    'prefer-template': 0,
    'no-restricted-syntax': 0,
    'class-methods-use-this': 0,
    'prefer-rest-params': 0,
    'import/prefer-default-export': 0,
    'no-unused-expressions': 0,
    'no-plusplus': 0,
    'no-shadow': 0,
    'no-unused-vars': 0,
    'import/extensions': 0,
    'global-require': 0,
    'quotes': 0
  },
};
