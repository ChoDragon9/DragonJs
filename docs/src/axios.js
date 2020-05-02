const fetchData = ({
                     url,
                     method,
                     body,
                     headers,
                     isCredentials = true
                   }) => {
  return fetch(`${DOMAIN}${url}`, {
    method,
    body: toHttpBody(body),
    headers: toHttpHeader({body, headers}),
    credentials: isCredentials ? 'include' : 'same-origin'
  })
    .then(async response => {
      const {status, statusText} = response
      const body = await extractHttpBody(response)
      return {status, statusText, body}
    })
}
