var borschik    = require('enb-borschik/techs/borschik'),
    enbBemTechs = require('enb-bem-techs');

var levels = [
    { path: 'libs/bem-core/common.blocks', check: false },
    { path: 'libs/bem-core/desktop.blocks', check: false },
    'public/views/blocks-common',
    'public/views/blocks-desktop',
    'public/views/blocks-topic'
];

module.exports = function (config) {

    config.nodes('public/views/bundles/*', function (node) {

        node.mode('min', function (_node) {
            _node.addTechs([
                [ borschik, { sourceTarget: "?.css", target: "?.min.css", minify: true, freeze: false } ],
                [ borschik, { sourceTarget: "?.js", target: "?.min.js", minify: true, freeze: false } ]
            ]);
            _node.addTargets([ '?.min.css', '?.min.js' ]);
        });

        node.addTechs([

            [ enbBemTechs.levels, { levels: levels } ],
            [ require("enb/techs/file-provider"), { target: "_?.blade.php" } ],
            [ require("enb/techs/file-provider"), { target: "../../../assets/bootstrap/bootstrap.tmp.deps.js" } ],
            [ require("./techs/blade2html") ],
            [ require("./techs/html2bemjson") ],
            [ enbBemTechs.bemjsonToBemdecl ],
            [ enbBemTechs.deps, { target: '?.tmp.deps.js' } ],
            [ enbBemTechs.subtractDeps, {
                target: '?.deps.js',
                from: '?.tmp.deps.js',
                what: '../../../assets/bootstrap/bootstrap.tmp.deps.js',

            } ],
            [ enbBemTechs.files ],

            // css
            [ require('enb-stylus/techs/stylus'), {
                target: '?.css',
                useNib: true,
                autoprefixer: {
                    browsers: [ 'ie >= 9', 'last 5 versions', 'opera 12.1', '> 2%' ]
                }
            } ],

            // js
            [ require('enb-js/techs/browser-js'), { includeYM: false, target: '?.pre.js' } ],

            [ borschik, { sourceTarget: "?.pre.js", target: "?.js", minify: false} ],
            [ require('./techs/pre-cleaner')]
        ]);

        node.addTargets([ '?.html', '?.css', '?.js', 'pre-cleaner' ]);
    });

};
