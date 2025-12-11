import CheckModerator from "@/src/components/admin/CheckModerator";
import ListAdmin from "@/src/components/admin/ListAdmin";
import Footer from "@/src/components/navigation/Footer";
import UserCard from "@/src/components/user/UserCard";

export default function Admin() {
    return (
        <CheckModerator load={true} closeOnError={true}>
            <section>
                <UserCard />
                <div className="flex flex-col gap-5 mt-4">
                    <div className="flex flex-col gap-2">
                        <h3 className="w-full font-medium">Luoghi da revisionare</h3>
                        <ListAdmin type="rev"/>
                    </div>
                    <div className="w-full border-t border-t-(--contrast-01)"></div>
                    <div className="flex flex-col gap-2">
                        <h3 className="w-full font-medium">Luoghi aggiunti</h3>
                        <ListAdmin type="acc" />
                    </div>
                </div>
            </section>
            <Footer />
        </CheckModerator >
    );
}