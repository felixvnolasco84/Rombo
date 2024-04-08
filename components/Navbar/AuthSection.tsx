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
            <div className="inline-flex relative justify-center items-center px-4 py-2 w-8 h-8 transition-colors">
                <span className="relative flex w-9 h-9 shrink-0">
                    <SVGSkeleton className="rounded-full w-full h-full" />
                </span>
            </div>
        </>; // return the Skeleton component when the status is loading
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