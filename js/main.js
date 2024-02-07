// monsterkodi/kode 0.249.0

var _k_

var onTrayMenuItemClicked, onWindowClose, setTray, win

import Window from './window.js'

setTray = function ()
{
    if (NL_MODE === 'window')
    {
        return Neutralino.os.setTray({icon:'/js/icons/menu@2x.png',menuItems:[{id:'SHOW',text:'Show'},{id:'QUIT',text:'Quit'}]})
    }
}

onTrayMenuItemClicked = function (event)
{
    switch (event.detail.id)
    {
        case 'SHOW':
            Neutralino.window.setAlwaysOnTop(true)
            Neutralino.window.show()
            Neutralino.window.focus()
            return Neutralino.window.setAlwaysOnTop(false)

        case 'QUIT':
            return Neutralino.app.exit()

    }

}

onWindowClose = function ()
{
    return Neutralino.app.exit()
}
Neutralino.init()
Neutralino.events.on('trayMenuItemClicked',onTrayMenuItemClicked)
Neutralino.events.on('windowClose',onWindowClose)
setTray()
win = new Window