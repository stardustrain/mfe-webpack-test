interface Props {
  title: string
}

export default function Button({title}: Props) {
  return (
    <button className="Button">
      {title ?? '버튼!'}
    </button>
  )
}
