import { Plan } from '../types';
import round2 from '../utils/round-2';

export default function DropdownCost({ plan }: { plan: Plan }) {
  return (
    <div className='d-flex flex-row justify-content-between align-items-center'>
      <div style={{ fontWeight: 'bolder', fontSize: 40 }}>
        ${round2(plan.totalCost)}
      </div>
      <div className='d-flex flex-column align-items-start m-2'>
        <div style={{ lineHeight: '100%' }}>{round2(plan.distance)} mi.</div>
        <div style={{ lineHeight: '100%' }}>{round2(plan.duration)} min.</div>
      </div>
    </div>
  );
}
