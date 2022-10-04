var post= document.getElementById("comment-button");
post.addEventListener("click", function(){
    var commentBoxValue= document.getElementById("comment-box").value;

    var li = document.createElement("li");
    var text = document.createTextNode(commentBoxValue);
    li.appendChild(text);
    document.getElementById("unordered").appendChild(li);

});