<template>
  <div class="container">
    <PackageSearch v-model="input" />
    <PackagesTable :data="packageName" :openPopupByName="openPopupByName" />
    <ItemPopup
      :type="packagesInfo.type"
      :name="packagesInfo.name"
      :hits="packagesInfo.hits"
      :bandwidth="packagesInfo.bandwidth"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import debounce from 'lodash/debounce'
import ItemPopup from '@/containers/popup/ItemPopup.vue'
import PackageSearch from '@/containers/search/PackageSearch.vue'
import PackagesTable from '@/containers/table/PackagesTable.vue'

const store = useStore()
const input = ref('')

type TPackage = {
  type: string
  name: string
  hits: number
  bandwidth: number
}

const packageName = ref([{ name: '' }])

const packagesInfo = ref({
  type: '',
  name: '',
  hits: 0,
  bandwidth: 0,
} as TPackage)

const openPopupByName = (itemName: string) => {
  store.state.packages.find((item: TPackage) =>
    item.name === itemName ? (packagesInfo.value = item) : ''
  )
}

const getPackages = () => {
  store.dispatch('fetchPackages').then(() => {
    return (packageName.value = store.state.packages)
  })
}

const search = () => {
  store.dispatch('fetchPackages')
  return (packageName.value = store.state.packages.filter(
    (item: { name: string }) => {
      return item.name.includes(input.value.toLowerCase())
    }
  ))
}

watch(
  input,
  debounce(() => {
    search()
  }, 500)
)

onMounted(() => {
  getPackages()
})
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
