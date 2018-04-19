const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + Number(item)
  }

  return blogs
    .map(blog => blog.likes)
    .reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  var bestBlog = blogs[0]
  blogs
    .forEach(blog => {
      if (blog.likes > bestBlog.likes) {
        bestBlog = blog
      }
    })
  return bestBlog
}

const mostBlogs = (blogs) => {
  var authors = []
  blogs
    .forEach(blog => {
      const curAuthors = authors.map(item => item.author)
      if (!(curAuthors.includes(blog.author))) {
        authors.push(
          {
            author: blog.author,
            blogs: 1
          })
      } else {
        authors[curAuthors.indexOf(blog.author)].blogs++
      }
    })
  var bestAuthor = authors[0]
  authors
    .forEach(author => {
      if (author.blogs > bestAuthor.blogs) {
        bestAuthor = author
      }
    })
  return bestAuthor
}

const mostLikes = (blogs) => {
  var authors = []
  blogs
    .forEach(blog => {
      const curAuthors = authors.map(item => item.author)
      if (!(curAuthors.includes(blog.author))) {
        authors.push(
          {
            author: blog.author,
            likes: blog.likes
          })
      } else {
        authors[curAuthors.indexOf(blog.author)].likes += blog.likes
      }
    })
  return favoriteBlog(authors)
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}