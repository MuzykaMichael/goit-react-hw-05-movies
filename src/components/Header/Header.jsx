import { Link, Outlet } from "react-router-dom"
import { Suspense } from "react"
import { HeaderCont } from "./Header.styled"
export const Header = () =>{



    return(
        <>
        <HeaderCont>
            <Link to="/">Home</Link>
            <Link to="/movies">SearchMovies</Link>
        </HeaderCont>
        <main>
        <Suspense fallback={<div>Loading...</div>}>
            <Outlet/>
        </Suspense>
        </main>
        </>
    )
}