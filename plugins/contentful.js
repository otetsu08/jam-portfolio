// src/plugins/contentful.js

//npmでインストールしたcontentfulモジュールをreqiuireして初期設定をする。
const contentful = require('contentful')
const config = {
  //以下の値は、rootフォルダ/.contentful.jsonに定義する。
  space: process.env.CTF_SPACE_ID,  //contentfulのスペースID
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN //contentfulのaccess_token
}
module.exports = {
  createClient () {
    return contentful.createClient(config)
  }
}