var nodemailer = require('nodemailer');

module.exports.SendMail = async function(rank, subject, simei, id, url, callback_func){
    var address = 'ここにMailTrapの受信ボックスアドレス';
    var nodemailer = require('nodemailer');
    var smtpConfig = {
        port: 2525,
        host: 'smtp.mailtrap.io',
        auth: {
            user: 'ここにMailTrapのID',
            pass: 'ここにMailTrapのパスワード'
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    var body01 = '様。\r\n';
    var body02 = 'この度は当ホテルに会員登録いただき、誠にありがとうございました。\r\n';
    var body03 = '登録手続きが完了いたしましたので、ご連絡申し上げます。\r\n';
    var body04 = 'ユーザーID：';
    var body05 = 'パスワードは登録時に設定頂いたものをお使い頂けます。\r\n';
    var body06 = 'ご登録頂いた内容につきましては、以下のアドレスにてご確認頂けます。\r\n';
    var body07 = 'それでは、ご利用を心からお待ち申し上げております。\r\nhttps://hotel.testplanisphere.dev/ja/index.html';

    var body = rank + '\r\n' + simei + body01 + body02 + body03 + body04 + id + '\r\n' + body05 + body06 + url + '\r\n' + body07;

    let info = await transporter.sendMail({
        from: 'ここは送信元のアドレス',
        to: address,
        subject: subject,
        text: body
    }, function(e, res){
       console.log(e ? e.message : res.message);
       smtp.close();
    });
    return await info;
};

module.exports.lastMailId = async function(){
    var result;
    var https = require('https');
    var url = 'https://mailtrap.io/api/v1/inboxes/"ここにinboxid"/messages';
    let options = {
        headers: {
            'Api-Token': 'ここにApi-Token'
        }
    }
    var data = [];

    let promise = await new Promise(async(resolve, reject) => {
        await https.get(url, options, async function (res) {
            await res.on('data', function(chunk) {
                data.push(chunk);
            }).on('end', function() {
                var events   = Buffer.concat(data);
                var r = JSON.parse(events);
                var matchData = r.filter(function(item, index){
                    if(item.id != '0') return true;
                });
                resolve(r[0].id);
//                console.log(r[0].id);
            });
        });
    }).then((lastId) => {
        result = lastId;
    });
    return await result;
}

module.exports.receiveSubject = async function(){
    var result;
    var https = require('https');
    var url = 'https://mailtrap.io/api/v1/inboxes/"ここにinboxid"/messages';
    let options = {
        headers: {
            'Api-Token': 'ここにApi-Token'
        }
    }
    var data = [];

    let promise = await new Promise(async(resolve, reject) => {
        await https.get(url, options, async function (res) {
            await res.on('data', function(chunk) {
                data.push(chunk);
            }).on('end', function() {
                var events   = Buffer.concat(data);
                var r = JSON.parse(events);
                var matchData = r.filter(function(item, index){
                    if(item.id != '0') return true;
                });
                resolve(r[0].subject);
//                console.log(r[0].id);
            });
        });
    }).then((lastId) => {
        result = lastId;
    });
    return await result;
}

module.exports.receiveMail = async function(mailid){
    var result;
    var https = require('https');
    var url = 'https://mailtrap.io/api/v1/inboxes/"ここにinboxid"/messages/' + mailid + '/body.txt';
    let options = {
        headers: {
            'Api-Token': 'ここにApi-Token'
        }
    }
    var data = [];

    let promise = await new Promise((resolve, reject) => {
        let client = https.get(url, options, function (res) {
            res.setEncoding('utf-8');
            res.on('data', function(chunk) {
                resolve(chunk);
            });
            res.on('close', function(){
//                console.log('Connection closed');
            });
            res.on('end', function() {
//                console.log('Response data end');
            });
            res.on('aborted', function() {
                console.log('Connection aborted');
            });
        });
    }).then((body) => {
        result = body;
    });
    return await result;
};