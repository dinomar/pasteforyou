//https://pastebin.com/api
//loading icon
//copy to clipboard in click

const clickHandler = () => {
    
    //show loading cog
    const cog = "<i class=\"fas fa-cog\"></i> Loading...";
    $("#btnSubmit").html(cog);
    
    let title = $("#title").val();
    let memo = $("#memo").val();
    let email = $("#email").val();
    
    if (!title || !memo || !email) {
        return null;
    }
    
    let options = {
        title: title,
        memo: memo,
        email: email
    };
    
    $.post('/upload', options).done(function(data) {
        
        if(!data.hasOwnProperty('url')) {
            //handle error
            console.log(data);
            return null;
        }
        
        //hide loading cog
        $("#btnSubmit").html("Submit");
        
        $("#title").val("");
        $("#memo").val("");
        $("#email").val("");
        
        $("#url").val(data["url"]);
        $("#info").show();
        $("#url").focus();
        
    });
};

$(document).ready(function() {
    
    //hide info
    $("#info").hide();
    
    //click handler
    $("#btnSubmit").on("click", clickHandler);
    
});