// monsterkodi/kode 0.249.0

var _k_ = {list: function (l) {return l != null ? typeof l.length === 'number' ? l : [] : []}, empty: function (l) {return l==='' || l===null || l===undefined || l!==l || typeof(l) === 'object' && Object.keys(l).length === 0}}

var elem, Popup, stopEvent

import os from './os.js'
import dom from './dom.js'
import post from './post.js'
import slash from './slash.js'
import keyinfo from './keyinfo.js'
import popup from './popup.js'
elem = dom.elem
stopEvent = dom.stopEvent


Popup = (function ()
{
    function Popup (opt)
    {
        var br, child, div, item, text, _47_30_, _48_64_, _48_92_

        this["onKeyDown"] = this["onKeyDown"].bind(this)
        this["onFocusOut"] = this["onFocusOut"].bind(this)
        this["onContextMenu"] = this["onContextMenu"].bind(this)
        this["onClick"] = this["onClick"].bind(this)
        this["onHover"] = this["onHover"].bind(this)
        this["activate"] = this["activate"].bind(this)
        this["close"] = this["close"].bind(this)
        this.focusElem = document.activeElement
        this.items = elem({class:'popup',tabindex:0})
        this.parent = opt.parent
        this.onClose = opt.onClose
        if (opt.class)
        {
            this.items.classList.add(opt.class)
        }
        var list = _k_.list(opt.items)
        for (var _29_17_ = 0; _29_17_ < list.length; _29_17_++)
        {
            item = list[_29_17_]
            if (item.hide)
            {
                continue
            }
            if (_k_.empty((item.text)) && _k_.empty((item.html)) && _k_.empty((item.child)) && _k_.empty((item.children)) && _k_.empty((item.img)))
            {
                div = elem('hr',{class:'popupItem separator'})
            }
            else
            {
                div = elem({class:'popupItem',text:item.text})
                if (!_k_.empty(item.html))
                {
                    div.innerHTML = item.html
                }
                else
                {
                    if (item.img)
                    {
                        div.appendChild(elem('img',{class:'popupImage',src:slash.fileUrl(item.img)}))
                    }
                    if (item.child)
                    {
                        div.appendChild(item.child)
                    }
                    if (item.children)
                    {
                        var list1 = _k_.list(item.children)
                        for (var _43_34_ = 0; _43_34_ < list1.length; _43_34_++)
                        {
                            child = list1[_43_34_]
                            div.appendChild(child)
                        }
                    }
                }
                div.item = item
                div.addEventListener('click',this.onClick)
                if (((_47_30_=item.combo) != null ? _47_30_ : item.accel))
                {
                    text = keyinfo.short((os.isMac ? (((_48_64_=item.combo) != null ? _48_64_ : item.accel)) : (((_48_92_=item.accel) != null ? _48_92_ : item.combo))))
                    div.appendChild(elem('span',{class:'popupCombo',text:text}))
                }
                else if (item.menu)
                {
                    div.appendChild(elem('span',{class:'popupCombo',text:'▶'}))
                }
            }
            this.items.appendChild(div)
        }
        document.body.appendChild(this.items)
        this.items.addEventListener('contextmenu',this.onContextMenu)
        this.items.addEventListener('keydown',this.onKeyDown)
        this.items.addEventListener('focusout',this.onFocusOut)
        this.items.addEventListener('mouseover',this.onHover)
        br = this.items.getBoundingClientRect()
        if (opt.x + br.width > document.body.clientWidth)
        {
            this.items.style.left = `${document.body.clientWidth - br.width}px`
        }
        else
        {
            this.items.style.left = `${opt.x}px`
        }
        if (opt.y + br.height > document.body.clientHeight)
        {
            this.items.style.top = `${document.body.clientHeight - br.height}px`
        }
        else
        {
            this.items.style.top = `${opt.y}px`
        }
        if (opt.selectFirstItem !== false)
        {
            this.select(this.items.firstChild,{selectFirstItem:false})
        }
    }

    Popup.prototype["close"] = function (opt = {})
    {
        var _102_22_, _106_22_, _85_42_, _85_48_, _86_33_, _90_14_, _93_14_, _94_14_, _95_14_, _96_14_, _99_15_

        if (_k_.empty((this.parent)) || ((_85_42_=this.parentMenu()) != null ? (_85_48_=_85_42_.elem) != null ? _85_48_.classList.contains('menu') : undefined : undefined))
        {
            if ('skip' === (typeof this.onClose === "function" ? this.onClose() : undefined))
            {
                return
            }
        }
        ;(this.popup != null ? this.popup.close({focus:false}) : undefined)
        delete this.popup
        ;(this.items != null ? this.items.removeEventListener('keydown',this.onKeyDown) : undefined)
        ;(this.items != null ? this.items.removeEventListener('focusout',this.onFocusOut) : undefined)
        ;(this.items != null ? this.items.removeEventListener('mouseover',this.onHover) : undefined)
        ;(this.items != null ? this.items.remove() : undefined)
        delete this.items
        ;(this.parent != null ? this.parent.childClosed(this,opt) : undefined)
        if (opt.all)
        {
            if ((this.parent != null))
            {
                this.parent.close(opt)
            }
        }
        if (opt.focus !== false && !this.parent)
        {
            return (this.focusElem != null ? this.focusElem.focus() : undefined)
        }
    }

    Popup.prototype["childClosed"] = function (child, opt)
    {
        if (child === this.popup)
        {
            delete this.popup
            if (opt.focus !== false)
            {
                return this.focus()
            }
        }
    }

    Popup.prototype["select"] = function (item, opt = {})
    {
        var _125_17_, _128_17_, _132_20_

        if (!(item != null))
        {
            return
        }
        if ((this.popup != null))
        {
            this.popup.close({focus:false})
        }
        ;(this.selected != null ? this.selected.classList.remove('selected') : undefined)
        this.selected = item
        this.selected.classList.add('selected')
        if ((item.item != null ? item.item.menu : undefined) && opt.open !== false)
        {
            delete this.popup
            this.popupChild(item,opt)
        }
        return this.focus()
    }

    Popup.prototype["popupChild"] = function (item, opt = {})
    {
        var br, items

        if (items = item.item.menu)
        {
            if (this.popup)
            {
                return this.closePopup()
            }
            else
            {
                br = item.getBoundingClientRect()
                return this.popup = new Popup({items:items,parent:this,x:br.left + br.width,y:br.top,selectFirstItem:(opt != null ? opt.selectFirstItem : undefined)})
            }
        }
    }

    Popup.prototype["closePopup"] = function ()
    {
        var _155_14_

        ;(this.popup != null ? this.popup.close({focus:false}) : undefined)
        return delete this.popup
    }

    Popup.prototype["navigateLeft"] = function ()
    {
        var m

        if (this.popup)
        {
            return this.closePopup()
        }
        else if (m = this.parentMenu())
        {
            return m.navigateLeft()
        }
        else if (this.parent)
        {
            return this.close({focus:false})
        }
    }

    Popup.prototype["activateOrNavigateRight"] = function ()
    {
        var _175_20_

        if ((this.selected != null))
        {
            if (!this.selected.item.menu)
            {
                return this.activate(this.selected)
            }
            else
            {
                return this.navigateRight()
            }
        }
    }

    Popup.prototype["navigateRight"] = function ()
    {
        var _184_25_, _187_25_

        if (this.popup)
        {
            return this.popup.select(this.popup.items.firstChild)
        }
        else if ((this.selected != null ? this.selected.item.menu : undefined))
        {
            return this.select(this.selected,{selectFirstItem:true})
        }
        else
        {
            return (this.parentMenu() != null ? this.parentMenu().navigateRight() : undefined)
        }
    }

    Popup.prototype["parentMenu"] = function ()
    {
        var _190_18_

        if ((this.parent != null) && !this.parent.parent)
        {
            return this.parent
        }
    }

    Popup.prototype["nextItem"] = function ()
    {
        var next, _202_38_

        if (next = this.selected)
        {
            while (next = next.nextSibling)
            {
                if (!_k_.empty((next.item != null ? next.item.text : undefined)))
                {
                    return next
                }
            }
        }
    }

    Popup.prototype["prevItem"] = function ()
    {
        var prev, _208_38_

        if (prev = this.selected)
        {
            while (prev = prev.previousSibling)
            {
                if (!_k_.empty((prev.item != null ? prev.item.text : undefined)))
                {
                    return prev
                }
            }
        }
    }

    Popup.prototype["activate"] = function (item)
    {
        var _219_20_, _219_24_, _221_39_, _224_52_

        if (((item.item != null ? item.item.cb : undefined) != null))
        {
            this.close({all:true})
            return item.item.cb(((_221_39_=item.item.arg) != null ? _221_39_ : item.item.text))
        }
        else if (!item.item.menu)
        {
            this.close({all:true})
            return post.emit('menuAction',((_224_52_=item.item.action) != null ? _224_52_ : item.item.text))
        }
    }

    Popup.prototype["toggle"] = function (item)
    {
        if (this.popup)
        {
            this.popup.close({focus:false})
            return delete this.popup
        }
        else
        {
            return this.select(item,{selectFirstItem:false})
        }
    }

    Popup.prototype["onHover"] = function (event)
    {
        var item

        item = elem.upElem(event.target,{prop:'item'})
        if (item)
        {
            return this.select(item,{selectFirstItem:false})
        }
    }

    Popup.prototype["onClick"] = function (event)
    {
        var item

        stopEvent(event)
        item = elem.upElem(event.target,{prop:'item'})
        if (item)
        {
            if (item.item.menu)
            {
                return this.toggle(item)
            }
            else
            {
                return this.activate(item)
            }
        }
    }

    Popup.prototype["onContextMenu"] = function (event)
    {
        return stopEvent(event)
    }

    Popup.prototype["focus"] = function ()
    {
        var _265_20_

        return (this.items != null ? this.items.focus() : undefined)
    }

    Popup.prototype["onFocusOut"] = function (event)
    {
        var _269_34_

        if (!(event.relatedTarget != null ? event.relatedTarget.classList.contains('popup') : undefined))
        {
            return this.close({all:true,focus:false})
        }
    }

    Popup.prototype["onKeyDown"] = function (event)
    {
        var combo, key, mod

        mod = keyinfo.forEvent(event).mod
        key = keyinfo.forEvent(event).key
        combo = keyinfo.forEvent(event).combo

        switch (combo)
        {
            case 'end':
            case 'page down':
                return stopEvent(event,this.select(this.items.lastChild,{selectFirstItem:false}))

            case 'home':
            case 'page up':
                return stopEvent(event,this.select(this.items.firstChild,{selectFirstItem:false}))

            case 'esc':
                return stopEvent(event,this.close())

            case 'down':
                return stopEvent(event,this.select(this.nextItem(),{selectFirstItem:false}))

            case 'up':
                return stopEvent(event,this.select(this.prevItem(),{selectFirstItem:false}))

            case 'enter':
            case 'space':
                return stopEvent(event,this.activateOrNavigateRight())

            case 'left':
                return stopEvent(event,this.navigateLeft())

            case 'right':
                return stopEvent(event,this.navigateRight())

        }

    }

    return Popup
})()

export default {menu:function (opt)
{
    return new Popup(opt)
}};