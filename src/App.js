import {useEffect} from 'react'
import {apiService} from './apiService'
import {Node} from './Node'
import {useTree} from './useTree'

export const App = () => {
  const [tree, initializeTree, addChildrenToNode] = useTree()

  useEffect(() => {
    const fetchInitialData = async () => {
      const rootNode = await apiService()
      if (rootNode) {
        initializeTree(rootNode)
      }
    }
    fetchInitialData()
  }, [initializeTree])

  return <>
    {tree && tree?.children.map(node => <Node key={node.id} node={node} addChildrenToNode={addChildrenToNode}/>)}
  </>
}