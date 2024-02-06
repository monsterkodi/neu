// monsterkodi/kode 0.249.0

var _k_

var Window

import post from './post.js'

Window = (function ()
{
    function Window ()
    {
        this["onMenuAction"] = this["onMenuAction"].bind(this)
        this["toggleMaximize"] = this["toggleMaximize"].bind(this)
        post.on('menuAction',this.onMenuAction)
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