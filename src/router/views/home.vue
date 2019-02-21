<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import {
  ADD_STAR,
  GET_ORGANIZATION_REPOSITORIES,
  GET_ORGANIZATION,
} from '../../gql/github'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  data() {
    return {
      organization: '',
      organizationsList: [],
      repositoriesList: {},
    }
  },
  methods: {
    searchOrganization() {
      this.organizationsList = []
      this.repositoriesList = []
      this.$apollo
        .query({
          query: GET_ORGANIZATION,
          variables: {
            organization: this.organization,
          },
        })
        .then((response) => {
          this.organizationsList.push(response.data.organization)
        })
    },
    searchRepositories() {
      this.$apollo
        .query({
          query: GET_ORGANIZATION_REPOSITORIES,
          variables: {
            organization: this.organization,
          },
        })
        .then((response) => {
          this.repositoriesList =
            response.data.repositoryOwner.repositories.nodes
        })
    }, 
    addStar(repositoryId) {
      this.$apollo
        .mutate({
          mutation: ADD_STAR,
          variables: {
            repositoryID: repositoryId,
          },
          update: (cache) => {
            const data = cache.readQuery({
              query: GET_ORGANIZATION_REPOSITORIES,
              variables: {
                organization: this.organization,
              },
            })
            const repository = data.repositoryOwner.repositories.nodes.filter(
              (repository) => repository.id === repositoryId
            )
            repository[0].stargazers.totalCount += 1
            cache.writeQuery({
              query: GET_ORGANIZATION_REPOSITORIES,
              variables: {
                organization: this.organization,
              },
              repository,
            })
          },
        })
        .then(({ data }) => {
          // console.log(data)
        })
    },
  },
}
</script>

<template>
  <Layout>
    <h1>Search</h1>
    <BaseInput v-model="organization" placeholder="Organización" type="text" />
    <BaseButton @click="searchOrganization()">
      <span>Buscar</span>
    </BaseButton>
    <BaseCardImage
      v-for="item in organizationsList"
      :key="item.id"
      :avatar="item.avatarUrl"
      :title="item.name"
      :description="item.description"
      :location="item.location"
      :email="item.email"
      @click="searchRepositories()"
    />
    <div class="row mt-3">
      <div class="col-md-12">
        <ul class="card-columns list-unstyled">
          <BaseCard
            v-for="item in repositoriesList"
            :key="item.id"
            :title="item.name"
            :description="item.description"
            :language="item.primaryLanguage"
            :counter="item.stargazers.totalCount"
            @click="addStar(item.id)"
          />
        </ul>
      </div>
    </div>
  </Layout>
</template>
