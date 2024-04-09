import { NextResponse } from "next/server"
import prisma from "@/utils/ConnectionPool"

// GET SINGLE PROJECT
export const GET = async (id: any) => {
  try {
    const post = await prisma.project.update({
      where: { id: id},
      data: { },
      include: { 
        user: true,
        Request: true,
      },
    })

    return new NextResponse(JSON.stringify(post))
  } catch (err) {
    console.log(err)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    )
  }
}

// DELETE SINGLE PROJECT
export const DELETE = async (req: any, { params }: any) => {
  const { id } = params

  try {
    // DELETE ALL COMMENTS
    await prisma.request.deleteMany({ where: { projectId: id } })
    const post = await prisma.project.delete({ where: { id } })

    return new NextResponse(JSON.stringify(post))
  } catch (err) {
    console.log(err)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    )
  }
}

// // UPDATE SINGLE POST
// export const PUT = async (req: any, { params }: any) => {
//   const { slug } = params

//   const body: any = await req.json()
//   console.log(body)

//   const { desc, title, catSlug } = body

//   try {
//     // Update just one property

//     const post = await prisma.post.update({
//       where: { slug },
//       data: { title: title, desc: desc, catSlug: catSlug || "innovacion" },
//     })

//     return new NextResponse(JSON.stringify(post))
//   } catch (err) {
//     console.log(err)
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" })
//     )
//   }
// }

// //UPDATE POST STATUS
// export const PATCH = async (req: any, { params }: any) => {

//   const { slug } = params

//   const body: any = await req.json()
//   const { status } = body

//   try {
//     const post = await prisma.post.update({
//       where: { slug },
//       data: { status },
//     })

//     return new NextResponse(JSON.stringify(post))
//   } catch (err) {
//     console.log(err)
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" })
//     )
//   }
// }