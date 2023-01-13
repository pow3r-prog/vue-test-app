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
          v-for="packageItem in packages"
          :key="packageItem.name"
          v-on:click="openPopupByName(packageItem.name)"
          data-bs-toggle="modal"
          data-bs-target="#itemModal"
        >
          <td>{{ packageItem.name }}</td>
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
            <div>Type: {{ packages.type }}</div>
            <div>Name: {{ packages.name }}</div>
            <div>Hits: {{ packages.hits }}</div>
            <div>Bandwidth: {{ packages.bandwidth }}</div>
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

type TData = {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: string | any
  hits: number
  bandwidth: number
}

const data = {
  type: '',
  name: '',
  hits: 0,
  bandwidth: 0,
}

const packages = ref(data as TData)

const openPopupByName = (itemName: string) => {
  store.state.packages.find(({ name, type, hits, bandwidth }: TData) =>
    name === itemName
      ? ((packages.value.name = name),
        (packages.value.type = type),
        (packages.value.hits = hits),
        (packages.value.bandwidth = bandwidth))
      : ''
  )
}

const getPackages = () => {
  store.dispatch('fetchPackages').then(() => {
    return (packages.value = store.state.packages)
  })
}

const search = () => {
  store.dispatch('fetchPackages')
  return (packages.value = store.state.packages.filter(
    (item: { name: string | string[] }) => {
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
