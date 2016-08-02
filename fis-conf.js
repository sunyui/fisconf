var root = fis.project.getProjectPath();
var util = fis.util;
var jinjia = {
    loader: 'requirejs',// null,requirejs,modjs,seajs
    loadSync: true,
    macro: '/macro.vm',
    commonMock: '/commonMock.mock',
    root: [root, root + '/page']
};

fis.set('project.ignore', ['node_modules/**', 'output/**', 'fis-conf.js','static/qishi/less/lib/**']);

fis.match('/templates/({*,**/*}.html)', {
    release: '/templates/$1'
});

fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: 'css'
});

fis.match('(*.js)', {
    release: '/static/js/$1',
    useHash: true
})

fis.match('(*.{css,less})', {
    release: '/static/css/$1',
    useHash: true
})

fis.match('*.html', {
    useMap: true
})

fis.match('widget/**', {
  isMod: true
});

fis.hook('commonjs');

/*fis.hook('commonjs', {
    paths: {
        jquery: 'lib/jquery'
    }
});

fis.match('widget/**', {
  isMod: true
});

fis.match('::package', {
  postpackager: fis.plugin('loader', {
    allInOne: true,
    sourceMap: true,
    useInlineMap: true
  })
});*/

fis.media('prod')
   .match('*.js', {optimizer: fis.plugin('uglify-js')})
   .match('*.css', {optimizer: fis.plugin('clean-css')})

fis.media('dev')
   .match('*.js', {optimizer: null})
   .match('*.css', {optimizer: null})

fis.media('with_parser').match('/templates/{*,**/*}.html', {
    parser: function(content, file) {
        return require('../fis3-parser-jinjia/')(content, file, jinjia);
    }
})