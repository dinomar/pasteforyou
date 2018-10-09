//https://pastebin.com/api
//loading icon
//copy to clipboard in click

const clickHandler = () => {
    
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