// monsterkodi/kode 0.249.0

var _k_

var path

path = require('../path')
module.exports["path"] = function ()
{
    section("normalize", function ()
    {
        compare(path.normalize('/'),'/')
        compare(path.normalize(''),'')
        compare(path.normalize('abc'),'abc')
        compare(path.normalize('a/b/c'),'a/b/c')
        compare(path.normalize('a/../c'),'c')
        compare(path.normalize('a/.././c'),'c')
        compare(path.normalize('/a/.././c'),'/c')
        compare(path.normalize('/a/../b/../c/..'),'/')
        compare(path.normalize('a/../b/../c/..'),'.')
        compare(path.normalize('a/b/c/d/../../../'),'a/')
        compare(path.normalize('a/b/c/d/../../..'),'a')
        compare(path.normalize('/a/b/c/d/../../..'),'/a')
        compare(path.normalize('/a/b/c/d/../../../'),'/a/')
        compare(path.normalize('\\'),'/')
        compare(path.normalize('a\\b\\c'),'a/b/c')
        compare(path.normalize('a\\..\\c'),'c')
        compare(path.normalize('a\\..\\.\\c'),'c')
        compare(path.normalize('\\a\\..\\.\\c'),'/c')
        compare(path.normalize('\\a\\..\\b\\..\\c\\..'),'/')
        compare(path.normalize('a\\..\\b\\..\\c\\..'),'.')
        compare(path.normalize('a\\b\\c\\d\\..\\..\\..\\'),'a/')
        compare(path.normalize('a\\b\\c\\d\\..\\..\\..'),'a')
        compare(path.normalize('\\a\\b\\c\\d\\..\\..\\..'),'/a')
        compare(path.normalize('\\a\\b\\c\\d\\..\\..\\..\\'),'/a/')
    })
}
module.exports["path"]._section_ = true
module.exports._test_ = true
module.exports
