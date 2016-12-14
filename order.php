<?php
$info = $_POST;
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>确认订单</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link rel="stylesheet" type="text/css" href="css/base.css">
    <link rel="stylesheet" type="text/css" href="css/buy.css">
</head>

<body>
    <div class="top">
        <iframe src="http://www.smartlifein.com/index.php?m=member&amp;c=index&amp;a=mini&amp;q=" id="topifr" frameborder="0" width="100%" scrolling="no" height="29"></iframe>
    </div>
    <div class="header">
        <div class="wrapper">
            <div class="header-left fl">
                <div class="logo fl"><img src="http://www.smartlifein.com/statics/images/logo_03.jpg"></div>
                <h2 class="fl">团购</h2>
            </div>
            <div class="header-right fr">
                <ul class="shopping-service">
                    <li class="s1">
                        <h3>行货保证</h3>
                        <p>所售商品为正品行货</p>
                    </li>
                    <li class="s2">
                        <h3>如实描述</h3>
                        <p>卖家对商品描述负责</p>
                    </li>
                    <li class="s3">
                        <h3>无忧退换</h3>
                        <p>7天可退，15天可换</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div id="main">
        <div class="wrapper">
            <form action="" method="post" id="orderForm">
            <div class="order-info mt35">
                <h2 class="u-title">产品信息</h2>
                <div class="clearfix mt35">
                    <div class="order-img fl">
                        <h3>
                            <img src="<?php echo $info['propic'];?>" alt="">
                        </h3>
                        <p class="c999 lh12 mt20">由<strong class="fb c666"><?php echo $info['company'];?></strong>提供</p>
                    </div>
                    <div class="order-summary fl ml40">
                        <h3 class="u-title"><?php echo $info['proname'];?></h3>
                        <p class="f14 order-option"><?php echo $info['proformat'];?></p>
                        <p class="f14 price-num"><?php echo $info['proprice'];?>元X<?php echo $info['pronum'];?></p>
                        <p class="price">￥<?php echo $info['proprice']*$info['pronum'];?> </p>
                    </div>
                </div>
            </div>
            <div class="receiver-info form-section mt45">
                <h3 class="u-title">收货人信息</h3>
                <p><span>收货人：</span><?php echo $info['username'];?></p>
                <p><span>手机号：</span><?php echo $info['telphone'];?></p>
                <p><span>收货地址：</span><?php echo $info['address'];?></p>
                <p><span>发票：</span><?php echo $info['invoice'];?></p>
                <p><span>备注：</span><?php echo $info['uremark'];?></p>
            </div>
            <div class="order-pay form-section clearfix pt30">
                <h3 class="u-title fl">支付方式</h3>
                <div class="paytype fl">
                    <span class="u-radio selected">
                    <?php if($info['paytype'] == 1):?>
                    <img src="images/alipay.png">
                    <?php else:?>
                    <img src="images/weixin.png">

                    <?php endif;?>

                    </span>
                </div>
               
            </div>
            <div class="form-section tc pt25 mt40 btn-box">
                <input type="hidden" name="proid" value="<?php echo $info['proid'];?>">
                <input type="hidden" name="proname" value="<?php echo $info['proname'];?>">
                <input type="hidden" name="propic" value="<?php echo $info['propic'];?>">
                <input type="hidden" name="prourl" value="<?php echo $info['prourl'];?>">
                <input type="hidden" name="company" value="<?php echo $info['company'];?>">
                <input type="hidden" name="proformat" value="<?php echo $info['proformat'];?>">
                <input type="hidden" name="proprice" value="<?php echo $info['proprice'];?>">
                <input type="hidden" name="pronum" value="<?php echo $info['pronum'];?>">
                <input type="hidden" name="username" value="<?php echo $info['username'];?>">
                <input type="hidden" name="mobile" value="<?php echo $info['mobile'];?>">
                <input type="hidden" name="telphone" value="<?php echo $info['telphone'];?>">
                <input type="hidden" name="address" value="<?php echo $info['address'];?>">
                <input type="hidden" name="invoice" value="<?php echo $info['invoice'];?>">
                <input type="hidden" name="uremark" value="<?php echo $info['uremark'];?>">
                <input type="hidden" name="paytype" value="<?php echo $info['paytype'];?>">
                <input type="hidden" name="code" value="<?php echo $info['code'];?>">
                
                <input type="button" value="确认支付" class="btn-red mr5">
                <input type="button" value="修改订单" class="btn-grey" onclick="window.location.href='buy.html'">
            </div>
            </form>
       
        </div>
    </div>
    <div class="footer">
        <div class="main">
            <div class="foot">
                <ul>
                    <li>
                        <a href="http://www.smartlifein.com/" target="_blank"><img src="http://www.smartlifein.com/statics/images/flogo.jpg" width="150" height="65" alt=""></a>
                    </li>
                    <li>
                        <p class="blue_color">
                            <a href="http://www.smartlifein.com/mobile/" target="_blank">手机</a> -
                            <a href="http://www.smartlifein.com/computer/" target="_blank">电脑</a> -
                            <a href="http://www.smartlifein.com/wearable/" target="_blank">可穿戴</a> -
                            <a href="http://www.smartlifein.com/vr/" target="_blank">VR</a> -
                            <a href="http://www.smartlifein.com/smarthome/" target="_blank">智能家居</a> -
                            <a href="http://www.smartlifein.com/recreation/" target="_blank">娱乐</a> -
                            <a href="http://www.smartlifein.com/robot/" target="_blank">机器人</a> -
                            <a href="http://www.smartlifein.com/automobile/" target="_blank">汽车</a> -
                            <a href="http://www.smartlifein.com/health/" target="_blank">健康</a> -
                            <a href="http://www.smartlifein.com/medical/" target="_blank">医疗</a> -
                            <a href="http://www.smartlifein.com/education/" target="_blank">教育</a>
                        </p>
                        <p><a href="http://www.smartlifein.com/service/aboutus.html" target="_blank">关于我们</a> | <a href="http://www.smartlifein.com/service/ad.html" target="_blank">联系我们</a> | <a href="http://www.smartlifein.com/login.html" rel="nofollow" target="_blank">登录</a> | <a href="http://www.smartlifein.com/register.html" target="_blank" rel="nofollow">注册</a> | <a href="http://www.smartlifein.com/service/tougao.html" target="_blank" rel="nofollow">投稿</a> <span>客服电话：+86-755-83279360</span><span>邮箱：service@smartlifein.com</span></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="g-footer-record">
        <a target="_blank" href="http://www.miitbeian.gov.cn" rel="nofollow">Copyright © 智慧生活网 (粤ICP备06087881号-17)</a>
        <img src="http://www.smartlifein.com/statics/images/newindex/jc.gif" style="vertical-align:middle;">
    </div>
    </div>

    <script type="text/javascript" src="http://www.smartlifein.com/statics/js/jquery-1.8.3.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</body>

</html>
