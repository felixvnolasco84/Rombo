"use client"

import { Button } from '../ui/button'

import { useSession } from "next-auth/react"
import Link from 'next/link'
import { ProfileComponent } from './ProfileComponent'
import { SVGSkeleton } from '../Skeleton/Skeleton'

export default function AuthSection() {

    const { data: session, status } = useSession()
    if (status === "loading") {
        return <>
            <div className="relative inline-flex h-8 w-8 items-center justify-center px-4 py-2 transition-colors">
                <span className="relative flex h-9 w-9 shrink-0">
                    <SVGSkeleton className="h-full w-full rounded-full" />
                </span>
            </div>
        </>;
    }
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