import { PROTOTYPE_HEADER_TEXT } from "@/lib/prototype"

function Header({ title = PROTOTYPE_HEADER_TEXT }: { title?: string }) {
    return (

<header className="bg-primary text-white">
    <div className="container mx-auto flex items-center justify-between py-4 px-6 max-w-[1660px]">
        <h1 className="text-2xl font-bold">{title}</h1>
        <nav>
            <ul className="flex space-x-4">
                <li>
                    <a href="/" className="hover:text-gray-300">Home</a>
                </li>
                <li>
                    <a href="/prototype" className="hover:text-gray-300">Prototype</a>
                </li>
            </ul>
        </nav>
    </div>
</header>
    )
}

export { Header }