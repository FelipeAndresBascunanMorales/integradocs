export default function ComplexityIndicator({value}: {value: number})
{
  const color = `bg-rose-${Math.floor(value / 10) * 100}`;
  const gradientBackground = `bg-gradient-to-r from-blue-400 to-red-500`

  return (
    <div className="bg-slate-100 py-px rounded-r-md">
        <div className={`w-${Math.ceil(value / 10)} overflow-hidden rounded-r-md`}>
        <div className={` h-2 ${gradientBackground} ${color} w-80`}>
          {/* {value} */}
        </div>
      </div>
    </div>
  )
}