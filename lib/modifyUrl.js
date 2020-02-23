const httpBuildQuery = require('./httpBuildQuery')
const parseQueryString = require('./parseQueryString')

/**
 * Modify the given URL with new query strings
 */
module.exports = function modifyUrl (url, query) {
  if (typeof url !== 'string') {
    throw new Error('First argument has to be a string')
  }

  const [rootUrl, qs] = url.split('?')
  const oldValues = qs ? parseQueryString(qs) : {}

  const parts = [
    rootUrl
  ]

  query = query || {}

  // Merge old and new query values
  const values = {
    ...oldValues,
    ...query
  }

  const queryString = httpBuildQuery(values)

  if (queryString) {
    parts.push(queryString)
  }

  return parts.join('?')
}