$(()=>{

    let profileArea = $('.profileArea');

    profileArea.on("click",(ev)=>{
        let attribute = ev.target.getAttribute('class');
        let id = ev.target.getAttribute('id');
        if(attribute == "Follow")
        {
            let url = `/api/follow/${id}`;
            $.ajax({
                type: "POST",
                url: url,
                success: function() {   
                    location.reload();  
                }
            });
        }
        if(attribute == "Unfollow")
        {
            let url = `/api/unfollow/${id}`;
            $.ajax({
                type: "POST",
                url: url,
                success: function() {   
                    location.reload();  
                }
            });
        }
    });
});