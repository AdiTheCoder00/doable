import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';

export default function CTABand() {
  const { enterApp } = useApp();
  return (
    <div className="cta-band">
      <h2>Ready to keep yourself honest?</h2>
      <Button onClick={enterApp} style={{ borderRadius: '18px' }} className="px-8 py-6 text-lg">Start a Task</Button>
    </div>
  );
}
