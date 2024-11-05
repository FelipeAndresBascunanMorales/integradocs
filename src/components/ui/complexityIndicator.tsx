export default function ComplexityIndicator({value}: {value: number})
{
  const color = `bg-rose-${Math.floor(value / 10) * 100}`;
  const gradientBackground = `bg-gradient-to-r from-blue-400 to-blue-950`

  return (
    <div className={` h-2 ${gradientBackground} rounded ${color} w-${Math.ceil(value / 10)}`}>
      {/* {value} */}
    </div>
  )
}