// hooks
import { useCollection } from "../../hooks/useCollection"
// styles
import './Dashboard.css'
// components
import ProjectList from "../../components/ProjectList"

export default function Dashboard() {
  const {document, error} = useCollection('projects')
  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {document && <ProjectList projects={document} />}
    </div>
  )
}