import { fromJS } from 'immutable'
import fetch from 'isomorphic-fetch'

export const appRoute = () => `v0/apps`
export const nodeRoute = () => `v0/nodes`
export const entrypointRoute = () => `v0/entrypoints`
export const registryRoute = () => `v0/registries/dockerhub/repos`
export const componentRoute = (appName) => `v0/apps/${appName}/components`

export const deployRoute = (appName, componentName) =>
  `v0/apps/${appName}/components/${componentName}/deploy`

export const releaseRoute = (appName, componentName) =>
  `v0/apps/${appName}/components/${componentName}/releases`

export const instanceRoute = (appName, componentName, releaseId) =>
  `${releaseRoute(appName, componentName)}/${releaseId}/instances`

function renderResponse(response, content) {
  try {
    let json = JSON.parse(content)

    return { response, body: json }
  } catch(error) {
    return { response, body: { errors: [content] } }
  }
}

export function getResources(resource) {
  return async () => {
    let response = await fetch(`/api/${resource}`)
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

export function getResource(resource) {
  return async (id) => {
    let response = await fetch(`/api/${resource}/${id}`)
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

export function createResource(resource) {
  return async (params) => {
    let method   = `POST`
    let request  = { method, body: JSON.stringify(params) }
    let response = await fetch(`/api/${resource}`, request)
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

export function deleteResource(resource) {
  return async (id) => {
    let method   = `DELETE`
    let response = await fetch(`/api/${resource}/${id}`, { method })
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

export function updateResource(resource) {
  return async (id, params) => {
    let method   = `PUT`
    let body     = JSON.stringify(params)
    let request  = { method, body }
    let response = await fetch(`/api/${resource}/${id}`, request)
    let content  = await response.text()

    return renderResponse(response, content)
  }
}

export class ResourceClient {
  constructor(namespace) {
    this.get = getResource(namespace)
    this.fetch = getResources(namespace)
    this.create = createResource(namespace)
    this.update = updateResource(namespace)
    this.delete = deleteResource(namespace)
  }
}
