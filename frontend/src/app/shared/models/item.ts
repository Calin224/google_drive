export interface Item {
    name: string
    description: string
    category: string
    photos?: Photo[]
    id: number
}

export interface Photo {
  url: string
  publicId?: string
  itemId: number
}
