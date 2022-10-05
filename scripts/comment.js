function supportsLocalStorage () {
    return typeof localStorage !== 'undefined';
}

function haeKommentit() {
    return JSON.parse(localStorage.getItem('comments')) || [];
}

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

function loadComments(stream) {
    var comments = haeKommentit();
    if (comments) {
        for (var i = 0; i < comments.length; i++) {
            appendToStream(stream, comments[i], i);
        }
    }
}

supportsLocalStorage(); {
    initApp();}

function initApp() {

    var commentForm = document.getElementById('kommentointi'),
        commentList = document.getElementById('kommentit'),
        commentInput = document.getElementById('kirjoita-tahan')

    loadComments(commentList);

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