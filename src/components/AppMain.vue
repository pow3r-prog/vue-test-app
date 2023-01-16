<template>
  <div class="container">
    <div class="input-group mb-3 input">
      <input
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
        placeholder="Name"
        v-model="input"
      />
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="nameItem in packageName"
          :key="nameItem.name"
          v-on:click="openPopupByName(nameItem.name)"
          data-bs-toggle="modal"
          data-bs-target="#itemModal"
        >
          <td>{{ nameItem.name }}</td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="itemModal"
      tabindex="-1"
      aria-labelledby="itemModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="itemModalLabel">Package info</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>Type: {{ packagesInfo.type }}</div>
            <div>Name: {{ packagesInfo.name }}</div>
            <div>Hits: {{ packagesInfo.hits }}</div>
            <div>Bandwidth: {{ packagesInfo.bandwidth }}</div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import debounce from 'lodash/debounce'

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
  .input {
    width: 50%;
    margin-top: 50px;

    @media (max-width: $size-small) {
      width: 100%;
    }
  }

  .table {
    th,
    td {
      color: $color-aqua;
    }

    td {
      cursor: pointer;
      &:hover {
        background: $color-grey;
      }
    }
  }
}
</style>
