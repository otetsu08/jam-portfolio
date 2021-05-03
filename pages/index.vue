<template>
  <div>
    <!--
      v-forでphpでいうところのforeachみたいに順繰り回していってくれる。
      注意点としては、v-for利用時は必ずkeyを指定して、必ず一意になるようなIDを使うこと。
      これをしないと、削除や追加が行われた際にkeyがずれたりして誤って既存の情報を上書きしたりしてしまうらしい。
      （要はこちらが意図したindexを指さない可能性があるみたい。）
     -->
  
    <!-- index_org.vue内のコードを全削除し、Itemコンポーネントを追加 -->
    <!-- :変数=valueを定義すると、子コンポーネントにその変数名で値が渡せる。（子コンポーネント側に定義が必要） -->
    <Item 
      v-for="work in works" 
      :key="work.sys.id"
      :work="work"
    />
    <!-- ここまで追加 -->
  </div>
</template>

<script>
//"@/"でrootフォルダを指すことができる。
import Item from '@/components/Item' // コンポーネントを追加


import { createClient } from '~/plugins/contentful.js'
const client = createClient()
export default { 

    // 追加したコンポーネントを使えるように定義
  components: {
    Item
  },

  //nuxt.jsで用意されているデータ
  asyncData() {
    return Promise.all([
      client.getEntries({
        'content_type': 'work', // workタイプの記事データを全取得
        order: '-sys.createdAt' // 作成日時順に並べる
      })
    ]).then(([works]) => {
      return {
        works: works.items // 取得したデータを配列worksに入れる
      }
    }).catch(console.error)
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
