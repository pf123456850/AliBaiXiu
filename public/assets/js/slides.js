// 当管理员选择文件的时候
$('#file').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('image', file);
    // 向服务器端发送请求 获取数据  
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#image').val(response[0].image)
        }

    })
})






// 添加轮播图
$('#slidesForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function(response) {
            location.reload();
        }
    })
    return false;
})



// 向服务器端发送请求，索要轮播图列表数据
$.ajax({
    type: 'get',
    url: "/slides",
    success: function(response) {
        var html = template('slidesTpl', { data: response })
        $('#slidesBox').html(html);

    }
})


// 删除轮播图
$('#slidesBox').on('click', '.delete', function() {
    if (confirm('您确定要删除吗？')) {
        var id = $(this).attr('data-id');
        // 向服务器端发送请求，实现轮播图删除功能
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})