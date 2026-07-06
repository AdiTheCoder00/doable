import ChatColumn from './ChatColumn';
import PlanSidebar from './PlanSidebar';
import { useApp } from '../../context/AppContext';

export default function Workspace() {
  const { state } = useApp();

  return (
    <section id="view-workspace">
      <div className="workspace-grid">
        <ChatColumn />
        <PlanSidebar />
      </div>
    </section>
  );
}
