import { chatGPTSignOutPath, requireChatGPTUser } from "../../chatgpt-auth";
import FormSubmissionsClient from "./submissions-client";

export const dynamic="force-dynamic";

export default async function AdminFormsPage(){
  await requireChatGPTUser("/admin/forms");
  return <FormSubmissionsClient signOutPath={chatGPTSignOutPath("/")}/>;
}
