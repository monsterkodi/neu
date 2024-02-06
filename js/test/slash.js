// monsterkodi/kode 0.249.0

var _k_

var slash

slash = require('../slash')
module.exports["slash"] = function ()
{
    section("path", function ()
    {
        compare(slash.path('/'),'/')
        compare(slash.path(''),'')
        compare(slash.path('abc'),'abc')
        compare(slash.path('a/b/c'),'a/b/c')
        compare(slash.path('a/../c'),'c')
        compare(slash.path('a/.././c'),'c')
        compare(slash.path('/a/.././c'),'/c')
        compare(slash.path('/a/../b/../c/..'),'/')
        compare(slash.path('a/../b/../c/..'),'.')
        compare(slash.path('a/b/c/d/../../../'),'a/')
        compare(slash.path('a/b/c/d/../../..'),'a')
        compare(slash.path('/a/b/c/d/../../..'),'/a')
        compare(slash.path('/a/b/c/d/../../../'),'/a/')
        compare(slash.path('\\'),'/')
        compare(slash.path('a\\b\\c'),'a/b/c')
        compare(slash.path('a\\..\\c'),'c')
        compare(slash.path('a\\..\\.\\c'),'c')
        compare(slash.path('\\a\\..\\.\\c'),'/c')
        compare(slash.path('\\a\\..\\b\\..\\c\\..'),'/')
        compare(slash.path('a\\..\\b\\..\\c\\..'),'.')
        compare(slash.path('a\\b\\c\\d\\..\\..\\..\\'),'a/')
        compare(slash.path('a\\b\\c\\d\\..\\..\\..'),'a')
        compare(slash.path('\\a\\b\\c\\d\\..\\..\\..'),'/a')
        compare(slash.path('\\a\\b\\c\\d\\..\\..\\..\\'),'/a/')
    })
    section("join", function ()
    {
        compare(slash.join('a','b'),'a/b')
        compare(slash.join('a/..','b'),'./b')
        compare(slash.join('a','../b'),'./b')
    })
}
module.exports["slash"]._section_ = true
module.exports._test_ = true
module.exports
