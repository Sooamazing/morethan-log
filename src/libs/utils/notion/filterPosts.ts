import { TPosts, TPostStatus, TPostType } from "src/types"

export type FilterPostsOptions = {
  acceptStatus?: TPostStatus[]
  acceptType?: TPostType[]
}

const initialOption: FilterPostsOptions = {
  acceptStatus: ["Public"],
  acceptType: ["Post"],
}
const current = new Date()
const tomorrow = new Date(current)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

export function filterPosts(
  posts: TPosts,
  options: FilterPostsOptions = initialOption
) {
  if (!Array.isArray(posts)) {
    console.error("filterPosts received invalid posts data:", posts)
    return []
  }

  const { acceptStatus = ["Public"], acceptType = ["Post"] } = options
  const filteredPosts = posts
    // filter data
    .filter((post) => {
      if (!post || !post.title || !post.slug) return false

      const postDate = post?.date?.start_date
        ? new Date(post.date.start_date)
        : new Date(post.createdTime || 0)

      if (isNaN(postDate.getTime()) || postDate > tomorrow) return false
      return true
    })
    // filter status
    .filter((post) => {
      const postStatus = post.status?.[0] || "Unknown"
      return acceptStatus.includes(postStatus)
    })
    // filter type
    .filter((post) => {
      const postType = post.type?.[0] || "Unknown"
      return acceptType.includes(postType)
    })

  return filteredPosts
}

// export function filterPosts(
//   posts: TPosts,
//   options: FilterPostsOptions = initialOption
// ) {
//   const { acceptStatus = ["Public"], acceptType = ["Post"] } = options
//   const filteredPosts = posts
//     // filter data
//     .filter((post) => {
//       const postDate = new Date(post?.date?.start_date || post.createdTime)
//       if (!post.title || !post.slug || postDate > tomorrow) return false
//       return true
//     })
//     // filter status
//     .filter((post) => {
//       const postStatus = post.status[0]
//       return acceptStatus.includes(postStatus)
//     })
//     // filter type
//     .filter((post) => {
//       const postType = post.type[0]
//       return acceptType.includes(postType)
//     })
//   return filteredPosts
// }
