$('#userForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(res) {
            location.reload();
        },
        error: function(res) {
            alert('添加用户失败');
        }
    })
    return false;

});

$('#modifyBox').on('change', '#avatar', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
});
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        var html = template('userTpl', { data: response });
        $('#userBox').html(html);
    }

})
$('#userBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            console.log(response);
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);

        }
    })
})

// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
        var formData = $(this).serialize();
        console.log(formData);

        var id = $(this).attr('data-id')
        $.ajax({
                type: 'put',
                url: '/users/' + id,
                data: formData,
                success: function(response) {
                    console.log(response);

                    location.reload();
                }
            })
            // 阻止表单默认提交
        return false;
    })
    //     // 删除用户
$('#userBox').on('click', '.delete', function() {
    if (confirm('你真的要删除用户吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload();
            }
        })
    }

})





















// 批量删除
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany')
selectAll.on('change', function() {
    // 获取全选按钮的状态
    var status = $(this).prop('checked');
    if (status) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();

    }
    // 获取掉所有的用户，域全选按钮保持一致
    $('#userBox').find('input').prop('checked', status);
});

$('#userBox').on('change', '.userStatus', function() {
        // 获取到所有用户 在所有用户中过滤出选中的用户
        // 判断选中用户的数量和所有用户的数量是否一致
        // 如果一直 就说明所有的用户都是选中的
        // 否则 就是有用户灭有被选中
        var inputs = $('#userBox').find('input');
        if (inputs.length == inputs.filter(':checked').length) {
            // alert('所有用户都是选中的');
            selectAll.prop('checked', true);
        } else {
            // alert('不是所有的用户都是选中的');
            selectAll.prop('checked', false);
        }
        // 如果选中的复选框的数量大于0就说明由选中的复选框
        if (inputs.filter(':checked').length > 0) {
            // 显示批量删除按钮
            deleteMany.show();
        } else {
            // 隐藏批量删除按钮
            deleteMany.hide();
        }
    })
    // 为批量删除按钮添加点击事件
deleteMany.on('click', function() {
    var ids = [];
    var checkedUser = $('#userBox').find('input').filter(':checked');
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'));
    });
    if (confirm('你真的确定要进行批量删除操作码？')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload();
            }
        })
    }

});