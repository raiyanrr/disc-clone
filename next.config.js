/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects(){
    return [
      {
        source: "/",
        destination: "/ES7rUZ22SzxZbOhxfkMi/general",
        permanent: true
      }
    ]
  }

}

module.exports = nextConfig
