// monsterkodi/kode 0.249.0

var _k_

var $, getMousePos, getWindowPos, mousePos, setWindowPos, stopEvent, Window, windowPos

import dom from './dom.js'
import elem from './elem.js'
import kpos from './pos.js'
import post from './post.js'
import keyinfo from './keyinfo.js'
import Title from './title.js'
import Drag from './drag.js'
$ = dom.$
stopEvent = dom.stopEvent

mousePos = kpos(0,0)
windowPos = kpos(0,0)

getMousePos = function (cb)
{
    return Neutralino.computer.getMousePosition().catch(function (e)
    {
        console.error(e)
    }).then(function (p)
    {
        mousePos.copy(p)
        return (typeof cb === "function" ? cb(mousePos) : undefined)
    })
}

getWindowPos = function (cb)
{
    return Neutralino.window.getPosition().catch(function (e)
    {
        console.error(e)
    }).then(function (p)
    {
        windowPos.copy(p)
        return (typeof cb === "function" ? cb(windowPos) : undefined)
    })
}

setWindowPos = function (p, cb)
{
    return Neutralino.window.move(p.x,p.y).catch(function (e)
    {
        console.error(e)
    }).then(cb)
}

Window = (function ()
{
    function Window ()
    {
        this["onKeyUp"] = this["onKeyUp"].bind(this)
        this["onKeyDown"] = this["onKeyDown"].bind(this)
        this["onMenuAction"] = this["onMenuAction"].bind(this)
        this["onWindowBlur"] = this["onWindowBlur"].bind(this)
        this["onWindowFocus"] = this["onWindowFocus"].bind(this)
        this["toggleMaximize"] = this["toggleMaximize"].bind(this)
        this["animate"] = this["animate"].bind(this)
        this["onDomLoaded"] = this["onDomLoaded"].bind(this)
        post.on('menuAction',this.onMenuAction)
        window.titlebar = new Title({icon:'./icons/app.png',menu:'/menu.noon'})
        document.addEventListener('DOMContentLoaded',this.onDomLoaded)
        Neutralino.events.on('windowFocus',this.onWindowFocus)
        Neutralino.events.on('windowBlur',this.onWindowBlur)
    }

    Window.prototype["onDomLoaded"] = function ()
    {
        var main

        main = $('main')
        elem({class:'test',text:'window',parent:main,click:(function ()
        {
            Neutralino.debug.log('click!')
            return this.createWindow()
        }).bind(this)})
        window.addEventListener('keydown',this.onKeyDown)
        window.addEventListener('keyup',this.onKeyUp)
        Neutralino.window.focus()
        window.requestAnimationFrame(this.animate)
        return main.focus()
    }

    Window.prototype["animate"] = function ()
    {
        var delta, now

        window.requestAnimationFrame(this.animate)
        getMousePos(function (mp)
        {
            return post.emit('pointerMove',mp.x,mp.y)
        })
        now = window.performance.now()
        delta = (now - this.lastAnimationTime) * 0.001
        this.lastAnimationTime = now
        return post.emit('animationFrame',delta)
    }

    Window.prototype["toggleMaximize"] = function ()
    {
        return Neutralino.window.isMaximized().then(function (isMaximized)
        {
            if (isMaximized)
            {
                return Neutralino.window.unmaximize()
            }
            else
            {
                return Neutralino.window.maximize()
            }
        })
    }

    Window.prototype["createWindow"] = function ()
    {
        return Neutralino.window.getSize().catch(function (e)
        {
            console.error(e)
        }).then(function (size)
        {
            return Neutralino.window.create('/index.html',size).catch(function (e)
            {
                console.error(e)
            })
        })
    }

    Window.prototype["onWindowFocus"] = function (event)
    {
        return Neutralino.debug.log('onFocus',event.detail)
    }

    Window.prototype["onWindowBlur"] = function (event)
    {
        return Neutralino.debug.log('onBlur',event.detail)
    }

    Window.prototype["onMenuAction"] = function (action)
    {
        console.log('menuAction',action)
        switch (action.toLowerCase())
        {
            case 'new window':
                return this.createWindow()

            case 'maximize':
                return this.toggleMaximize()

            case 'minimize':
                return Neutralino.window.minimize()

            case 'close':
            case 'quit':
                return Neutralino.app.exit()

        }

    }

    Window.prototype["onKeyDown"] = function (event)
    {
        var info

        stopEvent(event)
        info = keyinfo.forEvent(event)
        info.event = event
        if (info.combo)
        {
            Neutralino.debug.log(`${info.combo}`)
        }
        if ('unhandled' === window.titlebar.handleKeyInfo(info))
        {
            console.log('keydown',info)
        }
    }

    Window.prototype["onKeyUp"] = function (event)
    {
        var info

        info = keyinfo.forEvent(event)
        return info.event = event
    }

    return Window
})()

export default Window;