$('#logout').on('click', function() {
    var isConfirm = confirm('你真的要推出吗？');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(response) {
                location.href = 'login.html';

            },
            error: () => {
                alert('退出失败');
            }
        })
    }

})

// 处理日期格斯
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
// 向服务器端发送请求 索要登录用户信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(response) {
        console.log(response);
        $('.avatar').attr('src', response.avatar)
        $('.profile.name').html(response.nickName)
    }
})