<!-- 
 pages/category/_id.vue
 vueファイルに"_"がついているが、こうしないとルーティングエラーがおきる。
 nuxt.jsではお決まりと思ったほうがいい。
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
//表示の仕方はindexとかと同じなので、Itemコンポーネントを使いまわす。
import Item from '@/components/Item'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()
export default {
  components: {
    Item
  },
  //以下で特定のカテゴリに紐づくworkを取得できる。
  asyncData ({params}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'work',
        'fields.category.sys.id': params.id,
        order: '-sys.createdAt'
      }),
    ]).then(([works]) => {
      return {
        works: works.items
      }
    }).catch(console.error)
  }
}
</script>
