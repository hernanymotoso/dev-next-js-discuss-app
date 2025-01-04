import { Button } from "@nextui-org/button";
import * as actions from '@/actions'
import {auth} from '@/auth'

export default async function Home() {
  const session = await auth()



  return (
    <div>  
      <form action={actions.signIn}>
        <Button type="submit">Sign in!</Button>  
      </form>    

      <form action={actions.signOut}>
        <Button type="submit">Sign out!</Button>  
      </form>

      {
        session?.user ? <>Signed In {JSON.stringify(session.user)}</> : <>Signed Out</>
      }       
    </div>
  );
}
