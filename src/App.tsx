import logo from './logo.svg'
import { Link } from '@tanstack/react-router' // importe o Link

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>

        {/* Botão para ir para /about */}
        <Link
          to="/about"
          className="mt-4 px-4 py-2 rounded-xl bg-[#61dafb] text-black hover:bg-[#4bb3d6] transition"
        >
          Ir para About
        </Link>
      </header>
    </div>
  )
}

export default App
