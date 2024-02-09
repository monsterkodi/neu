// monsterkodi/kode 0.249.0

var _k_ = {in: function (a,l) {return (typeof l === 'string' && typeof a === 'string' && a.length ? '' : []).indexOf.call(l,a) >= 0}, empty: function (l) {return l==='' || l===null || l===undefined || l!==l || typeof(l) === 'object' && Object.keys(l).length === 0}, isNum: function (o) {return !isNaN(o) && !isNaN(parseFloat(o)) && (isFinite(o) || o === Infinity || o === -Infinity)}, isStr: function (o) {return typeof o === 'string' || o instanceof String}, clone: function (o,v) { v ??= new Map(); if (Array.isArray(o)) { if (!v.has(o)) {var r = []; v.set(o,r); for (var i=0; i < o.length; i++) {if (!v.has(o[i])) { v.set(o[i],_k_.clone(o[i],v)) }; r.push(v.get(o[i]))}}; return v.get(o) } else if (typeof o == 'string') { if (!v.has(o)) {v.set(o,''+o)}; return v.get(o) } else if (o != null && typeof o == 'object' && o.constructor.name == 'Object') { if (!v.has(o)) { var k, r = {}; v.set(o,r); for (k in o) { if (!v.has(o[k])) { v.set(o[k],_k_.clone(o[k],v)) }; r[k] = v.get(o[k]) }; }; return v.get(o) } else {return o} }, dbg: function (f,l,c,m,...a) { console.log(f + ':' + l + ':' + c + (m ? ' ' + m + '\n' : '\n') + a.map(function (a) { return _k_.noon(a) }).join(' '))}, list: function (l) {return l != null ? typeof l.length === 'number' ? l : [] : []}, noon: function (obj) { var pad = function (s, l) { while (s.length < l) { s += ' ' }; return s }; var esc = function (k, arry) { var es, sp; if (0 <= k.indexOf('\n')) { sp = k.split('\n'); es = sp.map(function (s) { return esc(s,arry) }); es.unshift('...'); es.push('...'); return es.join('\n') } if (k === '' || k === '...' || _k_.in(k[0],[' ','#','|']) || _k_.in(k[k.length - 1],[' ','#','|'])) { k = '|' + k + '|' } else if (arry && /  /.test(k)) { k = '|' + k + '|' }; return k }; var pretty = function (o, ind, seen) { var k, kl, l, v, mk = 4; if (Object.keys(o).length > 1) { for (k in o) { if (Object.hasOwn(o,k)) { kl = parseInt(Math.ceil((k.length + 2) / 4) * 4); mk = Math.max(mk,kl); if (mk > 32) { mk = 32; break } } } }; l = []; var keyValue = function (k, v) { var i, ks, s, vs; s = ind; k = esc(k,true); if (k.indexOf('  ') > 0 && k[0] !== '|') { k = `|${k}|` } else if (k[0] !== '|' && k[k.length - 1] === '|') { k = '|' + k } else if (k[0] === '|' && k[k.length - 1] !== '|') { k += '|' }; ks = pad(k,Math.max(mk,k.length + 2)); i = pad(ind + '    ',mk); s += ks; vs = toStr(v,i,false,seen); if (vs[0] === '\n') { while (s[s.length - 1] === ' ') { s = s.substr(0,s.length - 1) } }; s += vs; while (s[s.length - 1] === ' ') { s = s.substr(0,s.length - 1) }; return s }; for (k in o) { if (Object.hasOwn(o,k)) { l.push(keyValue(k,o[k])) } }; return l.join('\n') }; var toStr = function (o, ind = '', arry = false, seen = []) { var s, t, v; if (!(o != null)) { if (o === null) { return 'null' }; if (o === undefined) { return 'undefined' }; return '<?>' }; switch (t = typeof(o)) { case 'string': {return esc(o,arry)}; case 'object': { if (_k_.in(o,seen)) { return '<v>' }; seen.push(o); if ((o.constructor != null ? o.constructor.name : undefined) === 'Array') { s = ind !== '' && arry && '.' || ''; if (o.length && ind !== '') { s += '\n' }; s += (function () { var result = []; var list = _k_.list(o); for (var li = 0; li < list.length; li++)  { v = list[li];result.push(ind + toStr(v,ind + '    ',true,seen))  } return result }).bind(this)().join('\n') } else if ((o.constructor != null ? o.constructor.name : undefined) === 'RegExp') { return o.source } else { s = (arry && '.\n') || ((ind !== '') && '\n' || ''); s += pretty(o,ind,seen) }; return s } default: return String(o) }; return '<???>' }; return toStr(obj) }}

var $, stopEvent, Title

import dom from './dom.js'
import elem from './elem.js'
import slash from './slash.js'
import post from './post.js'
$ = dom.$
stopEvent = dom.stopEvent


Title = (function ()
{
    function Title (opt)
    {
        var imgSrc, pkg, _20_13_, _24_27_

        this.opt = opt
    
        this["openMenu"] = this["openMenu"].bind(this)
        this["toggleMenu"] = this["toggleMenu"].bind(this)
        this["hideMenu"] = this["hideMenu"].bind(this)
        this["showMenu"] = this["showMenu"].bind(this)
        this["menuVisible"] = this["menuVisible"].bind(this)
        this["onMenuAction"] = this["onMenuAction"].bind(this)
        this["onTitlebar"] = this["onTitlebar"].bind(this)
        this.opt = ((_20_13_=this.opt) != null ? _20_13_ : {})
        pkg = this.opt.pkg
        this.elem = $(((_24_27_=this.opt.elem) != null ? _24_27_ : "#titlebar"))
        if (!this.elem)
        {
            return
        }
        post.on('titlebar',this.onTitlebar)
        post.on('menuAction',this.onMenuAction)
        this.elem.addEventListener('dblclick',function (event)
        {
            stopEvent(event)
            return post.emit('menuAction','Maximize')
        })
        this.winicon = elem({class:'winicon'})
        if (this.opt.icon)
        {
            imgSrc = slash.join(this.opt.dir,this.opt.icon)
            this.winicon.appendChild(elem('img',{src:imgSrc}))
        }
        this.elem.appendChild(this.winicon)
        this.winicon.addEventListener('click',function ()
        {
            return post.emit('menuAction','Open Menu')
        })
        this.title = elem({class:'titlebar-title',id:'title'})
        this.elem.appendChild(this.title)
        this.setTitle(this.opt)
        this.minimize = elem({class:'winbutton minimize gray'})
        this.minimize.innerHTML = `<svg width="100%" height="100%" viewBox="-10 -8 30 30">
    <line x1="-1" y1="5" x2="11" y2="5"></line>
</svg>`
        this.elem.appendChild(this.minimize)
        this.minimize.addEventListener('click',function ()
        {
            return post.emit('menuAction','Minimize')
        })
        this.maximize = elem({class:'winbutton maximize gray'})
        this.maximize.innerHTML = `<svg width="100%" height="100%" viewBox="-10 -9 30 30">
  <rect width="11" height="11" style="fill-opacity: 0;"></rect>
</svg>`
        this.elem.appendChild(this.maximize)
        this.maximize.addEventListener('click',function ()
        {
            return post.emit('menuAction','Maximize')
        })
        this.close = elem({class:'winbutton close'})
        this.close.innerHTML = `<svg width="100%" height="100%" viewBox="-10 -9 30 30">
    <line x1="0" y1="0" x2="10" y2="11"></line>
    <line x1="10" y1="0" x2="0" y2="11"></line>
</svg>`
        this.elem.appendChild(this.close)
        this.close.addEventListener('click',function ()
        {
            return post.emit('menuAction','Close')
        })
        this.topframe = elem({class:'topframe'})
        this.elem.appendChild(this.topframe)
        if (this.opt.menu)
        {
            this.initMenu(this.menuTemplate())
        }
    }

    Title.prototype["pushElem"] = function (elem)
    {
        return this.elem.insertBefore(elem,this.minimize)
    }

    Title.prototype["showTitle"] = function ()
    {
        return this.title.style.display = 'initial'
    }

    Title.prototype["hideTitle"] = function ()
    {
        return this.title.style.display = 'none'
    }

    Title.prototype["setTitle"] = function (opt)
    {
        var html, parts, _108_26_

        html = ""
        parts = ((_108_26_=opt.title) != null ? _108_26_ : [])
        if (opt.pkg)
        {
            if (opt.pkg.name && _k_.in('name',parts))
            {
                html += `<span class='titlebar-name'>${opt.pkg.name}</span>`
            }
            if (opt.pkg.version && _k_.in('version',parts))
            {
                html += `<span class='titlebar-dot'>${opt.pkg.version}</span>`
            }
            if (opt.pkg.path && _k_.in('path',parts))
            {
                html += "<span class='titlebar-dot'> ► </span>"
                html += `<span class='titlebar-name'>${opt.pkg.path}</span>`
            }
        }
        return this.title.innerHTML = html
    }

    Title.prototype["onTitlebar"] = function (action)
    {
        switch (action)
        {
            case 'showTitle':
                return this.showTitle()

            case 'hideTitle':
                return this.hideTitle()

            case 'showMenu':
                return this.showMenu()

            case 'hideMenu':
                return this.hideMenu()

            case 'toggleMenu':
                return this.toggleMenu()

        }

    }

    Title.prototype["onMenuAction"] = function (action)
    {
        switch (action.toLowerCase())
        {
            case 'toggle menu':
                return this.toggleMenu()

            case 'open menu':
                return this.openMenu()

            case 'show menu':
                return this.showMenu()

            case 'hide menu':
                return this.hideMenu()

        }

    }

    Title.prototype["menuTemplate"] = function ()
    {
        var _154_28_

        if (!this.opt.dir || !this.opt.menu)
        {
            return []
        }
        if (_k_.empty(this.templateCache))
        {
            this.templateCache = this.makeTemplate(noon.load(slash.resolve(slash.join(this.opt.dir,this.opt.menu))))
        }
        if ((this.opt.menuTemplate != null) && typeof(this.opt.menuTemplate) === 'function')
        {
            return this.opt.menuTemplate(this.templateCache)
        }
        else
        {
            return this.templateCache
        }
    }

    Title.prototype["makeTemplate"] = function (obj)
    {
        var menuOrAccel, text, tmpl

        tmpl = []
        for (text in obj)
        {
            menuOrAccel = obj[text]
            tmpl.push(((function ()
            {
                var item, _175_33_, _175_57_

                if (_k_.empty(menuOrAccel) && text.startsWith('-'))
                {
                    return {text:''}
                }
                else if (_k_.isNum(menuOrAccel))
                {
                    return {text:text,accel:kstr(menuOrAccel)}
                }
                else if (_k_.isStr(menuOrAccel))
                {
                    return {text:text,accel:keyinfo.convertCmdCtrl(menuOrAccel)}
                }
                else if (_k_.empty(menuOrAccel))
                {
                    return {text:text,accel:''}
                }
                else if ((menuOrAccel.accel != null) || (menuOrAccel.command != null))
                {
                    item = _k_.clone(menuOrAccel)
                    item.text = text
                    return item
                }
                else
                {
                    return {text:text,menu:this.makeTemplate(menuOrAccel)}
                }
            }).bind(this))())
        }
        return tmpl
    }

    Title.prototype["initMenu"] = function (items)
    {
        this.menu = new menu({items:items})
        this.elem.insertBefore(this.menu.elem,this.elem.firstChild.nextSibling)
        return this.hideMenu()
    }

    Title.prototype["refreshMenu"] = function ()
    {
        this.menu.del()
        return this.initMenu(this.menuTemplate())
    }

    Title.prototype["menuVisible"] = function ()
    {
        return this.menu.elem.style.display !== 'none'
    }

    Title.prototype["showMenu"] = function ()
    {
        var _196_68_, _196_75_

        this.menu.elem.style.display = 'inline-block'
        return ((_196_68_=this.menu) != null ? typeof (_196_75_=_196_68_.focus) === "function" ? _196_75_() : undefined : undefined)
    }

    Title.prototype["hideMenu"] = function ()
    {
        var _197_25_

        ;(this.menu != null ? this.menu.close() : undefined)
        return this.menu.elem.style.display = 'none'
    }

    Title.prototype["toggleMenu"] = function ()
    {
        if (this.menuVisible())
        {
            return this.hideMenu()
        }
        else
        {
            return this.showMenu()
        }
    }

    Title.prototype["openMenu"] = function ()
    {
        if (this.menuVisible())
        {
            return this.hideMenu()
        }
        else
        {
            this.showMenu()
            return this.menu.open()
        }
    }

    Title.prototype["handleKey"] = function (event)
    {
        var accels, combo, combos, item, kepaths, key, keypath, mainMenu, mod

        mod = keyinfo.forEvent(event).mod
        key = keyinfo.forEvent(event).key
        combo = keyinfo.forEvent(event).combo

        _k_.dbg(".", 211, 8, null, `mod ${mod} key ${key} combo ${combo}`)
        mainMenu = this.menuTemplate()
        accels = sds.find.key(mainMenu,'accel')
        combos = sds.find.key(mainMenu,'combo')
        kepaths = combos.concat(accels)
        if (_k_.empty(combo))
        {
            return 'unhandled'
        }
        var list = _k_.list(kepaths)
        for (var _223_20_ = 0; _223_20_ < list.length; _223_20_++)
        {
            keypath = list[_223_20_]
            combos = sds.get(mainMenu,keypath).split(' ')
            combos = combos.map(function (c)
            {
                return keyinfo.convertCmdCtrl(c)
            })
            if (_k_.in(combo,combos))
            {
                keypath.pop()
                item = sds.get(mainMenu,keypath)
                return item
            }
        }
        return 'unhandled'
    }

    return Title
})()

export default Title;