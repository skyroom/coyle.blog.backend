//引入http
const http=require("http");
//引入express
const express=require("express");
//引入multer





//处理来自页面的ajax请求。single文件上传
router.post('/upload', upload.single('file'), function (req, res, next) {

});




// 前台获取文章预览列表
var fileUpload = function(req, res, next) {
    //拼接文件上传后的网络路径
	console.log("file:" + req.file.originalname)
    var url = 'http://' + req.headers.host + '/upload/' + req.file.originalname;

    res.end(req.file.originalname);
}


module.exports = {
    fileUpload: fileUpload,
};
