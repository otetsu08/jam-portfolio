<!-- pages/search/_keyword.vue -->

<!-- 
　検索結果を表示するページ。（キーワードを伴って飛んでくるページ。
  キーワード自体はヘッダーに専用コンポーネントを作るのでこのページじゃない。
 -->
<template>
  <div>
    <Item 
      v-for="work in works" 
      :key="work.sys.id"
      :work="work"
    />
  </div>
</template>

<script>
import Item from '@/components/Item' // ここを追加
import { createClient } from '~/plugins/contentful.js'
const client = createClient()
export default {
  components: {
    Item
  },
  asyncData ({params}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'work', // 取得対象をworkタイプに限定
        //全文検索によって記事を取得するには、client.getEntries内で、query: 'キーワード'と記述.
        query: params.keyword, // keywordパラメータをいずれかのフィールドに含む記事データのみを抽出
        order: '-sys.createdAt'
      }),
    ]).then(([works]) => {
      return {
        works: works.items // 取得されたデータを配列worksに入れる
      }
    }).catch(console.error)
  }
}
</script>