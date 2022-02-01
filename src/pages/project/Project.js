import { useParams } from "react-router-dom"
// hooks
import { useDocument } from "../../hooks/useDocument"
import ProjectSummary from './ProjectSummary'
// styles
import './Project.css'

export default function Project() {
  const { id } = useParams()
  const { error, document } = useDocument('projects', id)

  if(error){
    return <div className='error'>{error}</div>
  }
  if(!document){
    return <div className='loading'>Fetching documents...</div>
  }
  return (
    <div className='project-details'>
      <ProjectSummary project={document}/>
    </div>
  )
}