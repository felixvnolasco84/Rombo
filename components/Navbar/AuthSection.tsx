"use client"

import { Button } from '../ui/button'

import { useSession } from "next-auth/react"
import Link from 'next/link'
import { ProfileComponent } from './ProfileComponent'

export default function AuthSection() {

    const { data: session } = useSession()
    return (
        <>
            {
                session ? (
                    <ProfileComponent profileImage={session.user?.image} name={session.user?.name} email={session.user?.email} />
                ) : (
                    <Button className="font-semibold" variant={"headerLogin"} size={"headerLogin"} >
                        <Link href="/login">Login</Link>
                    </Button>
                )
            }
        </>
    )
}
