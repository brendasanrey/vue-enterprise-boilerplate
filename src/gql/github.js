import gql from "graphql-tag";

export const GET_ORGANIZATION = gql`
  query getOrganization($organization: String!) {
  organization(login: $organization) {
    name
    avatarUrl
    description
    email
    location
    login
  }
}
`

export const GET_ORGANIZATION_REPOSITORIES = gql`
query getOrganizationRepositories($organization: String!){
  repositoryOwner(login: $organization) {
    repositories(first: 15){
      nodes{
        id
        name
        createdAt
        description
        primaryLanguage{
          name
        }
        stargazers{
          totalCount
        }
      }
    }
  }
}
`

export const ADD_STAR = gql`
mutation addStar($repositoryID: ID!){
  addStar(input: {starrableId: $repositoryID}) {
    starrable{
      viewerHasStarred
    }
  }
}`

export const REMOVE_STAR = gql`
mutation removeStar($repositoryID: ID!){
  removeStar(input: {starrableId: $repositoryID}){
    starrable{
      viewerHasStarred
    }
  }
}
`
