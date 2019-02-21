<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    language: {
      type: Object,
      default: null,
    },
    counter: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<template>
  <li class="card">
    <div class="card-body">
      <h4 class="card-title text-center">{{ title }}</h4>
      <p class="text-center">
        <i class="far fa-star" v-on="$listeners"></i>
        {{ counter }}
      </p>

      <p class="card-text text-center">{{ description }}</p>
      <p class="card-text text-center">
        <b v-if="language">{{ language.name }}</b>
      </p>
    </div>
  </li>
</template>
