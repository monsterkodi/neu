// monsterkodi/kode 0.249.0

var _k_

var onTrayMenuItemClicked, onWindowClose, setTray, window

import Title from './title.js'
import Window from './window.js'

setTray = function ()
{
    var tray

    if (NL_MODE !== "window")
    {
        console.log("INFO: Tray menu is only available in the window mode.")
        return
    }
    tray = {icon:"/js/icons/menu.png",menuItems:[{id:"QUIT",text:"Quit"}]}
    Neutralino.os.setTray(tray)
    return null
}

onTrayMenuItemClicked = function (event)
{
    switch (event.detail.id)
    {
        case "QUIT":
            Neutralino.app.exit()
            break
    }

    return null
}

onWindowClose = function ()
{
    Neutralino.app.exit()
    return null
}
Neutralino.init()
Neutralino.events.on("trayMenuItemClicked",onTrayMenuItemClicked)
Neutralino.events.on("windowClose",onWindowClose)
setTray()
window = new Window
window.titlebar = new Title({icon:'./icons/app.png'})
document.addEventListener('DOMContentLoaded',(function ()
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
}).bind(this))