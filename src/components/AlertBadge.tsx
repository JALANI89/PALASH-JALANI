interface Props {
  type: 'breakout' | 'pattern';
  message: string;
}

export const AlertBadge = ({type, message}: Props) => {
  const styles = type === 'breakout' 
    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
    : "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <div className={`px-2 py-1 text-xs font-medium rounded border ${styles}`}>
      {message}
    </div>
  );
};
