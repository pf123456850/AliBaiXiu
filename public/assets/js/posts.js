$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        console.log(response);
        var html = template('postsTpl', response);
        $('#postsBox').html(html);
        var page = template('pageTpl', response);
        $('#page').html(page);

    }
});


// 分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: { page: page },
        success: function(response) {
            console.log(response);
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);

        }
    });
}
// 向服务器端发送请求 索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        console.log(response);
        var html = template('categoryTpl', { data: response });
        console.log(html);

        $('#categoryBox').html(html);
    }
})


// 当用户进行文章列表筛选时候
$('#filterForm').on('submit', function() {
    // 获取到管理员选择的条件
    var formData = $(this).serialize();
    // 向服务器端发送请求，根据条件索要文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(response) {
            console.log(response);
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);

        }
    });
    // 组织表单默认提交欣慰
    return false;
})

// 当用户进行文章删除的时候
$('#postsBox').on('click', '.delete', function() {
    // 弹出删除确认框 和管理员确认是否真的要进行删除操作
    if (confirm('你真的要进行删除操作码？')) {
        // 获取掉管理员要删除的文章的id
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                location.reload();
            }
        })

    }
})