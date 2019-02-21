<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <div class="card mt-3" v-on="$listeners">
    <div class="text-center mt-2">
      <img :src="avatar" class="card-img-top" style="width: 10%" />
    </div>
    <div class="card-body">
      <h3 class="card-title text-center">{{ title }}</h3>
      <p class="card-text text-center">{{ email }}</p>
      <p class="card-text text-center">{{ description }}</p>
      <p v-if="location" class="card-text text-center">
        <i class="fas fa-map-marker-alt"></i>
        {{ location }}
      </p>
    </div>
  </div>
</template>
