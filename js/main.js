$(function() {
    //选中后样式变化
    $("#main").on('click', ".choose-wrap .item,.form-group .u-radio", function() {
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
                if (name == "invoice_tt") {
                    if (checkEmpty($this)) {
                        noPass("请输入发票抬头", $this);
                    } else {
                        pass($this);

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
                } else {
                    $("input[name=proid]").val($(".product-hd h1").data("proid"));
                    $("input[name=proname]").val($(".product-hd h1").html());
                    $("input[name=company]").val($(".product-hd p strong").html()); //供应商
                    $("input[name=propic]").val($(".preview img").attr("src")); //图片url
                    $("input[name=prourl]").val(window.location.href); //地址栏url
                    $("input[name=proformat]").val($(".choose-version .item.selected").html() + "," + $(".choose-spec .item.selected").html());
                    $("input[name=pronum]").val($("#buy-num").val());
                    $("input[name=proprice]").val($("#price").html()); //单价
                    $("input[name=invoice]").val($("#invoice_tt").val() + "," + $("input[name=intype]").val());


                    $("#buyForm").submit();


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
    (function() {
        var minNum = 1,
            maxNum = 999;
        $("#main").on('change', '#buy-num', function() {
            var $this = $(this),
                $val = $(this).val();
            if (isNaN($val)) {
                $(this).val(1);
                return false;
            } else {
                $(this).val(Math.floor($val));
            }
            if ($val != 1) {
                $(".btn-reduce").removeClass("disabled");
            }
            if ($val == 1) {
                $(".btn-reduce").addClass("disabled");

            }
            if ($val < 1) {
                $(this).val(1);

            }
        });

        $("#main").on('click', '.btn-add', function() {
            $(this).prev().prev().addClass("active");

            var $input = $("#buy-num"),
                cur = $input.val();
            cur++;
            if (cur > 1) {
                $(".btn-reduce").removeClass("disabled");
            }
            if (cur == maxNum) {
                $(this).addClass("disabled");
            }
            if (cur > maxNum) {
                return;
            }
            $input.val(cur);

        });


        $("#main").on('click', '.btn-reduce', function() {
            var $input = $("#buy-num"),
                cur = $input.val();
            if (cur == 1) {
                return;
            }
            cur--;
            $input.val(cur);
            if (cur == 1) {
                $(this).addClass("disabled");
            }
            if (cur != maxNum) {
                $(".btn-add").removeClass("disabled");

            }
        });
    })();

    $("#main").on('click', ".choose-wrap .item", function() {
            if ($(".choose-wrap .item.selected").length == 2) {
                var vid = $(".choose-version .item.selected").data("id"),
                    sid = $(".choose-spec .item.selected").data("id");
                $.getJSON("js/data.json", function(data) {
                    $.each(data.lists, function(i) {
                        if (data.lists[i].proid == 1) {
                            $.each(data.lists[i].price, function() {
                                if (this.id == vid + "-" + sid) {
                                    $("#price").html(this.val)
                                }
                            });

                        }
                    });
                })

            }
        })
        //订单提交
    $("#orderForm .btn-red").click(function() {
        var data = $("#orderForm").serialize();
        $.ajax({
            url: "http://dev.smartlifein.com/index.php?m=order&c=index&a=ajax_order",
            // type:'POST',
            data: data,
            success: function(data) {

            }
        });
    });
    //查询订单弹窗
    $("#order-query").click(function() {
        //获得窗口的垂直位置 
        var iTop = ($(window).height() - 316) / 2;
        //获得窗口的水平位置 
        var iLeft = ($(window).width() - 543) / 2;
        window.open('query_order.html', 'newwindow', 'width=530,height=280,left=' + iLeft + ',top=' + iTop + ',toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no,status=no');
    });
    //订单查询提交
    $(".query-btn").click(function() {
        window.opener = null;
        window.open("query_detail.html", "_blank");
        window.close();
        $.getJSON('js/data.json',function(data){
            document.title=data.status;
        });



    });



});
