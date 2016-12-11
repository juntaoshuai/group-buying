$(function() {
    //选中后样式变化
    $(".choose-wrap .item,.form-group .u-radio").click(function() {
        $(this).addClass("selected").siblings().removeClass("selected");
    });

    //发票切换
    $(".need-invoice .u-radio").click(function() {
        if ($(this).index() == 1) {
            $(".invoice").show()
        } else {
            $(".invoice").hide()
        }
    });

    //支付方式选择
    $(".paytype .u-radio").click(function() {
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
                if (data == 0) {
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

    //全局正则配置
    var RegConfig = {
        'mobile': /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/,
        'email': /^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/,
        'pwd': /^(?=[\w\W])[^*]{6,20}$/,
        'name': /^[\u4e00-\u9fa5A-Za-z]{1,20}$/,
        'companyname': /^[\u4e00-\u9fa5A-Za-z_\-\(\)\（\）]{4,50}$/,
        'telephone': /^\+\d{2,3}-\d{3,4}-\d{7,8}(-\d{3,4})?$/,
        'address': /^[\u4e00-\u9fa5A-Za-z_\-\(\)\（\）]{1,30}$/,
        'department': /^[\u4e00-\u9fa5A-Za-z]{1,20}$/
    }

    var valiate = {
        buyForm: function() {
            $("#buyForm .txt,#buyForm textarea").blur(function() {
                var name = $(this).attr("name"),
                    $this = $(this);
                //手机或邮箱验证：
                if (name == "username") {
                    if (checkEmpty($this) || !RegCheck($this, RegConfig.name)) {
                        noPass("请输入收货人姓名", $this);
                    } else {
                        pass($this);
                    }
                }
                if (name == "telphone") {
                    if (checkEmpty($this) || !RegCheck($this, RegConfig.mobile)) {
                        noPass("请输正确的11位手机号码", $this);
                    } else {
                        pass($this);
                    }
                }
                if (name == "address") {
                    if (checkEmpty($this) || !RegCheck($this, RegConfig.address)) {
                        noPass("请输入收货人的收货地址", $this);
                    } else {
                        pass($this);
                    }
                }
                if (name == "mobile") {
                    if (checkEmpty($this) || !RegCheck($this, RegConfig.mobile)) {
                        noPass("请输入正确的11位手机号码", $this);
                        $(".codemsg").remove();
                    } else {
                        pass($this);
                        $(".codemsg").remove();

                    }
                }
                if (name == "validate_code") {
                    if (checkEmpty($this)) {
                        noPass("请输入收到的短信验证码", $this);
                    } else {
                        remoteCheck($this, "js/data.txt", "验证码错误");


                    }
                }
            });
            //验证码
            //验证码倒计时
            $(".getcode").click(function() {
                if (checkEmpty("#mobile") || !RegCheck("#mobile", RegConfig.mobile)) {
                    return;
                }
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

                $.post("js/data.txt", { mobile: $("#mobile").val() }, function(data) {
                    $(".codemsg").remove();
                    $this.siblings(".nopass,.pass").remove();
                    if (data == 0) {
                        $("<p class='codemsg red'>验证码发送失败!</p>").insertAfter($this);
                        $("#validate_code").addClass("error");

                    }
                    if (data == 1) {
                        $("<p class='codemsg red'>短信已发送</p>").insertAfter($this);
                        $("#validate_code").removeClass("error");

                    }
                    if (data == 2) {
                        $("<p class='codemsg red'>今日发送已达上限</p>").insertAfter($this);
                        $("#validate_code").addClass("error");

                    }
                });

            });

            $("#buyForm .btn-red").click(function() {
                $("#buyForm .txt,#buyForm textarea").trigger("blur");
                if ($(".paytype .u-radio.selected").length == 0) {
                    $(".paytype").next(".nopass").remove();
                    $(".paytype").addClass("error");
                    $("<span class='nopass' style='margin-left:0;'>请选择支付方式</span>").insertAfter($(".paytype"));
                } else {
                    $(".paytype").removeClass("error");
                    $(".paytype").next(".nopass").remove();
                }
                if ($(".error").length) {
                    return false;
                }
            });
        },
        queryOrderForm: function() {
            $("#queryOrderForm .txt").blur(function() {
                $this = $(this);
                //手机或邮箱验证：
                if (checkEmpty($this) || !RegCheck($this, RegConfig.mobile)) {
                    $("p.red").remove();
                    $("<p class='red lh24'>请输正确的11位手机号码</p>").insertAfter($this.closest("p"));
                } else {
                    $.post("js/data.txt", { mobile: $this.val() }, function(data) {
                        if (data == 0) {
                            $("p.red").remove();
                            $("<p class='red lh24'>未使用过此手机号快捷下单，暂无订单</p>").insertAfter($this.closest("p"));
                        } else {
                            $("p.red").remove();
                        }
                    });

                }
            });
            $(".query-btn").click(function() {
                $("#queryOrderForm .txt").trigger("blur");
                if ($(".error").length) {
                    return false;
                } else {
                    //ajax提交,跳到订单查询详情页面
                }

            });

        }

    }

    valiate.buyForm();
    valiate.queryOrderForm();

//数量操作
(function(){
     var minNum = 1,
            maxNum = 999;
        $("#buy-num").on('change keyup', function() {
            $val = $(this).val();
            if (isNaN($val) || $val.indexOf(".") >= 0) {
                $(this).val(1);
                return false;
            }
            if ($val < minNum) {
                $(this).val(minNum);
            } else if ($val > maxNum) {
                $(this).val(maxNum);
            } else if ($val == 1) {
                $(this).prev().removeClass("active");

            } else {
                $(this).prev().addClass("active");

            }
        });

        $(".btn-add").on('click', function() {
            $(this).prev().prev().addClass("active");

            var $input = $("#buy-num"),
                cur = $input.val();
            cur++;
            if (cur > maxNum) {
                return;
            }
            $input.val(cur);

        });


        $(".btn-reduce").on('click',function() {
            var $input = $("#buy-num"),
                cur = $input.val();
            cur--;
            $input.val(cur);
            if (cur == 1) {
                $(this).addClass("disabled");
            }
        });
})();







});
