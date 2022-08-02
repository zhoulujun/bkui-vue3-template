const config:Record<string, any> = {
    production: {
        NODE_ENV: JSON.stringify('production'),
        publicPath:'/static/dist/',// 静态资源路径前缀
        // publicPath:'{{ BK_STATIC_URL }}',// 静态资源路径前缀
        outputDir: __dirname + '/dist',// 打包输出目录
        assetsDir: '', // js/css/font资源归属目录
        AJAX_URL_PREFIX: '',
    },
    open: {
        NODE_ENV: JSON.stringify('production'),
        publicPath:'./',
        outputDir: __dirname + '/dist',
        assetsDir: '',
        AJAX_URL_PREFIX: '',
    },
    sdkDev: {
        NODE_ENV: JSON.stringify('development'),
        publicPath:'/',
        outputDir: __dirname + '/dist',
        assetsDir: './',
        AJAX_URL_PREFIX: '',
    },
    sdkPro: {
        NODE_ENV: JSON.stringify('production'),
        publicPath:'',
        outputDir: __dirname + '/dist',
        assetsDir: '',
        AJAX_URL_PREFIX: '',
    },
    development: {
        NODE_ENV: JSON.stringify('development'),
        publicPath:'/',
        outputDir: __dirname + '/dist',
        assetsDir: './',
        AJAX_URL_PREFIX: '',
        AJAX_URL_PROXY: 'http://stag-dot-bkvision.bkapps-sz.oa.com/',
        HOST: 'dev.bkapps.oa.com',
        PORT: 9003
    },
};
export default config
