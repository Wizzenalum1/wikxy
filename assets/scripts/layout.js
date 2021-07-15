let notySuccess = function(status,message){
    if(status){
        new Noty({
            theme:'relax',
            text:message,
            type:'success',
            layout:'topRight',
            timeout:1500
        }).show();
    }else{
        new Noty({
            theme:'relax',
            text:message,
            type:'error',
            layout:'topRight',
            timeout:1500
        }).show();
    }
}