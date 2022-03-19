export async function post({request}) {
  const data = await request.formData();

  const response = await fetch('http://localhost:3001/graphql', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  return response.json();

  console.log({data, response})
}