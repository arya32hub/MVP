import { Navigator, Profile } from "../components";
export default function Home() {
  return (
    <div>
      <div className="pr- mx-8 my-16 flex flex-row justify-between px-[131px]">
        <Navigator />
        <Profile />
      </div>
    </div>
  );
}
