const socket = io()

document.getElementById('product-form').addEventListener('submit', (event) => {
  event.preventDefault()

  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const code = document.getElementById('code').value
  const price = document.getElementById('price').value
  const stock = document.getElementById('stock').value
  const category = document.getElementById('category').value
  const thumbnail = document.getElementById('thumbnail').value

  socket.emit('createProduct', {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail,
  })

  // Limpiar el formulario
  document.getElementById('title').value = ''
  document.getElementById('description').value = ''
  document.getElementById('code').value = ''
  document.getElementById('price').value = ''
  document.getElementById('stock').value = ''
  document.getElementById('category').value = ''
  document.getElementById('thumbnail').value = ''
})

socket.on('productCreated', (newProduct) => {
  const productList = document.getElementById('product-list')
  const productItem = document.createElement('li')
  productItem.id = `product-${newProduct.id}`
  productItem.innerHTML = `
      ${newProduct.title} - ${newProduct.price}
      <button onclick="deleteProduct(${newProduct.id})">Eliminar</button>
    `
  productList.appendChild(productItem)
})

socket.on('productDeleted', (productId) => {
  const productItem = document.getElementById(`product-${productId}`)
  productItem.remove()
})

function deleteProduct(productId) {
  socket.emit('deleteProduct', productId)
}
