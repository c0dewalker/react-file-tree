import {useCallback, useRef, useState} from 'react'

const getNode = (id, tree) => {
  let searchedNode
  const nodesQueue = []
  if (tree && Array.isArray(tree?.children)) {
    nodesQueue.push(...tree.children)
  }
  while (nodesQueue.length > 0) {
    searchedNode = nodesQueue.find(node => node.id === id)
    if (searchedNode) {
      return searchedNode
    } else {
      for (let i = 0, l = nodesQueue.length; i < l; i++) {
        const node = nodesQueue[0]
        if (Array.isArray(node?.children)) {
          nodesQueue.push(...node.children)
        }
        nodesQueue.shift()
      }
    }
  }
  return null
}

export const useTree = () => {
  const tree = useRef()

  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  const initializeTree = useCallback((initialTree) => {
    tree.current = initialTree
    forceUpdate()
  }, [forceUpdate])

  const addChildrenToNode = useCallback((id, children) => {
    const node = getNode(id, tree.current)
    if (node) {
      node.children = [...children]
      node.loaded = true
    }
    forceUpdate()
  }, [forceUpdate])

  return [tree.current, initializeTree, addChildrenToNode]
}