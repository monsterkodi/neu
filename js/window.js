// monsterkodi/kode 0.249.0

var _k_

var getMousePos, getWindowPos, mousePos, setWindowPos, Window, windowPos

import kpos from './pos.js'
import post from './post.js'
import Title from './title.js'
import Drag from './drag.js'
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
        window.titlebar = new Title({icon:'./icons/app.png'})
        document.addEventListener('DOMContentLoaded',this.onDomLoaded)
    }

    Window.prototype["onDomLoaded"] = function ()
    {
        var lastMousePos, mouseDelta

        lastMousePos = kpos(0,0)
        mouseDelta = kpos(0,0)
        return this.drag = new Drag({target:'title',onStart:function ()
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