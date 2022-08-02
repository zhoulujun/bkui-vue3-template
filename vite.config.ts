import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import path from 'path'
// import { useDynamicPublicPath } from 'vite-plugin-dynamic-publicpath'
import config from './env'
// https://vitejs.dev/config/
console.log(process.env.PORT)
export default ({ mode = 'develop' }) => {
  const env = config[mode]
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      createStyleImportPlugin({
        libs: [
          {
            libraryName: 'bkui-vue',
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name: string) => {
              return `bkui-vue/lib/${name}/${name}.css`;
            },
            // resolveComponent: (name: string) => {
            //     return `bkui-vue/lib/${name}/${name}`;
            // },
          },
        ],
      }),
      // useDynamicPublicPath({
      //   dynamicImportHandler: 'window.PROJECT_CONFIG.BK_STATIC_URL',
      //   dynamicImportPreload: 'window.PROJECT_CONFIG.BK_STATIC_URL'
      // }),
    ],
    /**
     * Base public path when served in production.
     * @default '/'
     * 根路径 默认是'/'
     */
    base: env.publicPath,
    server: {
      host: env.HOST,
      port: Number(env.PORT || 9000),
      proxy: {
        '/api/': {
          target: env.AJAX_URL_PROXY,
          ws: false,
          changeOrigin: true,
        },
        '/user/': {
          target: env.AJAX_URL_PROXY,
          ws: false,
          changeOrigin: true,
        }
      },
    },
    css: {
      /* CSS 预处理器 */
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/style/variables.scss";'
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components/'),
        '@pages': resolve(__dirname, './src/pages/'),
        '@static': resolve(__dirname, './static'),
        '@charts': resolve(__dirname, './src/plugins/charts'),
        '@datasource': resolve(__dirname, './src/plugins/datasource'),
        '@dashboard': resolve(__dirname, './src/plugins/dashboard'),
        '@modules': resolve(__dirname, './src/store/modules'),
      }
    },
    // build: {
    //   assetsDir: 'assets', // 指定生成静态资源的存放路径
    //   rollupOptions:{
    //     input: {
    //       index: path.resolve(__dirname, 'config/index.html'),
    //     },
    //     output: {
    //       chunkFileNames: 'static/js/[name]-[hash].js',
    //       entryFileNames: 'static/js/[name]-[hash].js',
    //       assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
    //     }
    //   }
    // }
  })
}

