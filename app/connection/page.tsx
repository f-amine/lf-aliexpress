import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import LfAuth from "@/components/ui/lf-auth";
import SetupWizard from "@/components/connection/connection-card";
import { checkSetupComplete } from "@/lib/actions";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <LfAuth/>;
  }
  const isSetupComplete = await checkSetupComplete();
  
  if (isSetupComplete) {
    redirect('/overview');
  }

  return (
    <div className="flex py-20 px-5 items-center justify-center flex-1">
      <SetupWizard />
    </div>
  );
}
