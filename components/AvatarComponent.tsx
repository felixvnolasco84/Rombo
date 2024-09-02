import { useUser } from "@clerk/clerk-react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import styles from "./Avatars.module.css";
import Image from "next/image";

export function Avatars() {
  const { user } = useUser();
  const users = useOthers();

  console.log(users);

  const currentUser = useSelf();

  return (
    <div className={styles.avatars}>
      {users.map(({ connectionId, info }) => {
        return (
          <Avatar
            key={connectionId}
            picture={info!.picture!.toString()}
            name={info!.name!.toString()}
          />
        );
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar
            picture={user?.imageUrl || "/avatar.png"}
            name={`${user?.fullName + " (You)" || "You"}`}
          />
        </div>
      )}
    </div>
  );
}

export function Avatar({
  picture,
  name,
}: {
  picture: string | undefined;
  name: string;
}) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <Image
        src={picture || ""}
        className={styles.avatar_picture}
        data-tooltip={name}
        alt="Avatar"
      />
    </div>
  );
}
