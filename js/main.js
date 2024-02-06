// monsterkodi/kode 0.249.0

var _k_

var onTrayMenuItemClicked, onWindowClose, setTray, win

import Title from './title.js'
import Window from './window.js'

setTray = function ()
{
    if (NL_MODE === 'window')
    {
        return Neutralino.os.setTray({icon:'/js/icons/menu.png',menuItems:[{id:'QUIT',text:'Quit'}]})
    }
}

onTrayMenuItemClicked = function (event)
{
    if (event.detail.id === 'QUIT')
    {
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