<!-- 
 pages/tag/_id.vue
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
import Item from '@/components/Item'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()
export default {
  components: {
    Item
  },
  //categoryと違うのは'fields.tag.sys.id':の部分だけ
  asyncData ({params}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'work',
        'fields.tag2.sys.id': params.id,
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