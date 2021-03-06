let renderView = (req, res) => {
    res.render('home');

}

let handleTool = async (req, res) => {

    const listArr = await handleGetAllId(req.body.list_id, req.body.key)
    const listCustomM3U8 = await handleFixFileM3U8(req.body.list_custom)
    const complete = handleMerge(listArr, listCustomM3U8)
    console.log(complete);
    res.render('viewCopy', { listArr });

}


let handleGetAllId = (string, key) => {
    var a = 0;
    var ar = string.split(' ');
    var newArr1 = []
    var newArr2 = []

    ar.forEach((element, index) => {
        newArr1[index] = element.slice(string.indexOf("=") + 1, string.lastIndexOf(""))
    });

    for (let index = newArr1.length - 1; index >= 0; index--) {
        newArr2[a] = `<br>https://www.googleapis.com/drive/v3/files/${newArr1[index]}?alt=media&key=${key}`
        a++;
    }

    return newArr2;
}

let handleFixFileM3U8 = (stringFix) => {
    return stringFix.split(".ts ")
}


let handleMerge = (listGoogle, listCustomM3U8) => {
    var arr = []
    listCustomM3U8.forEach((item, index) => {
        arr[index] = "<br>" + item.substring(0, item.indexOf(" ")) + `<br>${listGoogle[index]}`
    })
    return arr
}


module.exports = {
    handleTool,
    renderView,

}





































































































































































































































































































































































































































