import getCurrentUser from "@app/actions/getCurrentUser";
import getReservations from "@app/actions/getResrvations";
import EmptyState from "@app/components/EmptyState";
import getListings from "@app/actions/getListings";
import Container from "@app/components/Container";
import RegistrationForm from "./RegistrationForm";
import RegisterModal from "@app/components/Modals/RegisterModal";
import UserSidebar from "@app/components/user/UserSidebar";

export const metadata = {
  title: "Barodaplus",
  description: "Barodaplus Social Connects",
};

interface Props {
  children: React.ReactNode;
}

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <div className="container px-6">
        <UserSidebar />

        <div className="p-8 sm:ml-64">
          <div className="p-8 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <RegistrationForm currentUser={currentUser} />
          </div>
        </div>
      </div>
    </Container>
  );
}
