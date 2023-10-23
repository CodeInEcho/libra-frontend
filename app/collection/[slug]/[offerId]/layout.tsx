import "@/styles/globals.css"

interface AboutLayout {
  children: React.ReactNode
}

export default function AboutLayout({ children }: AboutLayout) {
  return (
    <div className="container pt-[30px]">{children}</div>
  )
}
