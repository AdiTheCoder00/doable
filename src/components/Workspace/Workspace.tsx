import ChatColumn from './ChatColumn';
import PlanSidebar from './PlanSidebar';
import RoadmapExecution from './RoadmapExecution';
import { useApp } from '../../context/AppContext';

export default function Workspace() {
  const { state } = useApp();

  return (
    <section id="view-workspace">
      {state.roadmap ? (
        <RoadmapExecution />
      ) : (
        <div className="workspace-grid">
          <ChatColumn />
          <PlanSidebar />
        </div>
      )}
    </section>
  );
}
