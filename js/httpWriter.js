function Writer(src, rootDir){
    $.ajax({
        url: rootDir + src, //パスはcommon.jsが読み込まれたHTMLファイルが基準
        cache: false, //キャッシュを利用するか（お好みで）
        async: false, //非同期で読み込むか（お好みで）
        success: function(html){
            html = html.replace(/\{\$root\}/g, rootDir);
            document.write(html);
        },
        error: function(){
            document.write('読み込みに失敗しました。')
        }
    });
}

dir = getParam('app')
function WriterAppResourceByAppname(resource, rootDir){
    if(!dir) dir = 'NoQuery';
    appRoot = rootDir + 'Apps/' + dir + '/';
    $.ajax({
        url: rootDir + 'Apps/' + dir + '/' +  resource, //パスはcommon.jsが読み込まれたHTMLファイルが基準
        cache: false, //キャッシュを利用するか（お好みで）
        async: false, //非同期で読み込むか（お好みで）
        success: function(html){
            html = html.replace(/\{\$root\}/g, rootDir);
            html = html.replace(/\{\$approot\}/g, appRoot);
            document.write(html);
        },
        error: function(){
            document.write('読み込みに失敗しました。URLのappnameの値が間違っていませんか？')
        }
    });
}





function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}