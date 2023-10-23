
export interface CollectionPorps {
  id: number
  type: number
  logo: string
  slug: string
  picture: string
  collection_cn: string
  collection_en: string
  description_en: string
  description_cn: string
}

export interface OfferPorps {
  type?: number
  title: string
  price: number
  stock: number
  images: string
  duration: number
  delivery: number
  description: string
  collectionId: number
  buyer_password?: string
}