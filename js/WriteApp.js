dir = getParam('appname')

$(function() {
    $.ajax({
        type: 'GET',
		url: `../html/${dir}/Application.html`,
		dataType: 'html',
		success: function(data) {
			$('#AppTitle').write($(data).filter("#AppTitle"));
            $('#AppOverView').html($(data).filter("#AppOverView"));
            $('#AppExample').html($(data).filter("#AppExample"));
            $('#AppDescription').html($(data).filter("#AppDescription"));
            $('#AppApp').html($(data).filter("#AppApp"));       
		},
		error:function() {
			$('#AppTitle').html('読み込みに失敗しました');
            $('#AppOverView').html('読み込みに失敗しました');
            $('#AppExample').html('読み込みに失敗しました');
            $('#AppDescription').html('読み込みに失敗しました');
            $('#AppApp').html('読み込みに失敗しました');      
 		}
    })
    // $('#AppTitle').load(`../html/${dir}/Title.html`);
    // $('#AppOverView').load(`../html/${dir}/OverView.html`);
    // $('#AppExample').load(`../html/${dir}/Example.html`);
    // $('#AppDescription').load(`../html/${dir}/Description.html`);
    // $('#AppApp').load(`../html/${dir}/Application.html`);
});

// document.getElementById('AppTitle').innerHTML = 'たいとる'

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}