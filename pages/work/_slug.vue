<!-- pages/work/_slug.vue -->

<template>
  <div>
    <div 
      class="w-full h-64 my-6 bg-cover bg-center shadow-lg"
      :style=" 'background-image: url(' + work.fields.image.fields.file.url + ')' "
    ></div>
    <!-- カテゴリのプレート部分にリンクを張って、カテゴリでの検索ができるようにしている。 -->
    <nuxt-link :to=" '/category/' + work.fields.category.sys.id ">
      <p class="text-center">{{ work.fields.category.fields.name }}</p>
    </nuxt-link>
    <h1 class="text-center text-4xl">{{ work.fields.title }}</h1>
    <p class="text-center text-sm">{{ work.fields.subtitle }}</p>
    <div class="flex justify-center mb-5">
      <!-- 
        @clickはonclickイベントの省略表記。
        $router.pushはvue.cliのルーティング処理で、所定のURLへ遷移させるもの。
        （SPAの場合は土台ページに載せていくもの（逆はPOP）。SSRの場合は単にページ遷移）
        ここでやってるのはnuxt-linkと同じ意味だが、こういう遷移方法もあるよってので紹介してるだけ。liの外側にnuxt-link
        を作ってやっても同じこと。
      -->
      <li 
        v-for="tag in work.fields.tag2"
        :key="tag.sys.id"
        class="list-none text-xs m-1 bg-gray-200 p-1 rounded"
        @click="$router.push('/tag/'+tag.sys.id)"
      >
        {{ tag.fields.name }}
      </li>
    </div>
    <!-- 
        html上でマークダウン形式で表示させるには、最初にインストールしたmarkdown-itの機能を使う。
        以下のように、$md.render(htmlに変換したいやつ)でmarkdown⇒htmlへ変換した後、vueの機能で
        あるv-htmlでhtmlを表示できるようにしてやればOK
     -->
    <!-- <div v-html="work.fields.content"></div> -->
    <div class="content" v-html="$md.render(work.fields.content)"></div>

  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
// ここから追加
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
// ここまで追加

const client = createClient()
export default { 
  //asyncData(nuxt.jsで用意されているメソッド)に引数を渡すときは単なるparamsではなく{params}という形でオブジェクト化する必要がある。
  asyncData({params}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'work',
        'fields.slug': params.slug // 取得対象をslugフィールドがURL内のslugパラメータと等しいものに限定
      })
    ]).then(([works]) => {
      return {
        work: works.items[0] // 取得した配列データの初めの１つを変数workに入れる
      }
    }).catch(console.error)
  },

    // ここから追加
  computed: {
    faLink () {
      return faLink
    },
    faGithub () {
      return faGithub
    }
  }
  // ここまで追加
}
</script>

<style>
.content h1 {
  font-weight: bold;
  font-size: 1.2rem;
  margin: 25px 0;
  border-bottom: 2px solid #000;
}
.content h2 {
  font-weight: bold;
  font-size: 1rem;
  margin: 20px 0;
  border-bottom: 1px solid #eee;
}
.content h3 {
  font-weight: bold;
  font-size: .8rem;
  margin: 15px 0;
}
.content a {
  color: blue;
}
.content li {
  list-style: disc;
}
.content code {
  background: #eee;
  padding: 2px;
}
.content pre code {
  background: none;
  padding: 0;
}
.content pre {
  background: #000;
  color: #fff;
  padding: 5px;
}
</style>