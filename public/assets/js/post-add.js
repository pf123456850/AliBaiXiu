// 向服务器端发送请求，获取数据
$.ajax({
        url: '/categories',
        type: 'get',
        success: function(response) {

            var html = template('categoryTpl', { data: response })
            console.log(html);

            $('#category').html(html);
        }
    })
    // 文章图片封面的上传
$('#feature').on('change', function() {
    var file = this.files[0];
    var formData = new FormData;
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#thumbnail').val(response[0].cover);
            $('#pic').attr('src', response[0].cover).show();
        }
    })
})

$('#addForm').on('submit', function() {
        var formData = $(this).serialize();
        $.ajax({
            type: 'post',
            url: '/posts',
            data: formData,
            success: function() {
                location.href = '/admin/posts.html';
            }
        })

        // 阻止默认行为
        return false;
    })
    // 获取浏览器中的id参数
var id = getUrlParams('id');
// 当前管理员时在做修改文章操作
if (id != -1) {
    // 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(response) {
            // 向服务器端发送请求，获取数据
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function(categories) {
                    response.categories = categories;
                    console.log(response);
                    var html = template('modifyTpl', response);
                    $('#parentBox').html(html);

                }
            })
        }
    })


}

// 封装获取地址栏中的数据
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split("=");
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}
// 当修改文章信息标点发生提交行为的时候
$('#parentBox').on('submit', '#modifyForm', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 获取管理员正在修改的文章id值
    var id = $(this).attr('data-id');
    $.ajax({
            type: 'put',
            url: '/posts/' + id,
            data: formData,
            success: function() {
                location.href = '/admin/posts.html';
            }
        })
        // 阻止默认行为
    return false;
})