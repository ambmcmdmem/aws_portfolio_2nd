const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .ts('resources/ts/users/search.ts', 'public/js/users')
    .ts('resources/ts/chats/chat.ts', 'public/js')
    .ts('resources/ts/chats/chatRoom.ts', 'public/js')
    .ts('resources/ts/common.ts', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');
