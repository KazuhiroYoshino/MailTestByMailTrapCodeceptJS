# MailTestByMailTrapCodeceptJS

* MailTrapのAPIを利用してNode.jsでメール受信をする。
* 受信したメール本文からURLやログイン情報を拾って、本文に記載のページに移動する。
* ログイン後、会員IDと会員氏名と会員ランクが間違っていないかを検証する。

Node.jsのhttpsモジュールを使ってMailTrapからSubjectと本文を取得する。
本文はUTF-8でデコードする。
