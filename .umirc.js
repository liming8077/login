import { resolve } from "path";

// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: false,
      dynamicImport: false,
      title: 'umi',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  targets: {  //兼容浏览器版本
    ie: 10,
  },
  alias: {
    "@": resolve(__dirname, "./src"),
    "components": resolve(__dirname, "./src/components"),
    "static": resolve(__dirname, "./src/assets/static"),
    "utils": resolve(__dirname, "./src/utils"),
  },
  "theme": {
    "@border-color-base": '#E0E0E0',      // 边框色
    "@brand-primary": '#1D1D1D',
    "brand-primary": "#0085FE",
  },
  autoprefixer: {
    flexbox: true    // 兼容旧版本 iOS Safari 的 flexbox
  },
  hash: true,
  proxy: {
    "/api": {
      "target": "http://api-lms3.9first.com",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
  styleLoader: {
    injectType: 'lazyStyleTag'
  }
}
