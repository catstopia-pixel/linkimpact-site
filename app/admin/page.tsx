import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import AdminDashboard from "../ui/admin-dashboard";
export const dynamic="force-dynamic";
export default async function AdminPage(){
 const user=await requireChatGPTUser("/admin");
 return <AdminDashboard user={user} signOutPath={chatGPTSignOutPath("/")}/>;
}
