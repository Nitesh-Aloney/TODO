function collapse(ele) {
    $(ele).nextAll('p').first().slideToggle('fast');
}

function deleteItem(ele){
    var item = $(ele).text().replace(/ /g, '-');
    console.log(item);
    $.ajax({
        type : 'DELETE',
        url : '/todo/'+item,
        success : function(data){
            console.log('deleted');
            location.reload();
        }
    });
    return false;
}
$(document).ready(()=>{
    $('#addItem input').last().keypress((e)=>{
        if(e.which == 13){
            console.log("submitting");
            $('#addTodo').submit();
        }
    });
    $('#addTodo').on('submit', ()=>{
        var item = $("#addTodo input[name='item']");
        var date = $("#addTodo input[name='date']");
        var desc = $("#addTodo input[name='desc']");
        var todo = {item: item.val().toUpperCase(), date: date.val(), desc : desc.val()};
        $.ajax({
            type : 'POST',
            url : '/todo',
            data : todo,
            success : function(data){
                location.reload();
            }
        });
        return false;
    });

});