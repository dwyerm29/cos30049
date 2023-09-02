import RecentTransactions from "../components/RecentTransactions";
import Profile from "../components/Profile";
import GalleryGrid from "../components/GallaryGrid";

export const Account = () => {
    return (
        <>
            <div class="flex items-center space-x-40 mx-24">
                <RecentTransactions class="clear-left" />
                <Profile class="clear-right" />
            </div>
            <hr />
            <p class="text-center text-2xl font-bold italic py-4">Your Assests</p>
            <GalleryGrid />
        </>
    );
};
