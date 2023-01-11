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
          v-for="packageItem in getPackages"
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
            <div>Type: {{ data.type }}</div>
            <div>Name: {{ data.name }}</div>
            <div>Hits: {{ data.hits }}</div>
            <div>Bandwidth: {{ data.bandwidth }}</div>
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
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const input = ref('')

const data = ref({
  type: '',
  name: '',
  hits: 0,
  bandwidth: 0,
})

type TData = {
  type: string
  name: string
  hits: number
  bandwidth: number
}

const openPopupByName = (itemName: string) => {
  store.getters.getPackages.find(({ name, type, hits, bandwidth }: TData) =>
    name === itemName
      ? ((data.value.name = name),
        (data.value.type = type),
        (data.value.hits = hits),
        (data.value.bandwidth = bandwidth))
      : ''
  )
}

const getPackages = computed(() => {
  return store.getters.getPackages.filter(
    (item: { name: string | string[] }) => {
      return item.name.includes(input.value.toLowerCase())
    }
  )
})

onMounted(() => {
  store.dispatch('fetchPackages')
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
