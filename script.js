Tree().then(tree => {
  const head = tree.head
  const $tree = $(".tree")

  const headHtml = node =>
    (`<li data-id="${node.id} data-value="${node.value}">
      ${node.value}${nodeHtml(node)}
     </li>`)

  const nodeHtml = node => {
    const children = node.children.reduce((html, child) => {
      return html +=
        `<li data-value="${child.value}" data-id="${child.id}">${child.value}</li>`
    }, '')
    return html = `<ul>${children}</ul>`
  }

  $tree.on('click', function(e){
    const $target = $(e.target)

    if($target.data('id')) {
      const id = $target.data('id').split('-').map(Number)
      if($target.html().indexOf('<ul>') === -1){
        console.log(id)
        const node = id.reduce((node, branch, i) => {
          if(i === 0) return tree.head
          console.log('should return branch:', branch)
          console.log('from this array:', node.children)
          console.log('which means this node:', node.children[branch])
          return node.children[branch]
        }, tree.head)
        tree.addNode(node, $target.data('value')).then(newNode =>
          displayNode($target, nodeHtml(newNode)))

        console.log(tree.head)
      }
    }
  })

  const displayNode = ($loc, html) => $loc.append(html)
  displayNode($tree, headHtml(head))
})
