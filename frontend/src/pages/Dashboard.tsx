import {supabase} from "../lib/supabase"

const Dashboard = () => {

    async function signUserOut () {
        const { error } = await supabase.auth.signOut();
        if(error){
            console.error(error);
            return;
        }
    }

    return (
        <>
            <div className="text-3xl text-center mt-4">Dashboard</div>
            <button onClick={signUserOut} className="border-2 bg-blue-400 px-4 py-1 rounded-sm hover:bg-blue-500">Sign Out!</button>
        </>
    )
}

export default Dashboard