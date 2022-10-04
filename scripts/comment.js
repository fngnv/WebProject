const post= document.getElementById("comment-button");
post.addEventListener("click", function(){
    let commentBoxValue= document.getElementById("comment-box").value;

    let li = document.createElement("li");
    let text = document.createTextNode(commentBoxValue);
    li.appendChild(text);
    document.getElementById("unordered").appendChild(li);

});