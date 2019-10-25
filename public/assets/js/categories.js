// 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function() {
    var formDtat = $(this).serialize();
    $.ajax({
            type: 'post',
            url: '/categories',
            data: formDtat,
            success: function() {
                location.reload();
            }
        })
        // 阻止默认行为
    return false;
});

// 发送ajax请求 向服务器端索要分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('categoryListTpl', { data: response })
        console.log(html);

        $('#categoryBox').html(html);
    }
});




// 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            console.log(response);
            var html = template('modifyCategoryTpl', response);
            $('#formBox').html(html);

        }
    })
})

// 修改分类数据发生提交行为时
$('#formBox').on('submit', '#modifyCategory', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
            type: 'put',
            url: '/categories/' + id,
            data: formData,
            success: function() {
                location.reload();
            }
        })
        // 阻止默认行为
    return false;
})

// 删除分类项
$('#categoryBox').on('click', '.delete', function() {
    if (confirm('你真的要删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})