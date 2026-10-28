export interface StatusLabelProps {
  status: 'ready' | 'busy';
}

export function StatusLabel({ status }: StatusLabelProps) {
  return <span>{status === 'ready' ? 'Ready' : 'Busy'}</span>;
}
