import ProfileIMG from "../images/img_avatar.png";
export default function Profile() {
    return (
        <div class="whitespace-pre-line self-center">
            <img scr={ProfileIMG} alt="Avatar" />

            <p>Username: Sam Bankman-Fried</p>

            <p>Wallet Number: #123-456-7890</p>
        </div>
    );
}