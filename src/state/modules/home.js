import { GET_ORGANIZATION, GET_ORGANIZATION_REPOSITORIES, ADD_STAR } from '../../gql/github'
import { apolloClient } from "../../main";

export const state = {
  organization: [],
  repositories: []
}

export const actions = {
  getOrganization: ({ commit }, organizationName) => {
    apolloClient
      .query({
        query: GET_ORGANIZATION,
        variables: {
          organization: organizationName
        }
      })
      .then(({ data }) => {
        commit("setOrganization", [data.organization])
        commit('setRepositories', [])
      })
      .catch(error => {
        console.log(error);
        commit('setOrganization', [])
        commit('setRepositories', [])
      })
  },
  getOrganizationRepositories: ({ commit }, organizationName) => {
    apolloClient
      .query({
        query: GET_ORGANIZATION_REPOSITORIES,
        variables: {
          organization: organizationName
        }
      })
      .then(({ data }) => {
        commit('setRepositories', data.repositoryOwner.repositories.nodes)
      })
      .catch(error => {
        console.log(error);
        commit('setRepositories', [])
      })
  },
  addStar: ({ commit }, { repositoryId, organization }) => {
    apolloClient
      .mutate({
        mutation: ADD_STAR,
        variables: {
          repositoryID: repositoryId
        },
        update: (cache) => {
          const data = cache.readQuery({
            query: GET_ORGANIZATION_REPOSITORIES,
            variables: {
              organization
            }
          })
          const repository = data.repositoryOwner.repositories.nodes.filter(repository => repository.id === repositoryId)
          repository[0].stargazers.totalCount += 1;
          cache.writeQuery({
            query: GET_ORGANIZATION_REPOSITORIES,
            variables: {
              organization
            },
            repository
          })
        }
      })
      .then(({ data }) => {
        // console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
  },
}

export const mutations = {
  setOrganization: (state, organizationName) => {
    state.organization = organizationName
  },
  setRepositories: (state, organizationName) => {
    state.repositories = organizationName
  }
}
