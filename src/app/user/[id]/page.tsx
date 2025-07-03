/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import UserDetailPage from './UserDetailPage'

export async function generateMetadata(
  // ✅ Let Next.js infer the correct type
  props: any
): Promise<Metadata> {
  const { params } = props

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}users/${params.id}`)
    if (!res.ok) {
      return { title: 'User not found' }
    }

    const product = await res.json()

    return {
      title: product?.title ?? 'Product Detail',
      description: product?.description ?? '',
      openGraph: {
        title: product?.title,
        description: product?.description,
        images: [product?.image],
      },
    }
  } catch {
    return {
      title: 'User not found',
    }
  }
}

export default function page(){
    return (
        <UserDetailPage/>
    )
}



