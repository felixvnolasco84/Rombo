
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Image from "next/image";

type ProjectCardProps = {
    title: string;
    username: string;
    created: string;
    updated: string;
    description: string;
    image: string;
}


export default function ProjectCard({ title, username, created, updated, description, image }: ProjectCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Project 1</CardTitle>
                <CardDescription>Created by User 1</CardDescription>
            </CardHeader>
            <CardContent>
                <Image
                    alt="Project 1"
                    className="w-full h-60 object-cover"
                    height={400}
                    src="/placeholder.svg"
                    style={{
                        aspectRatio: "600/400",
                        objectFit: "cover",
                    }}
                    width={600}
                />
                <p className="mt-4">
                    This is a brief description of Project 1. It includes the main features and goals of the project.
                </p>
                <p className="mt-4 text-gray-500 text-sm">Created: January 1, 2024</p>
                <p className="text-gray-500 text-sm">Last Updated: February 1, 2024</p>
            </CardContent>
        </Card>
    )
}
