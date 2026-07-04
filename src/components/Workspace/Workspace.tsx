import ChatColumn from './ChatColumn';
import PlanSidebar from './PlanSidebar';

export default function Workspace() {
  return (
    <section id="view-workspace">
      <div className="workspace-grid">
        <ChatColumn />
        <PlanSidebar />
      </div>
    </section>
  );
}
