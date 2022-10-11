<!--Tehnyt Kirsi Tolonen-->

<!-- Tarkistetaan tallennustila-->
function hideWarning() {
    document.getElementById('no_go').style.display = 'none';
}

function showWarning () {
    document.getElementById('no_go').style.display = 'block';
    document.getElementById('no_go').innerHTML = '<b>VAROITUS:</b> Sovellus ei toimi, jos paikallinen tallennustila on poissa käytöstä tai ei hyväksytty.';
    console.warn('Kommentointi ei toimi koska tallennustila on poissa käytöstä tai ei hyväksytty.');
}

<!-- Kommentit tallennetaan paikallisesti-->
function supportsLocalStorage () {
    return typeof localStorage !== 'undefined';
}

function haeKommentit() {
    return JSON.parse(localStorage.getItem('comments')) || [];
}


<!-- Kommentin tallentaminen-->
function tallennaKommentit (comments, commentStr, action) {
    if (!commentStr && comments.indexOf(commentStr) < 0) {
        action(err);
    }
    action(undefined, commentStr);
}

function appendToStream(stream, str, index) {
    var li = document.createElement('LI');
    li.setAttribute('data-index', index);
    li.innerHTML = str;
    stream.appendChild(li);
}


<!-- Kommentin lataaminen-->
function lataaKommentit(stream) {
    var comments = haeKommentit();
    if (comments) {
        for (var i = 0; i < comments.length; i++) {
            appendToStream(stream, comments[i], i);
        }
    }
}


<!-- Kommenttien poisto-->
function tyhjennaKommentit(stream) {
    localStorage.removeItem('comments');
    stream.innerHTML = '';
}


if (supportsLocalStorage()) {
    initApp();
} else {
    showWarning();
}


<!-- Kommentti kentän toiminnot ja elementit. Napeista siirtyminen funktioihin-->
function initApp() {
    hideWarning();

    var commentForm = document.getElementById('kommentointi'),
        commentList = document.getElementById('kommentit'),
        commentInput = document.getElementById('kirjoita-tahan')
        poista = document.getElementById('poista');

    lataaKommentit(commentList);

    poista.addEventListener('click', function() {
        tyhjennaKommentit(commentList);
    }, true);

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var commStr = commentInput.value,
            comments = haeKommentit();

        tallennaKommentit(comments, commStr, function(err, value) {
            if (err) {
                return;
            }
            comments.push(value);
            localStorage.setItem('comments', JSON.stringify(comments));
            appendToStream(commentList, commStr);
            commentInput.value = '';
        });
    }, true);

}












