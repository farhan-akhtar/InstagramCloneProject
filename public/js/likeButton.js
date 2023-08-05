$(()=>{

    let postItem = $('.postItem');

    postItem.on("click",(ev)=>{
        let attribute = ev.target.getAttribute('class');
        let id = ev.target.getAttribute('id');
        let urlLike = `/api/like/${id}`;
        let urlUnLike = `/api/unlike/${id}`;
        if(attribute == "likeButton")
        {
            $.post(urlLike)
            .done((data)=>{
                let postLikes = `${data.liked.length} Likes ${data.comments.length} Comments`;
                ev.target.setAttribute('class','unlikeButton');
                ev.target.src = "/../imgs/insta-like.png";
                let siblingDiv = ev.target.nextElementSibling.nextElementSibling.nextElementSibling;
                $(siblingDiv).text(postLikes);
            });
        }
        else if(attribute == "unlikeButton")
        {
            $.post(urlUnLike)
            .done((data)=>{
                let postLikes = `${data.liked.length} Likes ${data.comments.length} Comments`;
                ev.target.setAttribute('class','likeButton');
                ev.target.src = "/../imgs/insta-unlike.png";
                let siblingDiv = ev.target.nextElementSibling.nextElementSibling.nextElementSibling;
                $(siblingDiv).text(postLikes);
            });
        }
    });

})












// let likeButton = document.getElementById('likeButton');

// likeButton.onclick = function(){
//     if(likeButton.classList.contains("likeButton")){
//         console.log("inside js");
//         likeButton.classList.remove("likeButton");
//         likeButton.classList.add("unlikeButton");
//         likeButton.src = "/../imgs/insta-like.png";
//         likeButton.parentElement.href = "/api/unlike/{{d._id}}";
//     }
//     else{
//         likeButton.classList.remove("unlikeButton");
//         likeButton.classList.add("likeButton");
//         likeButton.src = "/../imgs/insta-unlike.png";
//         likeButton.parentElement.href = "/api/like/{{d._id}}";
//     }
// }