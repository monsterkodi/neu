// monsterkodi/kode 0.249.0

var _k_

var Window

import post from './post.js'
import Title from './title.js'

Window = (function ()
{
    function Window ()
    {
        this["onMenuAction"] = this["onMenuAction"].bind(this)
        this["onClientConnect"] = this["onClientConnect"].bind(this)
        this["onAppClientConnect"] = this["onAppClientConnect"].bind(this)
        this["onWindowBlur"] = this["onWindowBlur"].bind(this)
        this["onWindowFocus"] = this["onWindowFocus"].bind(this)
        this["toggleMaximize"] = this["toggleMaximize"].bind(this)
        this["onDomLoaded"] = this["onDomLoaded"].bind(this)
        Neutralino.events.on('clientConnect',this.onClientConnect)
        Neutralino.events.on('appClientConnect',this.onAppClientConnect)
        Neutralino.events.on('windowFocus',this.onWindowFocus)
        Neutralino.events.on('windowBlur',this.onWindowBlur)
        post.on('menuAction',this.onMenuAction)
        window.titlebar = new Title({icon:'./icons/app.png'})
        document.addEventListener('DOMContentLoaded',this.onDomLoaded)
    }

    Window.prototype["onDomLoaded"] = function ()
    {
        var draggable, dragging, posX, posY

        dragging = false
        posX = 0
        posY = 0
        draggable = document.getElementById('titlebar')
        draggable.onmousedown = function (e)
        {
            posX = e.pageX
            posY = e.pageY
            dragging = true
            return null
        }
        window.onmouseup = function (e)
        {
            dragging = false
            return null
        }
        return document.onmousemove = function (e)
        {
            if (dragging)
            {
                Neutralino.window.move(e.screenX - posX,e.screenY - posY)
            }
            return null
        }
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

    Window.prototype["onAppClientConnect"] = function (event)
    {
        console.log('onAppClientConnect',event.detail)
    }

    Window.prototype["onClientConnect"] = function (event)
    {
        console.log('onClientConnect',event.detail)
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
                return Neutralino.window.hide()

        }

    }

    return Window
})()

export default Window;