export const Icon = ({className, name, color, width, height}) => {
	return (
		<svg className={className} width={width} height={height} fill={color}>
			<use href={`${name}`} />
		</svg>
	)
 }
 