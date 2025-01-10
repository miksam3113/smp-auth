import { auth, signOut } from "@/auth";
import { publicRoutes } from "@/routes";

const SettingsPage = async () => {
  const session = await auth();
  console.log("SESSION:", session);
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: publicRoutes[0] });
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
