$(function(){
	//选中后样式变化
    $(".choose-wrap .item,.form-group .u-radio").click(function(){
        $(this).addClass("selected").siblings().removeClass("selected");
    });

//发票切换
$(".need-invoice .u-radio").click(function(){
	if($(this).index()==1){
		$(".invoice").show()
	}else{
		$(".invoice").hide()
	}
});

//支付方式选择
$(".paytype .u-radio").click(function(){
	$("input[name=paytype]").val($(this).data("type"));
});

   //验证不通过
    function noPass(msg, obj) {
        var $msg = $('<span class="nopass"></span>');
        $(obj).addClass("error").siblings(".nopass").remove();
        $msg.html(msg).appendTo($(obj).closest("div"));
    }
    //验证通过
    function pass(obj) {
        $(obj).removeClass("error").siblings(".nopass").remove();

    }

    //正则表达式验证
    function RegCheck(obj, regular) {
        var objval = $(obj).val();
        if (regular.test(objval)) {
            return true;
        } else {
            return false;
        }
    }


    //手机或邮箱实时验证
    function remoteCheck(obj, url, msg) {
        var objval = $(obj).val();
        $.ajax({
            dataType: "json",
            url: url,
            data: { name: objval },
            success: function(data) {
                if (data.status == "y") {
                    noPass(msg, obj);
                } else {
                    pass(obj);
                }
            }
        });
    }

    //账号注册验证
    function checkEmpty(obj) {
        if ($.trim($(obj).val()) == "") {
            return true;
        } else {
            return false;
        }
    }

    function checkLength(obj, len) {
        if ($.trim($(obj).val()).length > len) {
            return true;
        } else {
            return false;
        }
    }

    function btnSubmit(form, callback) {
        callback = callback || "";
        $(form).on('click', '.btn-red', function() {
            $(form).find(".txt").trigger("blur");
            if ($(".error").length) {
                return false;
            }
        });
    }

    //全局正则配置
    var RegConfig = {
        'mobile': /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/,
        'email': /^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/,
        'pwd': /^(?=[\w\W])[^*]{6,20}$/,
        'name': /^[\u4e00-\u9fa5A-Za-z]{1,20}$/,
        'companyname': /^[\u4e00-\u9fa5A-Za-z_\-\(\)\（\）]{4,50}$/,
        'telephone':/^\+\d{2,3}-\d{3,4}-\d{7,8}(-\d{3,4})?$/,
        'address':/^[\u4e00-\u9fa5A-Za-z_\-\(\)\（\）]{1,30}$/,
        'department': /^[\u4e00-\u9fa5A-Za-z]{1,20}$/
    }

  var valiate = {
        buyForm: function() {
            $("#buyForm .txt,#buyForm textarea").blur(function() {
                var name = $(this).attr("name"),
                    $this = $(this);
                //手机或邮箱验证：
                if (name == "username") {
                    if (checkEmpty($this) || !RegCheck($this,RegConfig.name)) {
                        noPass("请输入收货人姓名", $this);
                    }else{
                        pass($this);
                    }
                }
                if(name=="telphone"){
                    if (checkEmpty($this) || !RegCheck($this,RegConfig.mobile)) {
                        noPass("请输正确的11位手机号码", $this);
                    }else{
                        pass($this);
                    }
                }
                if(name=="address"){
                    if (checkEmpty($this) || !RegCheck($this,RegConfig.address)) {
                        noPass("请输入收货人的收货地址", $this);
                    }else{
                        pass($this);
                    }
                }
                if(name=="mobile"){
                    if (checkEmpty($this) || !RegCheck($this,RegConfig.mobile)) {
                        noPass("请输入正确的11位手机号码", $this);
                        $(".getcode").attr("disabled","disabled");
                    }else{
                        pass($this);
                        $(".getcode").attr("disabled",false);

                    }
                }
            });
    //验证码
    //验证码倒计时
    $(".getcode").click(function(){
        var iCount = 60,
            $this = $(this),
            timer = null;
        $this.attr("disabled", "disabled");
        $this.val(iCount + "s后重新发送");
        timer = setInterval(function() {
            iCount--;
            if (iCount == 0) {
                $this.val("发送验证码");
                clearInterval(timer);
                $this.attr("disabled", false);
            } else {
                $this.val(iCount + "s后重新发送");
            }

        }, 1000);

        $.post(url,data, function(data) {
            $(".codemsg").remove();
            $this.siblings(".nopass,.pass").remove();
            if (data == 0) {
                $("<p class='codemsg clear'>验证码发送失败!</p>").insertAfter($this);
                $("#validate_code").addClass("error");
                noPass("邮箱或手机格式不正确", $this);

            }
            if (data == 1) {
                $("<p class='codemsg clear'>验证码已发送，请注册查收,<a href='javascript:;' class='c369'>重发</a></p>").insertAfter($this);
                $("#validate_code").removeClass("error");

            }
            if (data == 2) {
                $("<p class='codemsg clear'>今日发送已达上限</p>").insertAfter($this);
                $("#validate_code").addClass("error");

            }
        });

    });

        $("#buyForm .btn-red").click(function() {
            $("#buyForm .txt,#buyForm textarea").trigger("blur");
            if($(".paytype .u-radio.selected").length==0){
                $(".paytype").next(".nopass").remove();
                $(".paytype").addClass("error");
                $("<span class='nopass' style='margin-left:0;'>请选择支付方式</span>").insertAfter($(".paytype"));
            }else{
                $(".paytype").removeClass("error");
                $(".paytype").next(".nopass").remove();
            }
            if ($(".error").length) {
                return false;
            }
        });
    }

}

valiate.buyForm();




});