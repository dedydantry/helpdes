$(document).ready(function(){
    // notifikasi
    var url = $('body').data('host');
    $('#multiItems').selectize({});
    function notifikasi(type, string){
        var html = '<div class="notif "><div class="alert alert-'+type+'" role="alert"><strong>'+string+'</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"></span></button></div></div>';
        $('body').append(html)
        $('.notif').animate({
            bottom:'30px',
            opacity:1
        }, 1000, function(){
            setTimeout(function(){
                $('.notif').animate({
                    opacity:0
                }, 1000);
            }, 2000);
        })
    }
    // end notification

    $(document).on('submit', '#form-comment', function(e){
        e.preventDefault();
        var url = $(this).attr('action');
        var data = $(this).serialize();
        var $this = $(this);
        $.post(url, data, function(status){
            var firstchild = $('.comment-list .card').first();
            if(firstchild.hasClass('card')){
                $(status).insertBefore(firstchild).hide().fadeIn('slow')
                notifikasi('info', 'Comment has been saved');
                $this[0].reset()
            }
            else{
                return $('.comment-list').append(status).fadeIn('slow');
                notifikasi('danger', 'Failed , try again');
            }
        })
    })

    $('.edit-comment').click(function(e){
        e.preventDefault();
        var parent = $(this).parent('div').parent('div').parent('div');
        parent.children('.c-first-child').addClass('c-hidden');
        parent.children('.field-edit-comment').hide().removeClass('c-hidden').show()
    })

    $('.edit-cancel').click(function(e){
        var parent = $(this).parent('div').parent('form').parent('div').parent('div');
        parent.children('.field-edit-comment').addClass('c-hidden')
        parent.children('.c-first-child').removeClass('c-hidden');
    })

    $(document).on('submit', '.form-edit.comment', function(e){
        e.preventDefault();
        var url = $(this).attr('action');
        var data = $(this).children('.form-group').children('textarea').val()
        var $this = $(this);
        console.log('wkjk')
           
       
        $.post(url, {comment : data}, function(status){
            if(status.status == 'success'){
                var parent = $this.parent('div').parent('div');
                parent.children('.text-muted').children('p').text(data)
                parent.children('.field-edit-comment').addClass('c-hidden')
                parent.children('.c-first-child').removeClass('c-hidden');
                notifikasi('info', 'Comment has been update');
            } else{
                notifikasi('danger', 'Failed to update comment, try again');
            }
        })
    })

    $('.delete-comment').click(function(){
        var id = $(this).data('target');
        var parent = $(this).parent('div').parent('div').parent('div');
        $.post(url+'comment/destroy/'+id, {'data' : true}, function(status){
            console.log(status)
            if(status.status == 'success'){
                parent.fadeOut('slow');
                notifikasi('info', 'Comment has been delete');
            }
        })
    })

    // delete ticket
    $('a.ticket-delete').click(function(e){
        e.preventDefault()
        var parent = $(this).parent('div').parent('div').parent('td').parent('tr');
        var id = $(this).data('id');
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: true,
            showLoaderOnConfirm: true,
        }, function(isConfirm) {
            if(isConfirm){
               $.post(url+'ticket/delete/'+id, function(status){
                   if(status.status == 'success'){
                        parent.fadeOut('slow');
                        swal("Deleted!"," has been delete", "success")
                   } else {
                        swal("Failed!"," failed delete", "danger")
                   }
               })
            }
            else {
                swal("Cancelled")
            }
        })
    })

    // change status
    $('.btn-change').click(function(e){
        e.preventDefault();
        var status = $(this).data('sts');
        var url = $(this).attr('href');
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: true,
            showLoaderOnConfirm: true,
        }, function(isConfirm) {
            if(isConfirm){
               $.post(url, {'status' : status}, function(status){
                   if(status.status == 'success'){
                        swal("Deleted!"," has been delete", "success")
                   } else {
                        swal("Failed!"," failed delete", "danger")
                   }
               })
            }
            else {
                swal("Cancelled")
            }
        })
    })

    // data table
    $('.card-table').DataTable()
})