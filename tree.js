const db = 'https://everything-a6cff.firebaseio.com'
const headValue = 'Book'
const maxPossibilities = 3

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const Tree = () => {
  const Node = (id, head, value) => {
    return {
      id: id,
      children: [],
      head: head,
      value: value
    }
  }

  const addChildren = (parent, value) =>
    fetchValues(value).then(values => {
      const children = []
      const num = getRandomInt(1,maxPossibilities)
      for(let i = 0; i < num; i++) {
        const value = values[getRandomInt(0, values.length - 1)]
        const id = `${parent.id}-${i}`
        children.push(Node(id, parent, value))
      }
      return children
    })

  const fetchValues = parentValue => {
      return fetch(`${db}/${parentValue}.json`, {method: 'GET'})
      .then(r => r.json())
      .then(r => Object.keys(r))
    }

  const addNode = (state) => {
    return {
      addNode: (parent, value) => {
        const id = `${parent.id}-${parent.children.length}`
        const node = Node(id, parent, value)
        return addChildren(node, value).then(children => {
          node.children = children
          parent.children.push(node)
          return node })
      }
    }
  }

  const state = {
    head: Node(0, null, headValue),
  }

  return addChildren(state.head, headValue).then((children) => {
    state.head.children = children
    return Object.assign({}, state, addNode(state))
  })
}
