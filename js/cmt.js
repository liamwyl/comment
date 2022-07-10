// 1.实现将服务器中的信息渲染到评论列表中功能

// 获取服务器中列表
function getInfo() {
  $.ajax({
    method: 'GET',
    url: 'http://www.liulongbin.top:3006/api/cmtlist',
    data: {},
    success: function (res) {
      console.log(res)
      if (res.status !== 200) {
        alert("请求失败！！！")
      } else {
        // 定义一个空数组接收服务器获取的数据
        var rows = []
        // 遍历收到的数据,并添加到数组中
        $.each(res.data, function (i, item) {
          rows.push('<li class="list-group-item"><span class="badge" style="background-color: orange;">' + item.time
            + '</span><span class="badge" style="background-color: blueviolet;">' + item.username
            + '</span>' + item.content
            + '</li>')
        })

        // 渲染到页面中 先清空页面empty() 将数组添加到页面  join('')将数组转换为字符串
        $('#listAdd').empty().append(rows.join(''))

      }
    }
  })
}

getInfo()



// 2.实现发表评论功能

$(function () {
  // 获取信息
  $('#btnAdd').on('submit', function (e) {
    // 取消默认行为
    e.preventDefault();
    // 获取用户输入的全部信息
    var data = $(this).serialize()
    // console.log(data) 
    // 发送请求   根据API文档选择post()以及status=201
    $.post('http://www.liulongbin.top:3006/api/addcmt', data, function (res) {
      if (res.status !== 201) {
        console.log("发送请求失败！")
      } else {
        // 刷新列表
        getInfo()
        // 将输入框清空  第一种
        // $('#cmtUser').val('')
        // $('#cmtText').val('')

        // 第二种
        // 获取form表单，添加[0]将jQuery对象转换为原生  在调用原生的reset()清除方法
        $('#btnAdd')[0].reset()

      }

    })
  })
})


