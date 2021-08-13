import {useState} from 'react'
import {apiService} from './apiService'
import arrowIcon from './assets/arrow.svg'
import closedFolderIcon from './assets/folder-closed.png'
import openFolderIcon from './assets/folder-open.png'
import fileIcon from './assets/file.png'

export const Node = ({node, addChildrenToNode}) => {
  const {id, title, children, loaded} = node
  const isFolder = Array.isArray(node?.children)
  const isEmptyFolder = isFolder && loaded && node.children.length === 0
  const [isOpened, setIsOpened] = useState(false)

  const fetchChildren = async () => {
    const response = await apiService(id)
    if (response) {
      addChildrenToNode(id, response.children)
    }
  }

  const clickHandler = (ev) => {
    if (isFolder) {
      setIsOpened(value => !value)
      if (!loaded && !isEmptyFolder) {
        fetchChildren()
      }
    }
  }

  return <>
    <div className="node" onClick={clickHandler}>
      {isFolder &&
      <img className={isOpened ? 'icon-arrow arrow-rotated' : 'icon-arrow'} src={arrowIcon} alt="Icon of an arrow"/>}
      {!isFolder ? <img className="icon icon-file" src={fileIcon} alt="Icon of a file"/>
        : isOpened
          ? <img className="icon icon-folder" src={openFolderIcon} alt="Icon of an open file folder"/>
          : <img className="icon icon-folder" src={closedFolderIcon} alt="Icon of an closed file folder"/>
      }
      <span>{title}</span>
    </div>

    {isFolder && isOpened && <div className="children">
      {children.map(node => (<Node key={node.id} node={node} addChildrenToNode={addChildrenToNode}/>))}
    </div>}
  </>
}