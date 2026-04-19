import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { supabase } from "../lib/supabase";


const PrivateRoute = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null)

    useEffect(()=>{
        supabase.auth.getUser().then(({data})=>{
            setUser(data.user);
            setLoading(false);
        })

        // When user Logs out, routes them to sign in page
        const {data: listner} = supabase.auth.onAuthStateChange(
            (_event,session) => {
                setUser(session?.user ?? null);
            }
        )

        return listner.subscription.unsubscribe;
    },[]);

    if (loading) return <p>Loading...</p>;

    return (
        user ? <Outlet/> : <Navigate to="/auth/signin"/>
    )
}

export default PrivateRoute