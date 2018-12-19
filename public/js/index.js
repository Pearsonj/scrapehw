$(".delete").on("click", function(){
    var commentId = $(this).attr("value");
    console.log(commentId);

   $.post(
       "/api/delete",
       {
           commentId: commentId
       },
       function(res) {
           location.reload();
           console.log(res);
       }
   )
});