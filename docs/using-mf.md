# Micro Frontend in Host app

### Update App.jsx

For `products` app:
```jsx
function App() {

  return (
    <p>
      Products
    </p>
  )
}

export default App
```


For `carts` app:
```jsx
function App() {

  return (
    <p>
      Carts
    </p>
  )
}

export default App
```

For `host` app:
```jsx
import Products from 'products/App'
import Carts from 'carts/App'

const App = () => {
    return <>
        <Products />
        <Carts />
    </>
}
export default App
```