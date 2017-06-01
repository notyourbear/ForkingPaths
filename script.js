Tree().then(tree => {
  const head = tree.head
  const $tree = $(".tree")

  const isOpen = (isOpen) => {
    return !isOpen ?
    '<i class="fa fa-minus-circle" aria-hidden="true"></i>' :
    '<i class="fa fa-plus-circle" aria-hidden="true"></i>'
  }

  const clickedOnCircle = target => target.className.indexOf('fa') !== -1

  const headHtml = node =>
    (`<li data-id="${node.id} data-value="${node.value}">
      ${node.value}${nodeHtml(node)}
     </li>`)

  const nodeHtml = node => {
    const children = node.children.reduce((html, child) => {
      html += `<li data-value="${child.value}" data-id="${child.id}">`
      html += `<div data-open="true" class="showMore closed">${isOpen(true)}</div>${child.value}</li>`
      return html
    }, '')
    return `<ul>${children}</ul>`
  }

  const changeOpenClass = $div => {
    const open = $div.data('open')
    $div.data('open', !open)
    $div.toggleClass('closed')
    $div.html(isOpen(!open))
  }

  $tree.on('click', function(e){
    const $target = $(e.target)
    const $div = clickedOnCircle(e.target) ?
      $target.parent('div') : $($target.children('div')[0])

    changeOpenClass($div)

    if($target.data('id')) {
      const id = $target.data('id').split('-').map(Number)
      if($target.html().indexOf('<ul>') === -1){
        const node = id.reduce((node, branch, i) => {
          if(i === 0) return tree.head
          return node.children[branch]
        }, tree.head)
        tree.addNode(node, $target.data('value')).then(newNode =>
          displayNode($target, nodeHtml(newNode)))
      }
    }
  })

  const displayNode = ($loc, html) => $loc.append(html)
  displayNode($tree, headHtml(head))
})
