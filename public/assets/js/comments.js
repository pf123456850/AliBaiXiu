// 向服务器端发送请求
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response) {
        var html = template('commentsTpl', response);
        $('#commentsBox').html(html);

        // var pageHTML = template('pageTpl', response);
        // // console.log(pageHTML);
        // $('#pageBox').html(pageHTML);

        $('#pageBox').twbsPagination({
            totalPages: response.pages,
            visiblePages: 5,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function(event, page) {
                changePage(page)
            }
        });
    },

})


// 实现分页
function changePage(page) {
    // 向服务器端发送请求
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(response) {
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            // var pageHTML = template('pageTpl', response);
            // $('#pageBox').html(pageHTML);
        }
    })
}

// 当审核按钮被点击的时候
$('#commentsBox').on('click', '.status', function() {
        // 获取当前评论的状态
        var status = $(this).attr('data-status');
        // 获取当前要修改的平id 
        var id = $(this).attr('data-id');
        // 向服务器端发送请求
        $.ajax({
            type: 'put',
            url: '/comments/' + id,
            data: {
                state: status == 0 ? 1 : 0
            },
            success: function() {
                location.reload();
            }
        })
        return;
    })
    // 当删除按钮被点击时
$('#commentsBox').on('click', '.delete', function() {
    if (confirm('您真的要执行删除操作吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})