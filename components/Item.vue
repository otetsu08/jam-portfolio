<!-- components/Item.vue -->

<!--
　Item.vueはあくまでリストアイテム１つ１つに相当するコンポーネント。
  実際はメインビューからv-for等で引数が渡される形で呼び出される。（要はこの中にv-forは書かないのがポイント）
  このようにコンポーネントにしておくと、いろんな場所から呼び出せてフォーマットも統一できる。
-->

<template>
  <div class="w-full my-3 py-2 bg-white overflow-hidden shadow-lg">
    <!-- カテゴリのプレート部分にリンクを張って、カテゴリでの検索ができるようにしている。 -->
    <nuxt-link :to=" '/category/' + work.fields.category.sys.id "> 
      <div class="absolute bg-white py-1 px-3 rounded shadow mt-1 ml-1 text-sm">
        {{ work.fields.category.fields.name }}
      </div>
    </nuxt-link>
    <div 
      class="mb-3 w-full h-64 bg-center bg-cover"
      :style=" 'background-image: url(' + work.fields.image.fields.file.url + ')' "
    ></div>
    <!-- nuxt-linkはhrefのようなもの -->
    <nuxt-link :to=" '/work/' + work.fields.slug ">
      <h3 class="ml-3 font-bold">{{ work.fields.title }}</h3>
    </nuxt-link>
    <h4 class="ml-3 my-2 text-xs">{{ work.fields.subtitle }}</h4>
    <div class="flex ml-2">
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
        class="list-none text-xs m-1 bg-gray-200 p-1 rounded cursor-pointer"
        @click="$router.push('/tag/'+tag.sys.id)">
      >
        {{ tag.fields.name }}
      </li>
    </div>
  </div>
</template>

<script>
export default {
  //親コンポーネント（呼び出し元）から渡ってくる変数の受け皿を定義。
  props: ['work']
}
</script>