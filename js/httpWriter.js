function writeHeader(rootDir){
    $.ajax({
        url: rootDir + "html/header.html", //パスはcommon.jsが読み込まれたHTMLファイルが基準
        cache: false, //キャッシュを利用するか（お好みで）
        async: false, //非同期で読み込むか（お好みで）
        success: function(html){

            html = html.replace(/\{\$root\}/g, rootDir);
            document.write(html);
        }
    });
}

function writeCopyright(rootDir){
    $.ajax({
        url: rootDir + "html/copyright.html", //パスはcommon.jsが読み込まれたHTMLファイルが基準
        cache: false, //キャッシュを利用するか（お好みで）
        async: false, //非同期で読み込むか（お好みで）
        success: function(html){

            html = html.replace(/\{\$root\}/g, rootDir);
            document.write(html);
        }
    });
}