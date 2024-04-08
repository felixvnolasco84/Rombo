import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"


export default function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <Card>
      <CardHeader>
        <CardTitle>Project 1</CardTitle>
        <CardDescription>Created by User 1</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          alt="Project 1"
          className="object-cover w-full h-60"
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
        <p className="mt-4 text-sm text-gray-500">Created: January 1, 2024</p>
        <p className="text-sm text-gray-500">Last Updated: February 1, 2024</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Project 2</CardTitle>
        <CardDescription>Created by User 2</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          alt="Project 2"
          className="object-cover w-full h-60"
          height={400}
          src="/placeholder.svg"
          style={{
            aspectRatio: "600/400",
            objectFit: "cover",
          }}
          width={600}
        />
        <p className="mt-4">
          This is a brief description of Project 2. It includes the main features and goals of the project.
        </p>
        <p className="mt-4 text-sm text-gray-500">Created: February 1, 2024</p>
        <p className="text-sm text-gray-500">Last Updated: March 1, 2024</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Project 3</CardTitle>
        <CardDescription>Created by User 3</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          alt="Project 3"
          className="object-cover w-full h-60"
          height={400}
          src="/placeholder.svg"
          style={{
            aspectRatio: "600/400",
            objectFit: "cover",
          }}
          width={600}
        />
        <p className="mt-4">
          This is a brief description of Project 3. It includes the main features and goals of the project.
        </p>
        <p className="mt-4 text-sm text-gray-500">Created: March 1, 2024</p>
        <p className="text-sm text-gray-500">Last Updated: April 1, 2024</p>
      </CardContent>
    </Card>
  </div>
  )
}
