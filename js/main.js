// monsterkodi/kode 0.249.0

var _k_ = {list: function (l) {return l != null ? typeof l.length === 'number' ? l : [] : []}}

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
Neutralino.computer.getDisplays().then(function (displays)
{
    var d

    window.displays = displays
    var list = _k_.list(displays)
    for (var _33_10_ = 0; _33_10_ < list.length; _33_10_++)
    {
        d = list[_33_10_]
        console.log(d.resolution)
    }
})
win = new Window