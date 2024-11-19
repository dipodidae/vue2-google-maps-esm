import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: {
    vueVersion: 2,
    sfcBlocks: {
      blocks: {
        styles: false,
        template: false,
        customBlocks: false,
        script: false,
        scriptSetup: false,
      },
    },
  },
  rules: {
    'antfu/no-import-dist': 'off',
    'array-callback-return': 'off',
    'block-scoped-var': 'off',
    'eqeqeq': 'off',
    'import/no-mutable-exports': 'off',
    'no-new': 'off',
    'no-prototype-builtins': 'off',
    'no-redeclare': 'off',
    'no-restricted-globals': 'off',
    'no-self-assign': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-var': 'off',
    'node/prefer-global/process': 'off',
    'prefer-rest-params': 'off',
    'prefer-spread': 'off',
    'style/max-statements-per-line': 'off',
    'unused-imports/no-unused-vars': 'off',
    'vars-on-top': 'off',
    'vue/no-unused-refs': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
  },
})
