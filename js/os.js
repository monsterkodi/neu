// monsterkodi/kode 0.249.0

var _k_

var os


os = (function ()
{
    function os ()
    {}

    os["platform"] = 'Darwin'
    os["isMac"] = os.platform === 'Darwin'
    return os
})()

Neutralino.computer.getKernelInfo().then(function (kernelInfo)
{
    return os.platform = kernelInfo.variant
})
export default os;