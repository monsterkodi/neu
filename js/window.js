// monsterkodi/kode 0.249.0

var _k_

var $, getMousePos, getWindowPos, mousePos, setWindowPos, stopEvent, Window, windowPos

import dom from './dom.js'
import elem from './elem.js'
import kpos from './pos.js'
import post from './post.js'
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
        this["onMenuAction"] = this["onMenuAction"].bind(this)
        this["onWindowBlur"] = this["onWindowBlur"].bind(this)
        this["onWindowFocus"] = this["onWindowFocus"].bind(this)
        this["toggleMaximize"] = this["toggleMaximize"].bind(this)
        this["onDomLoaded"] = this["onDomLoaded"].bind(this)
        post.on('menuAction',this.onMenuAction)
        window.titlebar = new Title({icon:'./icons/app.png',menu:'/menu.noon'})
        document.addEventListener('DOMContentLoaded',this.onDomLoaded)
    }

    Window.prototype["onDomLoaded"] = function ()
    {
        var lastMousePos, main, mouseDelta

        lastMousePos = kpos(0,0)
        mouseDelta = kpos(0,0)
        this.drag = new Drag({target:'title',onStart:function ()
        {
            return getMousePos(function (mp)
            {
                return lastMousePos.copy(mp)
            })
        },onMove:function ()
        {
            return getMousePos(function (mp)
            {
                return getWindowPos((function (pos)
                {
                    mouseDelta.copy(mp).sub(lastMousePos)
                    lastMousePos.copy(mp)
                    mouseDelta.add(pos)
                    return setWindowPos(mouseDelta)
                }).bind(this))
            })
        }})
        main = $('main')
        elem({class:'test',text:'window',parent:main,click:function ()
        {
            return Neutralino.window.create('/index.html')
        }})
        return window.addEventListener('keydown',function ()
        {
            console.log('window keydown',event)
            return stopEvent(event)
        })
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

    Window.prototype["onWindowFocus"] = function (event)
    {
        console.log('onFocus',event.detail)
    }

    Window.prototype["onWindowBlur"] = function (event)
    {
        console.log('onBlur',event.detail)
    }

    Window.prototype["onMenuAction"] = function (action)
    {
        switch (action.toLowerCase())
        {
            case 'maximize':
                return this.toggleMaximize()

            case 'minimize':
                return Neutralino.window.minimize()

            case 'close':
                return Neutralino.app.exit()

        }

    }

    return Window
})()

export default Window;